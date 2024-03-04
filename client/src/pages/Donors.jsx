import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";

import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import DonorCard from "../components/DonorCard";

const Donors = () => {
	const natigate = useNavigate();

	const [donors, setDonors] = useState([]);

	useEffect(() => {
		getDonors();
	}, []);

	const getDonors = async () => {
		const response = await axios.get(
			`${import.meta.env.VITE_BACKEND_URL}/api/donor/current-donors`
		);
		setDonors(response.data);
	};
	return (
		<div className='relative'>
			<Navbar />
			<div className='w-full flex flex-col gap-8 bg-gray-300 items-center px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 pt-12 lg:pt-24 relative'>
				<div className='w-full py-20 flex flex-col items-center gap-8'>
					<h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center font-sans font-bold'>
						Join our community of compassion!
					</h1>
					<p className='text-md lg:text-xl text-center text-gray-800'>
						Thanks to the generosity of {} Donors, we&lsquo;ve sponsered {}{" "}
						bricks, building hope one brick at a time.
					</p>
					<button onClick={() => natigate('/buybrick')} className='px-8 lg:px-16 py-2 bg-red-700 hover:bg-red-800 text-white text-md lg:text-lg font-bold font-sans rounded-md'>
						Sponsor a Brick
					</button>
				</div>
			</div>
			<div className='w-full px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 py-12 flex flex-wrap justify-center gap-4'>
				{donors &&
					donors.length > 0 &&
					donors.map((donorData, index) => {
						return (
							<DonorCard
								key={index}
								donorData={donorData}
							/>
						);
					})}
			</div>
			<Footer />
		</div>
	);
};

export default Donors;
