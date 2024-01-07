import { Link } from "react-router-dom";

import { HiOutlineUsers } from "react-icons/hi2";
import { BsBricks } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";

const Admin = () => {
	return (
		<>
			<div className='w-full h-[100vh] flex flex-wrap'>
				<div className='hidden lg:flex lg:flex-col lg:w-1/6 h-full bg-[#32363f] text-white items-center'>
					<Link
						to='/'
						className='font-bold font-raleway text-3xl pt-24 py-6'
					>
						ALPHA HOSPISE
					</Link>
					<hr className='w-full border-gray-500' />
					<div className='w-full flex flex-col gap-4 py-8 px-16 text-white'>
						<Link
							to='/admin'
							className='flex items-center gap-3 cursor-pointer hover:text-sky-500'
						>
							<LuLayoutDashboard />
							<p className='text-lg font-montserrat'>Dashboard</p>
						</Link>
						<Link
							to='/admin/brickTable'
							className='flex items-center gap-3 cursor-pointer hover:text-sky-500'
						>
							<BsBricks />
							<p className='text-lg font-montserrat'>Bricks</p>
						</Link>
						<Link
							to='/admin/donorTable'
							className='flex items-center gap-3 cursor-pointer hover:text-sky-500'
						>
							<HiOutlineUsers />
							<p className='text-lg font-montserrat'>Donors</p>
						</Link>
					</div>
				</div>
				<div className='bg-gray-100 w-full lg:w-5/6 h-fll px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12'>
					<div>
						<p className=' font-raleway font-medium text-4xl py-4'>
							Dash Board
						</p>
						<hr className='w-full' />
					</div>
					<div className='w-full flex flex-wrap'>
						<div className='w-1/4 p-4'>
							<div className='flex flex-col bg-white p-4 gap-3 rounded-lg'>
								<p className='text-xl font-montserrat'>Fake bricks</p>
								<p className='font-raleway text-2xl font-medium'>8290/35000</p>
								<p className='flex gap-3 items-center'>
									<span className='bg-green-300/30 rounded-md px-2 py-0.5'>
										14%
									</span>
									<p>This bricks exist for ...</p>
								</p>
							</div>
						</div>
						<div className='w-1/4 p-4'>
							<div className='flex flex-col bg-white p-4 gap-3 rounded-lg'>
								<p className='text-xl font-montserrat'>Real Sold bricks</p>
								<p className='font-raleway text-2xl font-medium'>3729/35000</p>
								<p className='flex gap-3 items-center'>
									<span className='bg-green-300/30 rounded-md px-2 py-0.5'>
										8.6%
									</span>
								</p>
							</div>
						</div>
						<div className='w-1/4 p-4'>
							<div className='flex flex-col bg-white p-4 gap-3 rounded-lg'>
								<p className='text-xl font-montserrat'>Real Our Donors</p>
								<p className='font-raleway text-2xl font-medium'>350/10000</p>
								<p className='flex gap-3 items-center'>
									<span className='bg-green-300/30 rounded-md px-2 py-0.5'>
										3.2%
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <DataTable />
			<DonorTable /> */}
		</>
	);
};

export default Admin;
