/** @format */

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image5 from "../assets/img/image5.png";

const Contact = () => {
	return (
		<>
			<Navbar />
			<div className="flex bg-gray-100 flex-col xl:flex-row w-full px-48 pt-28 lg:pr-0">
				<div className="xl:w-1/3 w-full">
					{/* <video
						autoPlay
						muted
						loop
					>
						<source src={VIDEO_PATH} />
					</video> */}
					<img
						src={Image5}
						className="object-cover w-full"
					/>
				</div>
				<div className="px-12 pt-24 xl:py-24 xl:w-2/3 w-full">
					<div className="flex flex-col gap-10">
						<p className="text-4xl md:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-sky-700 leading-none text-left font-montserrat z-20">
							Building Compassion
						</p>
						<p className="text-4xl text-left font-montserrat z-20">
							Brick by Brick
						</p>
						<p className="text-xl text-left sm:w-full md:w-5/6 turncate font-raleway z-20">
							Join us in Building Compassion: Brick by brick and make a lasting
							difference in the lives of those in need of palliative care. Each
							brick you purchase symbolizes not just your generosity, but also
							your active participation in creating a sanctuary of comfort and
							hope.
						</p>
						<a className="py-2 w-[200px] rounded-lg bg-red-700 hover:bg-red-800 max-w-sm text-white font-montserrat text-center">
							DONATE NOW
						</a>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Contact;
