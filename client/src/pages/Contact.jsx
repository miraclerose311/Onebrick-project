/** @format */

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

import Image5 from "../assets/img/image5.png";
import Phone from "../assets/img/1.svg";
import Position from "../assets/img/2.svg";
import Message from "../assets/img/3.svg";
import Address from "../assets/img/4.svg";

import FaceBookIcon from "../assets/img/5.svg";
import TwitterIcon from "../assets/img/6.svg";
import QIcon from "../assets/img/8.svg";
import NewIcon from "../assets/img/9.svg";

import Ellipse10 from "../assets/img/Ellipse10.png";
import Select from "../components/Select";

import netImage1 from "../assets/img/netImage1.png";
import netImage2 from "../assets/img/netImage2.png";
import netImage3 from "../assets/img/netImage3.png";
import netImage4 from "../assets/img/netImage4.png";

const Contact = () => {
	return (
		<div className="relative">
			<Navbar />

			<div className="min-w-[576px]">
				<div className="flex flex-wrap bg-gray-300 px-12 lg:px-24 xl:px-48 pt-32 mx-auto ">
					<div className="w-full lg:w-1/3">
						<img
							src={Image5}
							className="w-full h-auto lg:h-full lg:w-auto object-fill"
						/>
					</div>
					<div className="w-full lg:w-2/3 flex flex-col mt-12 lg:mt-0 px-12 justify-center">
						<p className="text-3xl md:text-4xl xl:text-6xl text-sky-700 font-montserrat font-bold">
							Contact Us
						</p>
						<p className="text-xl font-raleway text-gray-500 pt-5 lg:pb-0 pb-12">
							Welcome to Alpha Hospice. We are here to assist you with any
							questions, guidance, or support you may need. Whether you're
							seeking information about our services, interested in
							volunteering, or need details about our Link Centers, our team is
							ready to help. Reach out to us, and we'll ensure you receive the
							assistance and information you're looking for. Your journey
							towards compassion and care starts here.
						</p>
					</div>
				</div>

				<div className="flex flex-wrap py-32 justify-center px-12 lg:px-24 xl:px-48 relative">
					<div className="w-1/2 lg:w-1/3 flex flex-col items-start gap-6 z-20 relative">
						<p className="text-sky-700 text-5xl lg:text-3xl xl:text-5xl font-bold pb-8">
							Get in touch now!
						</p>
						<div className="h-2/3 w-[2px] left-10 bottom-0 bg-neutral-500 absolute"></div>
						<div className="flex gap-6 items-center">
							<img
								src={Phone}
								className="w-8 h-8"
							/>
							<p className="text-sky-700 text-2xl text-justify font-bold w-full">
								+91 94977 13923
							</p>
						</div>
						<div className="flex gap-6 items-center">
							<img
								src={Position}
								className="w-8 h-8"
							/>
							<div className="flex flex-col">
								<p className="text-sky-700 text-2xl font-bold leading-none w-full">
									click here for directions
								</p>
								<p className="text-sky-700 text-sm leading-none">
									IX / 627, Edamuttam, Palappetty, Kerala, India
								</p>
							</div>
						</div>
						<div className="flex gap-6 items-center">
							<img
								src={Message}
								className="w-8 h-8"
							/>
							<div className="flex-col">
								<p className="text-sky-700 text-2xl leading-none font-bold w-full">
									communications
								</p>
								<p className="text-sky-700 text-2xl leading-none font-bold w-full">
									@alphapalliativecare.org
								</p>
							</div>
						</div>
						<div className="flex gap-6 items-center">
							<img
								src={Address}
								className="w-8 h-8"
							/>
							<div className="flex">
								<img
									src={FaceBookIcon}
									className="w-8 h-8"
								/>
								<img
									src={TwitterIcon}
									className="w-8 h-8 ml-4"
								/>
								<img
									src={NewIcon}
									className="w-8 h-8 ml-4"
								/>
								<img
									src={QIcon}
									className="w-8 h-8 ml-4"
								/>
							</div>
						</div>
					</div>
					<div className="w-full lg:w-2/3 flex flex-wrap pt-12 lg:pt-0 z-20">
						<div className="w-full lg:w-1/2 p-1">
							<input
								placeholder="First Name"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>
						<div className="w-full lg:w-1/2 p-1">
							<input
								placeholder="Last Name"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>
						<div className="w-full lg:w-1/2 p-1">
							<input
								placeholder="Email ID"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>
						<div className="w-full lg:w-1/2 p-1">
							<input
								placeholder="Mobile No"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>

						<div className="w-full p-1">
							<textarea
								placeholder="Message"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>

						<div className="w-full p-1">
							<button className="w-full py-3 bg-sky-700 text-white">
								Send Message
							</button>
						</div>
					</div>
					<img
						className="hidden lg:flex absolute right-0 top-0 z-0 object-fill h-full w-2/3"
						src={Ellipse10}
					/>
				</div>

				<div className="flex flex-col gap-5 w-full py-12 bg-neutral-200 z-20  px-12 lg:px-24 xl:px-48">
					<p className="text-sky-700 text-4xl xl:text-6xl">Our Care Network</p>
					<p className="text-gray-500">
						Search for an Alpha centre in your district. Select the district and
						click on Enter button
					</p>
					{/* <select className="w-full lg:w-1/2 py-3 px-2 rounded-t-lg my-6">
						<option>Thrissur</option>
						<option>Ernakulam</option>
						<option>Thiruvananthapuram</option>
						<option>Kollam</option>
						<option>Pathanamthitta</option>
						<option>Alappuzha</option>
					</select> */}
					<input
						className="w-full lg:w-1/2 py-3 px-2 rounded-xl border border-gray-500"
						placeholder="Search for District"
					/>
				</div>

				<div className="w-full py-32 px-12 lg:px-24 xl:px-48">
					<div className="flex flex-col">
						<div className="flex py-5">
							<img
								className=""
								src={netImage1}
							/>
							<div className="flex flex-col mx-12">
								<p className="text-xl font-normal">ALPHA HOSPICE EDAMUTTAM</p>
								<p>
									Alpha Palliative Care, Alpha Hospice Edamuttan, Edamuttam P.O.
									Thrissur - 680568
								</p>
								<p className="mt-5">Present: Mr. Mohanan Painat</p>
								<p>Contact No: 04802835100, 2835200</p>
								<p>
									Emal: <a>alpha.mathilakam@gmail.com</a>
								</p>
								<p className="text-sky-700 mt-5">CLICK TO GET DIRECTIONS</p>
							</div>
						</div>
						<hr className="border-t-2 border-gray-500" />

						<div className="flex py-5">
							<img
								className=""
								src={netImage2}
							/>
							<div className="flex flex-col mx-12">
								<p className="text-xl font-normal">THRISSUR LINK CENTRE</p>
								<p>
									Alpha Palliative Care, Thrissur Link Centre, Masjid ROad,
									Road, Near Congress Bhavan, Kovilakaparambu. ANyyanthole.
									Thrissure - 04
								</p>
								<p className="mt-5">Present: Mr. Sreekumar P</p>
								<p>Secretary: P. Mohammedkutty</p>
								<p>Treasurer: Mr. C. Venugopalan</p>
								<p>Contact No: 9745844552</p>
								<p>
									Emal: <a>edathiruthy.alpha@gmail.com</a>
								</p>
								<p className="text-sky-700 mt-5">CLICK TO GET DIRECTIONS</p>
							</div>
						</div>
						<hr className="border-t-2 border-gray-500" />

						<div className="flex py-5">
							<img
								className=""
								src={netImage3}
							/>
							<div className="flex flex-col mx-12">
								<p className="text-2xl font-normal">EDATHIRUTHY LINK CENTRE</p>
								<p>
									Alpha Palliative Care, Edathiruthy Link Center, Halwa Theruvu,
									High School Road, Chenthrapinni, Thrissur-680687.
								</p>
								<p className="mt-5">Present: Mr. Mohanan Painat</p>
								<p>Contact No: 04802835100, 2835200</p>
								<p>
									Emal: <a>alpha.mathilakam@gmail.com</a>
								</p>
								<p className="text-sky-700 mt-5">CLICK TO GET DIRECTIONS</p>
							</div>
						</div>
						<hr className="border-t-2 border-gray-500" />

						<div className="flex py-5">
							<img
								className=""
								src={netImage4}
							/>
							<div className="flex flex-col mx-12">
								<p className="text-2xl font-normal">MATHILAKAM LINK CENTRE</p>
								<p>
									Alpha Palliative Care, Edathiruthy Link Center, Halwa Theruvu,
									High School Road, Chenthrapinni, Thrissur-680687.
								</p>
								<p className="mt-5">Present: Mr. Mohanan Painat</p>
								<p>Contact No: 04802835100, 2835200</p>
								<p>
									Emal: <a>alpha.mathilakam@gmail.com</a>
								</p>
								<p className="text-sky-700 mt-5">CLICK TO GET DIRECTIONS</p>
							</div>
						</div>
					</div>
					<div className="flex justify-center mt-24">
						<Pagination />
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Contact;
