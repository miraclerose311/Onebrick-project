/** @format */

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Landing = () => {
	return (
		<>
			<Navbar />
			<div className="h-[600px] text-center flex flex-col justify-center text-xl font-bold">
				Landing Page
			</div>
			<Footer />
		</>
	);
};

export default Landing;
