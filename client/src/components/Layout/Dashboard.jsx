const Dashboard = () => {
	return (
		<div className='bg-gray-100 w-full lg:w-5/6 h-fll px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12'>
			<div>
				<p className=' font-raleway font-medium text-4xl py-4'>Dash Board</p>
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
	);
};

export default Dashboard;
