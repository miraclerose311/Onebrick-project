import { Link } from "react-router-dom";

import { HiOutlineUsers } from "react-icons/hi2";
import { BsBricks } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = () => {
	return (
		<div className='hidden lg:flex lg:flex-col lg:w-1/5 bg-[#32363f] shadow-xl shadow-gray-900 text-white items-center'>
			<Link
				to='/'
				className='font-bold font-raleway text-center  lg:text-2xl 2xl:text-3xl pt-24 py-6'
			>
				ALPHA HOSPISE
			</Link>
			<hr className='w-full border-gray-500' />
			<div className='w-full flex flex-col gap-4 py-8 px-8 text-white'>
				<Link
					to='/admin'
					className='flex items-center gap-3 cursor-pointer hover:text-sky-500'
				>
					<LuLayoutDashboard />
					<p className='text-md 2xl:text-lg font-montserrat'>Dashboard</p>
				</Link>
				<Link
					to='/admin/bricks'
					className='flex items-center gap-3 cursor-pointer hover:text-sky-500'
				>
					<BsBricks />
					<p className='text-md 2xl:text-lg font-montserrat'>Bricks</p>
				</Link>
				<Link
					to='/admin/donors'
					className='flex items-center gap-3 cursor-pointer hover:text-sky-500'
				>
					<HiOutlineUsers />
					<p className='text-md 2xl:text-lg font-montserrat'>Donors</p>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
