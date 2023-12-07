/** @format */

import ReactPlayer from "react-player";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import DonationMark from "../assets/img/DonationMark.png";
import Ellipse11 from "../assets/img/Ellipse11.png";
import Ellipse9 from "../assets/img/Ellipse9.png";
import Rectangle from "../assets/img/Rectangle.png";
import Rectangle1 from "../assets/img/Rectangle1.png";
import VIDEO_PATH from "../assets/video.mp4";
import TestImg from "../assets/img/auth-back.png";
import Video1 from "../assets/img/video1.png";
import Video2 from "../assets/img/video2.png";
import Image1 from "../assets/img/image1.png";
import Image2 from "../assets/img/image2.png";
import Image3 from "../assets/img/image3.png";
import Image4 from "../assets/img/image4.png";
import AvatarImg from "../assets/img/AvatarImg.jpg";
import Collapse from "../components/Collapse";

const About = () => {
	return (
		<div className="relative">
			<img
				src={DonationMark}
				className="hidden w-36 xl:flex absolute left-1/3 ml-5 top-[750px] z-20"
			/>
			<img
				src={Ellipse11}
				className="absolute right-0 top-0 z-0"
			/>
			<img
				src={Ellipse9}
				className="absolute left-0 top-96"
			/>
			<Navbar />
			<div className="w-full px-24 lg:px-36 xl:px-48">
				<div className="flex bg-gray-100 flex-col xl:flex-row w-full pt-28">
					<div className="px-12 pt-24 xl:py-24 xl:w-1/3 w-full">
						<div className="flex flex-col gap-10">
							<p className="text-4xl md:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-sky-700 leading-none text-left font-montserrat z-20">
								Building Compassion
							</p>
							<p className="text-4xl text-left font-montserrat z-20">
								Brick by Brick
							</p>
							<p className="text-xl text-left sm:w-full md:w-5/6 turncate font-raleway z-20">
								Join us in Building Compassion: Brick by brick and make a
								lasting difference in the lives of those in need of palliative
								care. Each brick you purchase symbolizes not just your
								generosity, but also your active participation in creating a
								sanctuary of comfort and hope.
							</p>
							<a className="py-2 w-[200px] rounded-lg bg-red-700 hover:bg-red-800 max-w-sm text-white font-montserrat text-center">
								DONATE NOW
							</a>
						</div>
					</div>
					<div className="py-36 xl:p-0 px-24 z-10 flex justify-center xl:justify-end items-center xl:w-2/3">
						{/* <video
						autoPlay
						muted
						loop
					>
						<source src={VIDEO_PATH} />
					</video> */}
						<img
							src={Video1}
							className="object-cover w-full"
						/>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row w-full relative">
					<img
						src={Rectangle}
						className="absolute left-0 top-48 z-0"
					/>
					<div className="my-36 justify-center items-center full xl:w-1/3 z-10">
						<img src={Image1} />
					</div>
					<div className="px-12 py-24 lg:w-2/3 w-full">
						<div className="flex flex-col gap-10">
							<p className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-sky-700 leading-none text-left font-montserrat z-10">
								Empowering Lives brick by brick
							</p>
							<p className="text-xl text-left sm:w-full md:w-5/6 turncate font-raleway z-20">
								Alpha Hospice's Building Compassion: Brick by Brick campaign
								embodies our commitment to providing unwavering support and care
								to those facing life's final journey. Our mission is to extend a
								hand of comfort, dignity, and compassion to every individual and
								their families through exceptional palliative care
							</p>
							<p className="text-xl text-left sm:w-full md:w-5/6 turncate font-raleway z-20">
								This campaign is a significant step towards constructing a new
								hospice - a haven where warmth, care, and understanding thrive.
								Each brick symbolizes not just a building block but a pledge of
								hope, healing, and community support Your involvement is pivotal
								in turning this vision into a reality, as we strive together
								towards a collective goal of enhancing palliative care
								services and facilities
							</p>
							<a className="py-2 w-[200px] rounded-lg border-2 border-red-700 hover:bg-red-800 max-w-sm hover:text-white font-montserrat text-center">
								READ MORE
							</a>
						</div>
					</div>
				</div>

				<div className="flex flex-col w-full bg-gray-300 justify-center items-center">
					<p className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center text-sky-700 pt-24 font-montserrat z-10">
						3 Ways you can help make a difference
					</p>
					<p className="text-2xl text-center py-3 font-raleway w-2/3">
						Here are three impactful ways you can help us achieve our financial
						goals and make a meaningful difference in the lives of those we
						serve. Each action you take brings us closer to realizing our shared
						vision
					</p>
					<div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-18 p-12 pb-24 gap-12 items-center w-full">
						<div className="flex flex-col items-center bg-gray-800 text-white h-[400px] justify-evenly px-5">
							<div className="bg-red-700 rounded-full w-12 h-12"></div>
							<p className="text-2xl font-bold text-center font-montserra">
								1. Buy A Brick
							</p>
							<p className="text-xl text-center py-3 font-raleway">
								Contribute directly to our hospice by purchasing a symbolic
								brick. Each brick lays the foundation for a haven of care
							</p>
							<a className="py-2 px-6 rounded-lg bg-red-700 hover:bg-red-800 max-w-sm font-montserrat text-center">
								READ MORE
							</a>
						</div>
						<div className="flex flex-col items-center bg-white h-[400px] justify-evenly px-5">
							<div className="bg-red-700 rounded-full w-12 h-12"></div>
							<p className="text-2xl font-bold text-center font-montserra text-sky-700">
								2. Share Our Story
							</p>
							<p className="text-xl text-center py-3 font-raleway">
								Amplify our mission by sharing our story with your network. Your
								voice can inspire others to join our cause.
							</p>
							<a className="py-2 px-4 rounded-lg border-2 border-red-700 hover:bg-red-800 hover:text-white max-w-sm font-montserrat text-center">
								SPREAD THE WORD
							</a>
						</div>
						<div className="flex flex-col items-center bg-white h-[400px] justify-evenly px-5">
							<div className="bg-red-700 rounded-full w-12 h-12"></div>
							<p className="text-2xl font-bold text-center font-montserra text-sky-700">
								3. Volunteer With Us
							</p>
							<p className="text-xl text-center py-3 font-raleway">
								Lend your time and skills to our hospice. Volunteers are the
								hearts of our community and make a lasting impact.
							</p>
							<a className="py-2 px-2 rounded-lg border-2 border-red-700 hover:bg-red-800 hover:text-white max-w-sm font-montserrat text-center">
								BECOME A VOLUNTEER
							</a>
						</div>
					</div>
				</div>

				<div className="flex flex-col w-full bg-white justify-center items-center">
					<p className="font-bold text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center text-sky-700 pt-24 font-montserrat z-10">
						Moments of Compassion
					</p>
					<p className="text-2xl text-center text-neutral-600 py-3 font-raleway w-2/3">
						Explore our gallery to witness the profound impact of your support.
						Each image and video here tells a story - from the tangible progress
						of our hospice construction to the life- changing narratives of our
						beneficiaries.
					</p>
					<div className="flex flex-col gap-8 pb-48 mt-12">
						<div className="flex flex-col xl:flex-row w-full gap-8">
							<div className="flex xl:w-2/3 bg-gray-200">
								<img
									className="object-cover w-full"
									src={Video2}
								/>
							</div>
							<div className="flex xl:w-1/3 w-full items-start">
								<img
									className="object-cover w-full"
									src={TestImg}
								/>
							</div>
						</div>
						<div className="flex flex-col xl:flex-row w-full gap-8">
							<div className="flex xl:w-1/3 w-full items-start">
								<img
									className="object-cover w-full"
									src={Image3}
								/>
							</div>
							<div className="flex xl:w-2/3 bg-gray-200">
								<img
									className="object-cover w-full"
									src={Image4}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col w-full bg-neutral-700 justify-center items-center relative">
					<div className="flex justify-around bg-stone-300 w-4/5 h-[200px] absolute top-[-100px] lg:12px xl:px-36 ">
						<div className="flex flex-col justify-center items-center">
							<div className="w-12 h-12 bg-red-800 rounded-full"></div>
							<p className="mt-3 underline text-2xl">13258</p>
							<p className="">Brick purchased</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<div className="w-12 h-12 bg-red-800 rounded-full"></div>
							<p className="mt-3 underline text-2xl">$7.3 Cr</p>
							<p className="">Donations received</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<div className="w-12 h-12 bg-red-800 rounded-full"></div>
							<p className="mt-3 underline text-2xl">6325</p>
							<p className="">Donors</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<div className="w-12 h-12 bg-red-800 rounded-full"></div>
							<p className="mt-3 underline text-2xl">23%</p>
							<p className="">Towards our Goal</p>
						</div>
					</div>
					<p className="text-4xl text-center text-gray-300 font-raleway pt-48">
						Hearts of Generosity
					</p>
					<p className="text-4xl text-white font-bold md:text-5xl xl:text-6xl 2xl:text-7xl text-center font-montserrat z-10">
						Our Donors Speak
					</p>
					<p className="text-2xl text-center text-gray-400 py-3 font-raleway w-2/3">
						Discover the inspiring voices of our donors whose generosity fuels
						our mission. Their testimonials reflect the spirit of altruism and
						the profound impact of every contribution.
					</p>
					<div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-18 px-36 py-16 gap-12 justify-center items-center w-full">
						<div className="relative">
							<div className="flex flex-col py-8 gap-5 lg:w-full items-center bg-neutral-900 text-white justify-evenly px-5">
								<p className="xl:text-2xl lg:text-xl ml:text-sm text-gray-300">
									Every brick in the hospice symbolizes hope and compassion. As
									a donor.it’s rewarding to see the real difference my
									contribution makes in the lives of patients and their
									families.
								</p>
								<div className="bg-stone-800 w-full h-2"></div>
								<div className="flex self-start">
									<div className="bg-white rounded-full w-12 h-12"></div>
									<div className="flex-col ml-3">
										<p>Vikram Patel</p>
										<p>Professor</p>
									</div>
								</div>
							</div>
							<div className="absolute bottom-[-30px] right-5 flex gap-1">
								<svg
									id="Layer_1"
									data-name="Layer 1"
									className="xl:w-12 lg:w-8"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 90.51 122.88"
								>
									<title>comma</title>
									<path
										fill="#0284c7"
										d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
									/>
								</svg>
								<svg
									id="Layer_1"
									data-name="Layer 1"
									className="xl:w-12 lg:w-8"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 90.51 122.88"
								>
									<title>comma</title>
									<path
										fill="#0284c7"
										d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
									/>
								</svg>
							</div>
						</div>
						<div className="relative">
							<div className="flex flex-col py-8 gap-5 lg:w-full items-center bg-neutral-900 text-white justify-evenly px-5">
								<p className="xl:text-2xl lg:text-xl ml:text-sm text-gray-300">
									Every brick in the hospice symbolizes hope and compassion. As
									a donor.it’s rewarding to see the real difference my
									contribution makes in the lives of patients and their
									families.
								</p>
								<div className="bg-stone-800 w-full h-2"></div>
								<div className="flex self-start">
									<div className="bg-white rounded-full w-12 h-12"></div>
									<div className="flex-col ml-3">
										<p>Vikram Patel</p>
										<p>Professor</p>
									</div>
								</div>
							</div>
							<div className="absolute bottom-[-30px] right-5 flex gap-1">
								<svg
									id="Layer_1"
									data-name="Layer 1"
									className="xl:w-12 lg:w-8"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 90.51 122.88"
								>
									<title>comma</title>
									<path
										fill="#0284c7"
										d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
									/>
								</svg>
								<svg
									id="Layer_1"
									data-name="Layer 1"
									className="xl:w-12 lg:w-8"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 90.51 122.88"
								>
									<title>comma</title>
									<path
										fill="#0284c7"
										d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
									/>
								</svg>
							</div>
						</div>
						<div className="relative">
							<div className="flex flex-col py-8 gap-5 lg:w-full items-center bg-neutral-900 text-white justify-evenly px-5">
								<p className="xl:text-2xl lg:text-xl ml:text-sm text-gray-300">
									Every brick in the hospice symbolizes hope and compassion. As
									a donor.it’s rewarding to see the real difference my
									contribution makes in the lives of patients and their
									families.
								</p>
								<div className="bg-stone-800 w-full h-2"></div>
								<div className="flex self-start">
									<div className="bg-white rounded-full w-12 h-12"></div>
									<div className="flex-col ml-3">
										<p>Vikram Patel</p>
										<p>Professor</p>
									</div>
								</div>
							</div>
							<div className="absolute bottom-[-30px] right-5 flex gap-1">
								<svg
									id="Layer_1"
									data-name="Layer 1"
									className="xl:w-12 lg:w-8"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 90.51 122.88"
								>
									<title>comma</title>
									<path
										fill="#0284c7"
										d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
									/>
								</svg>
								<svg
									id="Layer_1"
									data-name="Layer 1"
									className="xl:w-12 lg:w-8"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 90.51 122.88"
								>
									<title>comma</title>
									<path
										fill="#0284c7"
										d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
									/>
								</svg>
							</div>
						</div>
					</div>
					<a className="py-2 px-6 rounded-lg bg-red-800 text-white max-w-sm font-montserrat text-center mb-24">
						SEE ALL TESTIMONIALS
					</a>
				</div>

				<div className="flex flex-col w-full bg-gray-100 py-36 justify-center items-center">
					<p className="text-4xl text-sky-700 font-bold md:text-5xl xl:text-6xl 2xl:text-7xl text-center font-montserrat z-10">
						Some of our recent donors
					</p>

					<div className="flex flex-col gap-8 p-24">
						<div className="flex xl:flex-row gap-8 flex-col">
							<div className="flex items-center bg-sky-700 rounded-md p-4">
								<img
									src={AvatarImg}
									className="w-1/2 xl:w-1/3 rounded-md"
								/>
								<div className="flex flex-col ml-4 text-white  lg:text-sm">
									<p className="text-xl lg:text-md">LG Kuttukaran</p>
									<p className="text-xl lg:text-md">Dubai, UAE</p>
									<p className="text-xl lg:text-md">5 Bricks I $50,0000</p>
								</div>
							</div>
							<div className="flex items-center bg-sky-700 rounded-md p-4">
								<img
									src={AvatarImg}
									className="w-1/2 xl:w-1/3 rounded-md"
								/>
								<div className="flex flex-col ml-4 text-white text-xl lg:text-sm">
									<p className="text-xl lg:text-md">LG Kuttukaran</p>
									<p className="text-xl lg:text-md">Dubai, UAE</p>
									<p className="text-xl lg:text-md">5 Bricks I $50,0000</p>
								</div>
							</div>
							<div className="flex items-center bg-sky-700 rounded-md p-4">
								<img
									src={AvatarImg}
									className="w-1/2 xl:w-1/3 rounded-md"
								/>
								<div className="flex flex-col ml-4 text-white text-xl lg:text-sm">
									<p className="text-xl lg:text-md">LG Kuttukaran</p>
									<p className="text-xl lg:text-md">Dubai, UAE</p>
									<p className="text-xl lg:text-md">5 Bricks I $50,0000</p>
								</div>
							</div>
						</div>
						<div className="flex xl:flex-row gap-8 flex-col">
							<div className="flex items-center bg-sky-700 rounded-md p-4">
								<img
									src={AvatarImg}
									className="w-1/2 xl:w-1/3 rounded-md"
								/>
								<div className="flex flex-col ml-4 text-white text-xl lg:text-sm">
									<p className="text-xl lg:text-md">LG Kuttukaran</p>
									<p className="text-xl lg:text-md">Dubai, UAE</p>
									<p className="text-xl lg:text-md">5 Bricks I $50,0000</p>
								</div>
							</div>
							<div className="flex items-center bg-sky-700 rounded-md p-4">
								<img
									src={AvatarImg}
									className="w-1/2 xl:w-1/3 rounded-md"
								/>
								<div className="flex flex-col ml-4 text-white text-xl lg:text-sm">
									<p className="text-xl lg:text-md">LG Kuttukaran</p>
									<p className="text-xl lg:text-md">Dubai, UAE</p>
									<p className="text-xl lg:text-md">5 Bricks I $50,0000</p>
								</div>
							</div>
							<div className="flex items-center bg-sky-700 rounded-md p-4">
								<img
									src={AvatarImg}
									className="w-1/2 xl:w-1/3 rounded-md"
								/>
								<div className="flex flex-col ml-4 text-white text-xl lg:text-sm">
									<p className="text-xl lg:text-md">LG Kuttukaran</p>
									<p className="text-xl lg:text-md">Dubai, UAE</p>
									<p className="text-xl lg:text-md">5 Bricks I $50,0000</p>
								</div>
							</div>
						</div>
					</div>
					<a className="py-2 px-6 rounded-lg bg-red-800 text-white max-w-sm font-montserrat text-center">
						SEE ALL DONORS
					</a>
				</div>

				<div className="flex flex-col xl:flex-row w-full pt-12 lg:px-0 relative justify-center">
					<div className="absolute mt-12 w-5/6 h-5/6 bg-gray-200 right-0"></div>
					<div className="px-12 xl:w-1/3 w-full z-10">
						<img
							src={Image2}
							className="w-full xl:object-cover object-fill"
						/>
					</div>
					<div className="py-16 pr-36 z-10 flex flex-col xl:w-2/3">
						<p className="text-3xl text-left">Frequently Asked Questions</p>
						<p className="text-sky-700 text-4xl font-bold md:text-5xl xl:text-6xl 2xl:text-7xl text-left">
							Undestanding Our Campaign
						</p>
						<div className="flex flex-col gap-3 py-8">
							<Collapse
								title="HOW DOES PURCHASING A CRICK HELP THE HOSPICE?"
								content="Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. "
							/>
							<Collapse
								title="Can I dedicate my brick to someone ?"
								content="Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. "
							/>
							<Collapse
								title="Are donations for brick purchases tax-deductible?"
								content="Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. "
							/>
							<Collapse
								title="How can i stay updated on the construction progress of the hospice?"
								content="Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. "
							/>
							<Collapse
								title="How else can i support the campaign besides purchasing a brick?"
								content="Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. "
							/>
							<Collapse
								title="What happens of the campaign doesn't reach its financial goal?"
								content="Absolutely. We encourage you to dedicate your brick in honor or memory of someone special. YOur dedication will be a lasting tribute, symbolizing the impacr and significance of your contribution. "
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default About;
