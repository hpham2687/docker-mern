import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function PatientsList() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const [patients, setPatients] = useState([]);
    
    useEffect(() => {
        const getPatients = async () => {
            const res = await axios.get(`/v1/user/getpatients/${user._id}`);
            setPatients(res.data);
        };
        getPatients();
    }, [patients, user._id]);

    const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 5;
  
	useEffect(() => {
	  const endOffset = itemOffset + itemsPerPage;
	  setCurrentItems(patients.slice(itemOffset, endOffset));
	  setPageCount(Math.ceil(patients.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, patients]);

	const handlePageClick = (event) => {
	  const newOffset = (event.selected * itemsPerPage) % patients.length;
	  setItemOffset(newOffset);
	};

    return (
        <div className="container max-w-[900px] mx-auto">
            <div className="border-b border-solid border-[#ccc] p-4">
                <ul className="grid grid-cols-9 gap-4 text-lg font-bold">
                    <li className="col-span-1">#</li>
                    <li className="col-span-2">Họ và tên</li>
                    <li className="col-span-1">Tuổi</li>
                    <li className="col-span-3">Địa chỉ</li>
                    <li className="col-span-2"></li>
                </ul>
            </div>
            {/* body */}
            <div>
                {currentItems.map((patient, index) => {
                    return (
                        <div key={index} className="grid grid-cols-9 gap-4 list-none border-b border-solid border-[#ccc] p-4">
                            <li className="col-span-1">{index + 1}</li>
                            <li className="col-span-2">{patient.name}</li>
                            <li className="col-span-1">{patient.age}</li>
                            <li className="col-span-3">{patient.address}</li>
                            <li className="col-span-2 hover:scale-110 duration-300 cursor-pointer">
                                <Link to={`/main/${patient._id}`}>Upload ảnh</Link>
                            </li>
                        </div>
                    );
                })}
            </div>

            <ReactPaginate
				breakLabel="..."
				nextLabel=" >>"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				pageCount={pageCount}
				previousLabel="<<"
				renderOnZeroPageCount={null}
				className="flex justify-center items-center my-8"
				pageClassName="px-4 py-1 border border-[#dee2e6] cursor-pointer border-solid hover:bg-[#dee2e6]"
                pageLinkClassName="text-[#0d6efd]"
                previousClassName="px-2 py-1 border border-[#dee2e6] cursor-pointer border-solid rounded-tl-lg rounded-bl-lg hover:bg-[#dee2e6]"
                nextClassName="px-2 py-1 border border-[#dee2e6] cursor-pointer border-solid rounded-tr-lg rounded-br-lg hover:bg-[#dee2e6]"
                previousLinkClassName="text-[#0d6efd]"
                nextLinkClassName="text-[#0d6efd]"
                activeClassName="bg-[#dee2e6]"
                activeLinkClassName="text-white"
                breakClassName="px-4 py-1"
			/>
        </div>
    );
}

export default PatientsList;