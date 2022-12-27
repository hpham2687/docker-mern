import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';

const Header = () => {
	

	return (
		<header className='h-[65px] bg-blue-500 flex justify-between items-center'>
			<div className='px-8 text-white'>
			
			</div>
			<div className='flex justify-between items-center px-8'>
				<div className='relative'>
					<input type="text" placeholder='Search' className='pl-4 py-2 rounded-full bg-gray-300'/>
					<AiOutlineSearch size={20} className='text-gray-500 absolute top-1/2 right-0 transform -translate-y-1/2 mx-4'/>
				</div>
				<div className='pl-28 text-white'>
					<VscAccount className='cursor-pointer' size={30}/>
				</div>
			</div>
			
		</header>
	)
}

export default Header
