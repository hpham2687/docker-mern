import React, { useState } from 'react'
import { CiSettings } from 'react-icons/ci';
import { saveAs } from 'file-saver'
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TransformWrapper, TransformComponent } from '@pronestor/react-zoom-pan-pinch';
import axios from 'axios';
import { getImages } from '../redux/apiRequest';
import { useEffect } from 'react';

const MainForm = () => {
	const [uploadImage, setUploadImage] = useState();
	const [AiImage, setAiImage] = useState();
	const [kssg, setKssg] = useState();
	const [zoomMenu, setZoomMenu] = useState(false);
	const [rotate, setRotate] = useState(false);
	const [patient, setPatient] = useState({});
	const user = useSelector(state => state.auth.login.currentUser);
	const images = useSelector(state => state.user.getImage.images);
	const params = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
        const getPatient = async () => {
            const res = await axios.get(`http://localhost:9000/v1/user/getpatient/${user._id}/${params.id}`);
            setPatient(res.data);
        };
        getPatient();
    }, [patient, params.id, user._id]);
	
	const handdleClickSettingButton = () => {
		setZoomMenu(!zoomMenu);
		setRotate(!rotate);
	};

	const handleClickAIButton = async() => {
		if(uploadImage) {
			const res = await axios.get("https://pixabay.com/api/?key=30656960-34722dab587066d7b455714ab&q=yellow+flowers&image_type=photo&pretty=true");
			var randomKssg = Math.floor(Math.random() * res.data.hits.length)
			var randomAIimage = res.data.hits[Math.floor(Math.random() * res.data.hits.length)].webformatURL
			setAiImage(randomAIimage);
			setKssg(randomKssg);
			var time = new Date();
			var currentTime = time.getDate() + "/" + (time.getMonth() + 1)
			+ "/" + time.getFullYear() + "  ----  "
			+ time.getHours() + ":"
			+ time.getMinutes() + ":"
			+ time.getSeconds();

			const newImage = {
				name: "name",
				url: randomAIimage,
				time: currentTime,
				kssg: randomKssg,
				diagnose: true
			};
			
			getImages(user._id, params.id, dispatch, newImage);
		}
	};

	const handlePreviewImage = e => {
		const file = e.target.files[0];
		file.preview = URL.createObjectURL(file);
		setUploadImage(file);
		images.map(image => console.log(image));
	};

	const downloadImage = () => {
		saveAs(AiImage) // Put your image url here.
	};

	return (
		<div>
			<div className='container max-w-[1000px] mx-auto grid gird-cols-1 gap-4 md:grid-cols-2 md:gap-4 py-4'>
				<div className=''>
					<div className='flex justify-center items-start'>
						<div className={uploadImage ? 'w-[400px] min-h-[200px] mx-auto border-none' : 'w-[400px] h-[200px] mx-auto border-2 border-dotted border-black'}>
							{uploadImage && (
								// <img
								// 	src={uploadImage.preview}
								// 	alt="/"
								// 	className='w-full h-auto'
								// />
								<TransformWrapper
								initialScale={1}
							>
								{({ zoomIn, zoomOut, resetTransform, ...rest }) => (
									<div className='flex'>
										<TransformComponent>
											<img className='img' src={uploadImage.preview} alt="" />
										</TransformComponent>
										<div className={uploadImage ? "flex flex-col ml-2" : "hidden"}>
											<CiSettings onClick={handdleClickSettingButton} className="cursor-pointer hover:scale-110 duration-300" size={20}/>
											<div className={zoomMenu ? "flex flex-col" : "hidden"}>
												<button onClick={() => zoomIn()}>+</button>
												<button onClick={() => zoomOut()}>-</button>
												<button onClick={() => resetTransform()}>x</button>
											</div>
										</div>
									</div>
								)}
							</TransformWrapper>
							)}
						</div>
					</div>
					<div className='py-6 flex justify-between items-center'>
						<div className='relative hover:scale-125 duration-300 cursor-pointer'>
							<input
								type="file"
								className='absolute top-0 left-0 h-full w-full z-10 opacity-0'
								onChange={handlePreviewImage}
							/>
							<button className='px-8 py-2 mx-10 bg-orange-400 rounded-full text-white'>Upload ảnh</button>
						</div>
						<button
							className='px-8 py-2 mx-10 bg-blue-500 rounded-full text-white hover:scale-125 duration-300'
							onClick={handleClickAIButton}
						>
							AI nhận diện
						</button>
					</div>
				</div>
				<div className=''>
					<div className='flex justify-center items-start'>
						<div className={AiImage ? "w-[400px] min-h-[200px] mx-auto border-none" : "w-[400px] min-h-[200px] mx-auto border-2 border-dotted border-black"}>
							<TransformWrapper
								initialScale={1}
							>
								{({ zoomIn, zoomOut, resetTransform, ...rest }) => (
									<div className='flex'>
										<TransformComponent>
											<img className='img h-[200px] w-[400px]' src={AiImage} alt=""/>
										</TransformComponent>
										<div className={AiImage ? "flex flex-col ml-2" : "hidden"}>
											<CiSettings onClick={handdleClickSettingButton} className="cursor-pointer hover:scale-110 duration-300" size={20}/>
											<div className={zoomMenu ? "flex flex-col" : "hidden"}>
												<button onClick={() => zoomIn()}>+</button>
												<button onClick={() => zoomOut()}>-</button>
												<button onClick={() => resetTransform()}>x</button>
											</div>
										</div>
									</div>
								)}
							</TransformWrapper>
						</div>
					</div>
					<div className='py-6 flex justify-between items-center'>
						<div></div>
						<button
							className='px-8 py-2 mx-10 bg-blue-500 rounded-full text-white hover:scale-125 duration-300'
							onClick={downloadImage}
						>
							Download
						</button>
					</div>
				</div>
			</div>
			<div className='container max-w-[950px] mx-auto px-6 mb-5' >
				<div className='flex items-center'>
					<h2 className='text-xl text-gray-500'>Bệnh nhân: </h2>
					<h3 className='pl-4 text-2xl my-2'>{patient.name}</h3>
				</div>
				<div className='flex items-center'>
					<h2 className='text-xl text-gray-500'>Tuổi: </h2>
					<p className='pl-4 text-2xl my-2'>{patient.age}</p>
				</div>
				<div className='flex items-center'>
					<h2 className='text-xl text-gray-500'>Địa chỉ: </h2>
					<p className='pl-4 text-2xl my-2'>{patient.address}</p>
				</div>
				{kssg >= 0 && (
					<div className='flex items-center'>
						<h2 className='text-xl text-gray-500'>Khoảng sáng sau gáy: </h2>
						<p className='pl-4 text-2xl my-2'>{kssg} mm</p>
					</div>
				)}
			</div>
			{AiImage && (
					<div className="container max-w-[1000px] mx-auto my-3 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 md:gap-3 lg:gap-4">
						{images.map((image, index) => (
							<div key={index} className="max-w-auto mx-auto">
								<img src={image.url} alt="/" className='w-[400px] h-[200px]'/>
								<div className='mt-2'>
									<div className='flex items-center'>
										<h3 className='text-xl text-gray-500'>Thời gian upload:</h3>
										<p className='pl-4 text-xl my-2'>{image.time}</p>
									</div>
									<div className='flex items-center'>
										<h3 className='text-xl text-gray-500'>Độ dài khoảng sáng sau gáy:</h3>
										<p className='pl-4 text-xl my-2'>{image.kssg} mm</p>
									</div>
									<div className='flex items-center'>
										<h3 className='text-xl text-gray-500'>Chẩn đoán:</h3>
										<p className='pl-4 text-xl my-2'>{image.diagnose ? "true" : "false"}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
		</div>
	)
}

export default MainForm
