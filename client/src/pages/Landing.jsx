/** @format */

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import Image6 from "../assets/img/Image6.png";
import Image7 from "../assets/img/Image7.png";
import Image8 from "../assets/img/Image8.png";
import Image9 from "../assets/img/Image9.png";
import Image10 from "../assets/img/Image10.png";
import Image11 from "../assets/img/Image11.png";
import Image12 from "../assets/img/Image12.png";
import Image15 from "../assets/img/Image15.png";

const Landing = () => {
	return (
		<div className="relative ">
			<Navbar />

			<div className="min-w-[576px]">
				<div className="flex flex-wrap bg-gray-300 pt-32 ">
					<div className="w-full lg:w-2/3">
						<img
							src={Image6}
							className="w-full h-auto object-fill"
						/>
					</div>
					<div className="w-full lg:w-1/3 flex flex-col mt-12 lg:mt-0 lg:px-12 px-24 py-12">
						<p className="text-3xl md:text-4xl xl:text-6xl text-sky-600 font-montserrat font-bold">
							Welcome to Alpha Hospice
						</p>
						<p className="text-xl font-raleway text-gray-500 pt-5">
							A sanctuary of compassion and care at the heart of Alpha
							Palliative Care’s mission. Here, we dedicate ourselves to
							providing comfort and dignity to those facing life’s final
							journey. embodying our belief in the nobility of easing pain and
							suffering. As a cornerstone of the alpha Charitable Trust. Alpha
							Hospice is more than a facility; it’s a commitment to enhancing
							the quality f life foe those in need. one individual at a time.
						</p>
					</div>
				</div>

				<div className="flex flex-wrap px-12 lg:px-24 xl:px-48 py-24 mx-auto relative">
					<div className="bg-gray-100 w-3/4 h-2/3 left-0 bottom-12 z-0 absolute"></div>
					<div className="w-full lg:w-1/2 flex flex-col mt-12 lg:mt-0 lg:px-6 xl:px-12 py-12 z-10">
						<p className="text-3xl text-sky-700">Our Foundation:</p>
						<p className="text-3xl md:text-4xl xl:text-6xl text-sky-700 font-montserrat font-normal">
							The Alpha Charitable Trust
						</p>
						<p className="text-xl font-raleway text-gray-500 pt-5">
							Founded in 2004 by Mr. K. M. Noordeen and Mrs. Thahira Noordeen.
							The Alpha Charitable Trust is the driving force behind our
							Hospice. It stands on the principle that alleviating suffering and
							ensuring quality of life are noble pursuit. Our Trust is propelled
							by a team of dedicated professionals and volunteers, commited to
							delivering holistic care, spanning physical, mental, and emotional
							support. Each initiative, including Alpha Hospice, is a tesament
							to our unwavering commitment to serve humanity with compassion and
							dignity.
						</p>
					</div>
					<div className="w-full lg:w-1/2 flex flex-wrap z-10 lg:px-12">
						<img
							src={Image7}
							className="w-1/2 h-64 lg:w-1/2 lg:h-auto object-fill rounded-lg p-1"
						/>
						<img
							src={Image8}
							className="w-1/2 h-64 lg:w-1/2 lg:h-auto object-fill rounded-lg p-1"
						/>
					</div>
				</div>

				<div
					className="w-full py-12 px-12 lg:px-24 xl:px-48 pt-32 mx-auto  relative"
					style={{
						backgroundImage: `url(${Image9})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "2000px, 700px",
					}}
				>
					<p className="w-full lg:w-2/3 text-neutral-800  text-center mx-auto text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-bold z-10">
						The Hub and spoke model of care
					</p>
					<p className="text-md lg:text-xl text-center text-neutral-800 font-raleway z-10">
						At Alpha Hospice, we embrace a unique ‘Hub and spoke’ model.
						designed to extend our reach of palliative care to as many as
						possible. The hospice service as the central hub, providing
						intensive symptom control and support, white our Link Centers, the
						spokers, offer vital ome care services in the community. This
						innovative approach ensures that comprehensive care is accessible
						and personalized, meeting patients right where they are. Through
						this model, we’re able to bring comfort and relief to those in need,
						ensuring no one is beyond the reach of our care.
					</p>
					<div className="w-full flex justify-center mt-12">
						<div className="w-96 h-96 rounded-full bg-gray-700 mt-16" />
						<div className="w-56 h-56 rounded-full bg-gray-700 " />
					</div>
				</div>

				<div className="flex flex-wrap justify-center w-full px-12 lg:px-24 xl:px-48 pt-32 py-12 relative">
					<div className="w-full lg:w-1/2 z-10">
						<img
							src={Image10}
							className="w-full h-auto object-fill rounded-lg p-3"
						/>
					</div>
					<div className="bg-gray-100 w-3/4 h-3/5 right-0 bottom-12 z-0 absolute"></div>
					<div className="w-full lg:w-1/2 flex flex-col mt-12 lg:mt-0 lg:px-6 xl:px-12 py-12 z-10">
						<p className="lg:text-2xl xl:text-3xl text-sky-700">
							Our Services:
						</p>
						<p className="text-3xl md:text-4xl xl:text-5xl text-sky-700 font-montserrat font-normal">
							Alpha Hospice and Link Centers
						</p>
						<p className="lg:text-md xl:text-xl font-raleway text-gray-500 pt-5">
							Alpha Hospice, at the core of our services, offers a haven for
							symptom control and short-term care, operating 24/7 to address the
							immediate needs of those in distress. Our hospice is not just a
							facility; it’s a comforting home for patients to receive
							comprehensive care, including pain management and emotional
							support. complementing this, our alpha Link Centers, provide
							indisoensable home care services. These centers across various
							communities, form the backbone of our service delivery, ensuring
							continuous and accessible care. Together, Alpha Hospice and the
							Link Centers embody our dedication to holistic, community-centric
							palliative care.
						</p>
					</div>
				</div>

				<div className="flex flex-wrap justify-center w-full px-12 lg:px-24 xl:px-48 lg:py-24 py-12 relative">
					<div className="w-2/3 lg:w-1/2 flex flex-col mt-12 lg:mt-0 lg:px-6 xl:px-12 z-10">
						<p className="text-xl text-sky-700">Our Volunteers:</p>
						<p className="text-3xl md:text-4xl xl:text-6xl text-sky-700 font-montserrat font-normal">
							The Heart of Alpha
						</p>
						<p className="text-md xl:text-xl font-raleway text-gray-500 pt-5">
							Our volunteers are the lifeblood of Alpha Hospice, bringing
							energy, compassion, and dedicated service to every aspect of our
							mission. These selfless individuals come from all walks of life,
							united by a common purpose to alleviate suffering and improve the
							quality of life for our patients. They contribute in myriad ways,
							from providing family support and patient care to assisting in
							daily operations and community outreach. Their commitment and
							humanitarian spirit not only drive our initiatives forward but
							also infuse our hospice with warmth and hope. making a profound
							difference in the lives we touch.
						</p>
					</div>
					<div className="w-full lg:px-24 lg:w-1/2 flex flex-wrap items-center z-10">
						<img
							src={Image11}
							className="w-1/2 h-64 lg:w-5/12 lg:h-auto lg:ml-12 object-fill rounded-lg p-3"
						/>
						<img
							src={Image12}
							className="w-1/2 h-64 lg:w-1/5 lg:right-48 lg:h-auto object-fill rounded-lg p-3 lg:absolute"
						/>
						<img
							src={Image15}
							className="w-81 mx-auto lg:absolute xl:right-96 lg:right-32 xl:pr-24 bottom-[-48px]"
						/>
					</div>
				</div>

				<div className="flex flex-wrap justify-center w-full bg-[#A9D18E] py-24 px-12 lg:px-24 xl:px-48 mx-auto  relative">
					<div className="w-full lg:w-1/2 flex flex-wrap pt-12 lg:pt-0 z-20">
						<p className="w-full text-xl text-white p-2">Join our Mission:</p>

						<div className="w-full lg:w-1/2 p-2">
							<input
								placeholder="First Name"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>
						<div className="w-full lg:w-1/2 p-2">
							<input
								placeholder="Last Name"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>
						<div className="w-full p-2">
							<input
								placeholder="Email ID"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>
						<div className="w-full p-2">
							<input
								placeholder="Mobile No"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>

						<div className="w-full lg:w-1/2 p-2">
							<input
								placeholder="Date of Birth"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>

						<div className="w-full lg:w-1/2 p-2">
							<input
								placeholder="Occupation"
								className="w-full p-3 border border-gray-100 drop-shadow-sm"
							/>
						</div>

						<div className="w-full p-2">
							<button className="w-full py-3 bg-green-700 text-white">
								I WOULD LIKE TO VOLUNTEER
							</button>
						</div>
					</div>
					<div className="w-2/3 lg:w-1/2 flex flex-col mt-12 lg:mt-0 lg:px-6 xl:px-12 py-12 z-10">
						<p className="text-xl text-white">Join our Mission:</p>
						<p className="text-white text-3xl md:text-4xl xl:text-6xl text-whitefont-montserrat font-normal">
							Become a volunteer
						</p>
						<p className="text-lg xl:text-md font-raleway text-gray-800  pt-5">
							Alpha Hospice welcomes you to join our mission of compassion and
							care as a volunteer. Your involvement. whether in providing
							emotional support, assisting with daily operations, or aiding in
							community outreach, can profoundly impact the lives of those we
							serve. By volunteering with us, you become an integral part of our
							journey, bringing hope and comfort so many. Interested in making a
							difference? Please fill out our volunteer form alongside this
							section or reach out to us at volunteer@alphapalliativecare.org.
							Your step towards volunteering is a step towards enriching lives
							and strengthening our community.
						</p>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Landing;
