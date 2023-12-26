import ScrollToTop from "react-scroll-to-top";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

import Phone from "../assets/img/Contact Us/icons/phone.svg";
import Position from "../assets/img/Contact Us/icons/position.svg";
import Message from "../assets/img/Contact Us/icons/message.svg";
import Address from "../assets/img/Contact Us/icons/address.svg";

import FaceBookIcon from "../assets/img/Contact Us/icons/facebook.svg";
import TwitterIcon from "../assets/img/Contact Us/icons/twitter.svg";
import Youtube from "../assets/img/Contact Us/icons/youtube.svg";
import Instagram from "../assets/img/Contact Us/icons/instagram.svg";

import Ellipse10 from "../assets/img/Ellipse10.png";

import contact1 from "../assets/img/Contact Us/contact1.png";
import contact2 from "../assets/img/Contact Us/contact2.png";
import contact3 from "../assets/img/Contact Us/contact3.png";
import contact4 from "../assets/img/Contact Us/contact4.png";
import contact5 from "../assets/img/Contact Us/contact5.png";

const Contact = () => {
  return (
    <div className="relative">
      <Navbar />

      <div className="">
        <div className="flex flex-wrap bg-gray-300 px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 pt-32">
          <div className="w-full lg:w-1/3 h-56 sm:h-64 md:h-80 lg:h-auto justify-center">
            <img src={contact1} className="h-full w-full object-cover" />
          </div>
          <div className="w-full lg:w-2/3 flex flex-col mt-12 lg:mt-0 lg:pl-12 xl:pl-24 2xl:pl-32 justify-center">
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-sky-700 font-montserrat font-medium">
              Contact Us
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-justify font-raleway text-gray-600 pt-5 lg:pb-0 pb-12">
              Welcome to Alpha Hospice. We are here to assist you with any
              questions, guidance, or support you may need. Whether you&rquot;re
              seeking information about our services, interested in
              volunteering, or need details about our Link Centers, our team is
              ready to help. Reach out to us, and we&rquot;ll ensure you receive
              the assistance and information you&rquot;re looking for. Your
              journey towards compassion and care starts here.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap py-32 justify-center px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 relative">
          <div className="w-5/6 lg:w-1/2 flex flex-col items-start gap-6 z-20 relative">
            <p className="text-sky-700 text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl font-medium pb-8">
              Get in touch now!
            </p>
            {/* <div className="h-2/3 w-[2px] left-10 bottom-0 bg-neutral-500 absolute"></div> */}
            <div className="flex gap-6 sm:gap-8 md:gap-12 lg:gap-6 xl:gap-8 2xl:gap-12 items-center">
              <img
                src={Phone}
                className="w-8 sm:w-10 lg:w-8 xl:w-10 2xl:w-12  h-8 sm:h-10 lg:h-8 xl:h-10 2xl:h-12"
              />
              <p className="text-sky-700 text-xl sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-justify font-montserrat font-medium w-full">
                +91 94977 13923
              </p>
            </div>
            <div className="flex gap-6 sm:gap-8 md:gap-12 lg:gap-6 xl:gap-8 2xl:gap-12 items-center">
              <img
                src={Position}
                className="w-8 sm:w-10 lg:w-8 xl:w-10 2xl:w-12  h-8 sm:h-10 lg:h-8 xl:h-10 2xl:h-12"
              />
              <div className="flex flex-col">
                <p className="text-sky-700 text-xl sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-justify font-montserrat font-medium w-full">
                  click here for directions
                </p>
                <p className="text-sky-700 text-sm sm:text-xl lg:text-sm xl:text-md 2xl:text-lg text-justify w-full">
                  IX/627, Edamuttam, Palappetty, India
                </p>
              </div>
            </div>
            <div className="flex gap-6 sm:gap-8 md:gap-12 lg:gap-6 xl:gap-8 2xl:gap-12 items-center">
              <img
                src={Message}
                className="w-8 sm:w-10 lg:w-8 xl:w-10 2xl:w-12  h-8 sm:h-10 lg:h-8 xl:h-10 2xl:h-12"
              />
              <div className="flex-col">
                <p className="text-sky-700 text-xl sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-justify font-montserrat font-medium w-full">
                  communications
                </p>
                <p className="text-sky-700 text-xl sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-justify font-montserrat font-medium w-full">
                  @alphapalliativecare.org
                </p>
              </div>
            </div>
            <div className="flex gap-6 sm:gap-8 md:gap-12 lg:gap-6 xl:gap-8 2xl:gap-12 items-center">
              <img
                src={Address}
                className="w-8 sm:w-10 lg:w-8 xl:w-10 2xl:w-12  h-8 sm:h-10 lg:h-8 xl:h-10 2xl:h-12"
              />
              <div className="flex gap-4">
                <img
                  src={FaceBookIcon}
                  className="w-8 sm:w-10 lg:w-8 xl:w-10 2xl:w-12  h-8 sm:h-10 lg:h-8 xl:h-10 2xl:h-12"
                />
                <img
                  src={TwitterIcon}
                  className="w-8 sm:w-10 lg:w-8 xl:w-10 2xl:w-12  h-8 sm:h-10 lg:h-8 xl:h-10 2xl:h-12 ml-4"
                />
                <img
                  src={Instagram}
                  className="w-8 sm:w-10 lg:w-8 xl:w-10 2xl:w-12  h-8 sm:h-10 lg:h-8 xl:h-10 2xl:h-12 ml-4"
                />
                <img
                  src={Youtube}
                  className="w-8 sm:w-10 lg:w-8 xl:w-10 2xl:w-12  h-8 sm:h-10 lg:h-8 xl:h-10 2xl:h-12 ml-4"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-wrap pt-12 lg:pt-0 z-20">
            <div className="w-full lg:w-1/2 p-1 2xl:p-2">
              <input
                placeholder="First Name"
                className="w-full p-3 xl:p-5 border border-gray-100 drop-shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2 p-1 2xl:p-2">
              <input
                placeholder="Last Name"
                className="w-full p-3 xl:p-5 border border-gray-100 drop-shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2 p-1 2xl:p-2">
              <input
                placeholder="Email ID"
                className="w-full p-3 xl:p-5 border border-gray-100 drop-shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2 p-1 2xl:p-2">
              <input
                placeholder="Mobile No"
                className="w-full p-3 xl:p-5 border border-gray-100 drop-shadow-lg"
              />
            </div>

            <div className="w-full p-1 2xl:p-2">
              <textarea
                placeholder="Message"
                className="w-full px-3 2xl:px-5 py-16 2xl:py-24 border border-gray-100 drop-shadow-lg"
              />
            </div>

            <div className="w-full p-1 2xl:p-2">
              <button className="w-full p-3 xl:p-5 bg-sky-700 text-white">
                Send Message
              </button>
            </div>
          </div>
          <img
            className="hidden lg:flex absolute right-0 top-0 z-0 object-fill h-full w-2/3"
            src={Ellipse10}
          />
        </div>

        <div className="flex flex-col gap-5 md:gap-8 xl:gap-12 w-full py-12 bg-neutral-200 z-20  px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64">
          <p className="text-sky-700 text-4xl xl:text-6xl 2xl:text-7xl">
            Our Care Network
          </p>
          <p className="text-gray-500 text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
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
            className="w-full lg:w-3/4 py-3 px-5 rounded-xl border border-gray-500 text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl"
            placeholder="Search for District"
          />
        </div>

        <div className="w-full py-24 px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64">
          <div className="flex flex-col">
            <div className="flex flex-wrap py-5">
              <img className="w-full lg:w-1/2 xl:w-1/3" src={contact2} />
              <div className="w-full lg:w-1/2 xl:w-2/3 flex flex-col lg:px-5 xl:px-12 2xl-px-16 px-0 py-5">
                <p className="text-3xl sm:text-4xl lg:text-2xl xl:text-4xl 2xl:text-5xl font-normal">
                  ALPHA HOSPICE EDAMUTTAM
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  Alpha Palliative Care, Alpha Hospice Edamuttan, Edamuttam P.O.
                  Thrissur - 680568
                </p>
                <p className="mt-5 text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Present:</b> Mr. Mohanan Painat
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Contact No:</b> 04802835100, 2835200
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Emal:</b> <a>alpha.mathilakam@gmail.com</a>
                </p>
                <a className="text-sky-700 text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl mt-5 cursor-pointer">
                  CLICK TO GET DIRECTIONS
                </a>
              </div>
            </div>
            <hr className="border-t-2 border-gray-500" />

            <div className="flex flex-wrap py-5">
              <img
                className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                src={contact3}
              />
              <div className="w-full lg:w-1/2 xl:w-2/3 flex flex-col lg:px-5 xl:px-12 2xl-px-16 px-0 py-5">
                <p className="text-3xl sm:text-4xl lg:text-2xl xl:text-4xl 2xl:text-5xl font-normal">
                  THRISSUR LINK CENTRE
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  Alpha Palliative Care, Thrissur Link Centre, Masjid ROad,
                  Road, Near Congress Bhavan, Kovilakaparambu. ANyyanthole.
                  Thrissure - 04
                </p>
                <p className="mt-5 text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Present:</b> Mr. Sreekumar P
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Secretary:</b> P. Mohammedkutty
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Treasurer:</b> Mr. C. Venugopalan
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Contact No:</b> 9745844552
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Emal:</b> <a>edathiruthy.alpha@gmail.com</a>
                </p>
                <a className="text-sky-700 text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl mt-5 cursor-pointer">
                  CLICK TO GET DIRECTIONS
                </a>
              </div>
            </div>
            <hr className="border-t-2 border-gray-500" />

            <div className="flex flex-wrap py-5">
              <img
                className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                src={contact4}
              />
              <div className="w-full lg:w-1/2 xl:w-2/3 flex flex-col lg:px-5 xl:px-12 2xl-px-16 px-0 py-5">
                <p className="text-3xl sm:text-4xl lg:text-2xl xl:text-4xl 2xl:text-5xl font-normal">
                  EDATHIRUTHY LINK CENTRE
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  Alpha Palliative Care, Edathiruthy Link Center, Halwa Theruvu,
                  High School Road, Chenthrapinni, Thrissur-680687.
                </p>
                <p className="mt-5">
                  <b>Present:</b> Mr. Mohanan Painat
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Contact No:</b> 04802835100, 2835200
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Emal:</b> <a>alpha.mathilakam@gmail.com</a>
                </p>
                <a className="text-sky-700 text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl mt-5 cursor-pointer">
                  CLICK TO GET DIRECTIONS
                </a>
              </div>
            </div>
            <hr className="border-t-2 border-gray-500" />

            <div className="flex flex-wrap py-5">
              <img
                className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                src={contact5}
              />
              <div className="w-full lg:w-1/2 xl:w-2/3 flex flex-col lg:px-5 xl:px-12 2xl-px-16 px-0 py-5">
                <p className="text-3xl sm:text-4xl lg:text-2xl xl:text-4xl 2xl:text-5xl font-normal">
                  MATHILAKAM LINK CENTRE
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  Alpha Palliative Care, Edathiruthy Link Center, Halwa Theruvu,
                  High School Road, Chenthrapinni, Thrissur-680687.
                </p>
                <p className="mt-5">
                  <b>Present:</b> Mr. Mohanan Painat
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Contact No:</b> 04802835100, 2835200
                </p>
                <p className="text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl">
                  <b>Emal:</b> <a>alpha.mathilakam@gmail.com</a>
                </p>
                <a className="text-sky-700 text-md sm:text-xl md:text-2xl lg:text-md xl:text-xl 2xl:text-2xl mt-5 cursor-pointer">
                  CLICK TO GET DIRECTIONS
                </a>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/4 mt-24">
            <Pagination />
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop
        className="flex fixed shadow-md shadow-gray-500 justify-center items-center rounded-full z-50 bottom-6 right-6"
        smooth
      />
    </div>
  );
};

export default Contact;
