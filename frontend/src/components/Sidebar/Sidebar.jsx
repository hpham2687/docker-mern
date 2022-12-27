import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom';

import './sidebar.css'

function Sidebar() {
	const [rotate, setRotate] = useState(false);
	const [showSubMenu, setShowSubMenu] = useState(false);
	const [open, setOpen] = useState(0);

	const handleClickMenu = e => {
		setOpen(e.target.id);
		setShowSubMenu(!showSubMenu);
		setRotate(!rotate);
	};

	return (
		<div className='w-[280px] text-white p-4 bg-blue-400'>
			<div className='h-screen'>
				<a href="#" className='pb-4 mb-4 flex items-center border-b border-solid border-[#dee2e6] text-white'>
					Sidebar
				</a>
				<ul className='mb-4 text-white'>
					<li className='mb-1'>
						<button id='1' onClick={e => handleClickMenu(e)} className='text-white w-full inline-flex py-1 px-2 bg-transparent border-0 rounded-md items-center hover:bg-[#d2f4ea] hover:text-black'>
							<IoIosArrowForward id='1' size={20} className={(rotate && open === "1") ? 'mr-1 menu-icon' : 'mr-1 menu-icon-reverse'}/>
							Bệnh nhân
						</button>
						<div className={(showSubMenu && open === "1") ? 'block' : 'hidden'}>
							<ul className="pb-1">
								<li>
									<Link className={'inline-block py-1 px-2 mt-1 ml-6 rounded-md hover:scale-110 duration-300'} to='/addpatients'>Thêm bệnh nhân</Link>	
								</li>
								<li>
									<Link to='/patientslist' className={'inline-block py-1 px-2 mt-1 ml-6 rounded-md hover:scale-110 duration-300'}>Danh sách bệnh nhân</Link>
								</li>
							</ul>
						</div>
					</li>
					
					{/* line */}
					<li className='my-4 border-t border-solid border-[#dee2e6]'>
					</li>
					{/* <li className='mb-1'>
						<Link to='/main' className='w-full'>
							<button className='text-white inline-flex w-full py-1 px-2 bg-transparent border-0 rounded-md items-center hover:bg-[#d2f4ea] hover:text-black'>
								Ai nhận diện
							</button>
						</Link>
					</li> */}
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;