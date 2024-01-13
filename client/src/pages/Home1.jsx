import ScrollToTop from "react-scroll-to-top";
import { useDispatch, useSelector } from "react-redux";
import { getBrickSoldAmount } from "../actions/brick";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

// Import assests
import Image1 from "../assets/img/home/home1.jpg";
import Image2 from "../assets/img/home/home2.jpg";
import Image4 from "../assets/img/home/home4.jpg";
import Image5 from "../assets/img/home/home5.jpg";
import Image6 from "../assets/img/home/home6.png";

import Icon1 from "../assets/img/home/icon1.png";
import Icon2 from "../assets/img/home/icon2.png";
import Icon3 from "../assets/img/home/icon3.png";
import Icon4 from "../assets/img/home/icon4.png";

import Avatar1 from "../assets/img/home/avatar1.jpg";
import Avatar2 from "../assets/img/home/avatar2.jpg";
import Avatar3 from "../assets/img/home/avatar3.jpg";

import Ellipse1 from "../assets/img/home/Ellipse1.png";
import Ellipse2 from "../assets/img/home/Ellipse2.png";
import Rectangle from "../assets/img/home/Rectangle.png";

import AvatarImg from "../assets/img/AvatarImg.jpg";
import SelectionGroup from "../components/SelectionGroup";

const Landing = () => {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getBrickSoldAmount());
  }, [dispath]);

  const { sold } = useSelector((state) => state.admin);

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-wrap-reverse lg:flex-wrap-reverse bg-gray-100 w-full pt-28 px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-56 lg:pr-0 xl:pr-0 2xl:pr-0 relative">
        <div className="lg:w-1/3 w-full">
          <div className="flex flex-col gap-10 items-center lg:items-start py-12">
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-sky-700 leading-none text-center lg:text-start font-montserrat z-20">
              Building Compassion
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-center lg:text-left font-montserrat z-20">
              Brick by Brick
            </p>
            <p className="w-full text-center lg:text-start text-md sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl turncate font-raleway z-20">
              Join us in Building Compassion: Brick by brick and make a lasting
              difference in the lives of those in need of palliative care. Each
              brick you purchase symbolizes not just your generosity, but also
              your active participation in creating a sanctuary of comfort and
              hope.
            </p>
            <Link
              to="/buybrick"
              className="py-4 z-20 w-[200px] rounded-lg bg-red-700 hover:bg-red-800 max-w-sm text-white font-montserrat text-center"
            >
              DONATE NOW
            </Link>
          </div>
        </div>
        <div className="py-12 lg:pt-0 xl:pl-8 lg:pr-24 lg:pl-8 xl:pr-44 2xl:pr-56 z-10 lg:w-2/3 relative">
          <img src={Image1} className="object-cover w-full h-full" />
          <div className="hidden lg:flex bg-[#FD8D40] rounded-full w-48 h-48 p-4 absolute left-[-40px] bottom-[-40px] z-20">
            <div className="flex flex-col -rotate-45 justify-center items-center bg-transparent rounded-full border-4 border-[#FEB782] border-r-white w-full h-full">
              <span className="text-3xl font-bold text-white">Donations</span>
              <span className="text-2xl font-montserrat font-bold text-white">
                ${sold * 100}Cr
              </span>
            </div>
          </div>
        </div>

        <img src={Ellipse1} className="absolute right-0 top-0 z-0" />
        <img src={Ellipse2} className="absolute left-0 top-96" />
      </div>

      <div className="flex flex-wrap w-full px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 lg:py-24 relative">
        <img
          src={Rectangle}
          className="absolute hidden lg:flex left-0 top-48 z-0"
        />
        <div className="flex mt-12 justify-center items-center w-full lg:w-1/3 z-10">
          <img className="object-cover w-full" src={Image2} />
        </div>
        <div className="lg:pl-12 xl:pl-20 py-24 lg:py-0 lg:w-2/3 w-full">
          <div className="flex flex-col items-center lg:items-start gap-10">
            <p className="lg:text-left text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-sky-700 leading-none text-center font-montserrat font-medium z-10">
              Empowering Lives brick by brick
            </p>
            <p className="text-xl text-justify w-full turncate font-raleway z-20">
              Alpha Hospice`&apos;`s Building Compassion: Brick by Brick
              campaign embodies our commitment to providing unwavering support
              and care to those facing life`&apos;`s final journey. Our mission
              is to extend a hand of comfort, dignity, and compassion to every
              individual and their families through exceptional palliative care
            </p>
            <p className="text-xl text-justify w-full turncate font-raleway z-20">
              This campaign is a significant step towards constructing a new
              hospice - a haven where warmth, care, and understanding thrive.
              Each brick symbolizes not just a building block but a pledge of
              hope, healing, and community support Your involvement is pivotal
              in turning this vision into a reality, as we strive together
              towards a collective goal of enhancing palliative care services
              and facilities
            </p>
            <Link
              to="/about"
              className="py-4 w-[200px] rounded-lg border-2 border-red-700 hover:bg-red-800 max-w-sm hover:text-white font-montserrat text-center"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 bg-gray-300 justify-center items-center py-12 lg:p-24">
        <p className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center text-sky-700 font-bold font-montserrat z-10">
          3 Ways you can help make a difference
        </p>
        <p className="text-2xl text-center py-3 lg:py-12 font-raleway">
          Here are three impactful ways you can help us achieve our financial
          goals and make a meaningful difference in the lives of those we serve.
          Each action you take brings us closer to realizing our shared vision
        </p>
        <div className="flex flex-wrap justify-center w-full">
          <div className="p-5 w-full md:w-3/4 lg:w-1/3">
            <div className=" bg-gray-800 text-white flex flex-col gap-8 rounded-md items-center p-5 lg:p-5 lg:px-8 xl:py-12 h-full">
              <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
                <img
                  src={Icon1}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-center font-montserra">
                1. Buy A Brick By Click
              </p>
              <p className="text-xl text-center font-raleway">
                Contribute directly to our hospice by purchasing a symbolic
                brick. Each brick lays the foundation for a haven of care
              </p>
              <button className="py-2 px-6 rounded-lg bg-red-700 hover:bg-red-800 max-w-sm font-montserrat text-center">
                READ MORE
              </button>
            </div>
          </div>
          <div className="p-5 w-full md:w-3/4 lg:w-1/3">
            <div className="bg-white flex flex-col gap-8 rounded-md items-center p-5 lg:p-5 lg:px-8 xl:py-12 h-full">
              <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
                <img
                  src={Icon1}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="overflow-clip text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-center font-montserra text-sky-700">
                2. Share Our Stories
              </p>
              <p className="text-xl text-center font-raleway">
                Contribute directly to our hospice by purchasing a symbolic
                brick. Each brick lays the foundation for a haven of care
              </p>
              <button className="overflow-clip py-2 px-2 rounded-lg border-2 border-red-700 hover:bg-red-800 hover:text-white max-w-sm font-montserrat text-center">
                SPREAD THE WORD
              </button>
            </div>
          </div>
          <div className="p-5 w-full md:w-3/4 lg:w-1/3">
            <div className=" bg-white  flex flex-col gap-8 rounded-md items-center p-5 lg:p-5 lg:px-8 xl:py-12 h-full">
              <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
                <img
                  src={Icon1}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-center font-montserra text-sky-700">
                3. Volunteer With Us
              </p>
              <p className="text-xl text-center font-raleway">
                Contribute directly to our hospice by purchasing a symbolic
                brick. Each brick lays the foundation for a haven of care
              </p>
              <button className="overflow-clip py-2 px-2 rounded-lg border-2 border-red-700 hover:bg-red-800 hover:text-white max-w-sm font-montserrat text-center">
                BECOME A VOLUNTEER
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full  px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 py-24 lg:py-32 xl:mb-24 bg-white justify-center items-center">
        <p className="font-bold text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center text-sky-700 lg:pt-0 font-montserrat z-10">
          Moments of Compassion
        </p>
        <p className="text-2xl text-center text-neutral-600 py-6 lg:py-12 font-raleway">
          Explore our gallery to witness the profound impact of your support.
          Each image and video here tells a story - from the tangible progress
          of our hospice construction to the life- changing narratives of our
          beneficiaries.
        </p>
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-2/3 p-2 drop-shadow-md">
            <video
              src="https://youtu.be/xC1we1BdLDE"
              controls
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full lg:w-1/3 p-2 mt-auto drop-shadow-md">
            <img src={Image6} className="object-cover w-full" />
          </div>
          <div className="w-full lg:w-1/3 p-2 drop-shadow-md">
            <img src={Image5} className="object-cover w-full" />
          </div>
          <div className="w-full lg:w-2/3 p-2 drop-shadow-md relative">
            <img src={Image4} className="object-cover w-full " />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full px-8 sm:px-16 md:px-24 lg:px-24 xl:mb-12 xl:px-48 2xl:px-64 bg-neutral-700 justify-center items-center relative">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 flex flex-wrap px-5 bg-stone-300 absolute top-[-100px] xl:top-[-150px] py-5 md:py-10 xl:py-16">
          <div className="flex flex-col justify-start items-center w-1/4 text-center">
            <div className="flex justify-center items-center w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
              <img
                src={Icon1}
                className="w-5/6 h-5/6 object-cover rounded-full"
              />
            </div>
            <p className="mt-3 underline underline-offset-4 lg:underline-offset-8 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-center font-raleway">
              13258
            </p>
            <p className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              Brick purchased
            </p>
          </div>
          <div className="flex flex-col justify-start items-center w-1/4 text-center">
            <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
              <img
                src={Icon2}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="mt-3 underline underline-offset-4 lg:underline-offset-8 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-center font-raleway">
              $7.3 Cr
            </p>
            <p className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              Donations received
            </p>
          </div>
          <div className="flex flex-col justify-start items-center w-1/4 text-center">
            <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
              <img
                src={Icon3}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="mt-3 underline underline-offset-4 lg:underline-offset-8 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-center font-raleway">
              6325
            </p>
            <p className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              Donors
            </p>
          </div>
          <div className="flex flex-col justify-start items-center w-1/4 text-center">
            <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
              <img
                src={Icon4}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="mt-3 underline underline-offset-4 lg:underline-offset-8 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-center font-raleway">
              23%
            </p>
            <p className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
              Towards our Goal
            </p>
          </div>
        </div>
        <p className="text-4xl text-center text-gray-300 font-raleway pt-32 sm:pt-44 lg:pt-56 xl:pt-64">
          Hearts of Generosity
        </p>
        <p className="text-4xl text-white font-bold md:text-5xl xl:text-6xl 2xl:text-7xl text-center font-montserrat z-10">
          Our Donors Speak
        </p>
        <p className="text-2xl text-center text-gray-400 py-3 font-raleway">
          Discover the inspiring voices of our donors whose generosity fuels our
          mission. Their testimonials reflect the spirit of altruism and the
          profound impact of every contribution.
        </p>

        <div className="flex pt-12 flex-wrap">
          <div className="w-full md:w-1/3 p-5 relative">
            <div className="bg-neutral-900 p-5 xl:p-8 2xl:p-12 flex flex-col gap-3">
              <p className="xl:text-2xl lg:text-xl ml:text-md text-gray-300 text-justify">
                Every brick in the hospice symbolizes hope and compassion. As a
                donor.it’s rewarding to see the real difference my contribution
                makes in the lives of patients and their families.
              </p>
              <div className="bg-stone-800 w-full h-2"></div>
              <div className="flex self-start">
                <div className="bg-white rounded-full w-12 h-12">
                  <img src={Avatar1} className="w-full h-full rounded-full" />
                </div>
                <div className="flex-col ml-3">
                  <p className="text-white">Vikram Patel</p>
                  <p className="text-white">Professor</p>
                </div>
              </div>
              <div className="absolute bottom-[-10px] right-10 flex gap-1">
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
          <div className="w-full md:w-1/3 p-5 relative">
            <div className="bg-neutral-900 p-5 xl:p-8 2xl:p-12 flex flex-col gap-3">
              <p className="xl:text-2xl lg:text-xl ml:text-md text-gray-300 text-justify">
                Every brick in the hospice symbolizes hope and compassion. As a
                donor.it’s rewarding to see the real difference my contribution
                makes in the lives of patients and their families.
              </p>
              <div className="bg-stone-800 w-full h-2"></div>
              <div className="flex self-start">
                <div className="bg-white rounded-full w-12 h-12">
                  <img src={Avatar2} className="w-full h-full rounded-full" />
                </div>
                <div className="flex-col ml-3">
                  <p className="text-white">Vikram Patel</p>
                  <p className="text-white">Professor</p>
                </div>
              </div>
              <div className="absolute bottom-[-10px] right-10 flex gap-1">
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
          <div className="w-full md:w-1/3 p-5 relative">
            <div className="bg-neutral-900 p-5 xl:p-8 2xl:p-12 flex flex-col gap-3">
              <p className="xl:text-2xl lg:text-xl ml:text-md text-gray-300 text-justify">
                Every brick in the hospice symbolizes hope and compassion. As a
                donor.it’s rewarding to see the real difference my contribution
                makes in the lives of patients and their families.
              </p>
              <div className="bg-stone-800 w-full h-2"></div>
              <div className="flex self-start">
                <div className="bg-white rounded-full w-12 h-12">
                  <img src={Avatar3} className="w-full h-full rounded-full" />
                </div>
                <div className="flex-col ml-3">
                  <p className="text-white">Vikram Patel</p>
                  <p className="text-white">Professor</p>
                </div>
              </div>
              <div className="absolute bottom-[-10px] right-10 flex gap-1">
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
        </div>
        <button className="py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white max-w-sm font-montserrat text-center m-12">
          SEE ALL TESTIMONIALS
        </button>
      </div>

      <div className="flex flex-col w-full px-8 sm:px-20 md:px-24 lg:px-24 xl:px-48 2xl:px-64 bg-gray-100 py-12 sm:py-20 md:py-24 lg:py-28 xl:py-32 2xl:py-36 justify-center items-center">
        <p className="text-4xl text-sky-700 font-bold md:text-5xl xl:text-6xl 2xl:text-7xl text-center font-montserrat z-10">
          Some of our recent donors
        </p>
        <div className="w-full flex flex-wrap py-8 md:py-12 xl:py-16">
          <div className="w-full  md:w-1/2 xl:w-1/3 flex flex-wrap p-1 md:p-2 xl:p-3">
            <div className="w-full flex bg-sky-600 rounded-lg p-4 sm:p-3 md:p-2 lg:p-4 xl:p-2 2xl:p-5">
              <div className="flex justify-center items-center w-1/2 xs:1/3 sm:w-1/4 md:w-2/5 md:p-2">
                <img src={AvatarImg} className="rounded-lg" />
              </div>
              <div className="flex flex-col md:w-3/5 justify-center lg:justify-around text-white text-sm sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-2xl pl-3 sm:pl-5 md:px-3 lg:pl-8 xl:pl-3 2xl:pl-6 font-medium">
                <p>LG Kuttukaran</p>
                <p>L123-456-7890</p>
                <p>5 Bricks: $50,0000</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 flex flex-wrap p-1 md:p-2 xl:p-3">
            <div className="w-full flex bg-sky-600 rounded-lg p-4 sm:p-3 md:p-2 lg:p-4 xl:p-2 2xl:p-5">
              <div className="flex justify-center items-center w-1/2 xs:1/3 sm:w-1/4 md:w-2/5 md:p-2">
                <img src={AvatarImg} className="rounded-lg" />
              </div>
              <div className="flex flex-col md:w-3/5 justify-center lg:justify-around text-white text-sm sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-2xl pl-3 sm:pl-5 md:px-3 lg:pl-8 xl:pl-3 2xl:pl-6 font-medium">
                <p>LG Kuttukaran</p>
                <p>L123-456-7890</p>
                <p>5 Bricks: $50,0000</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="w-full  md:w-1/2 xl:w-1/3 flex flex-wrap p-1 md:p-2 xl:p-3">
            <div className="w-full flex bg-sky-600 rounded-lg p-4 sm:p-3 md:p-2 lg:p-4 xl:p-2 2xl:p-5">
              <div className="flex justify-center items-center w-1/2 xs:1/3 sm:w-1/4 md:w-2/5 md:p-2">
                <img src={AvatarImg} className="rounded-lg" />
              </div>
              <div className="flex flex-col md:w-3/5 justify-center lg:justify-around text-white text-sm sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-2xl pl-3 sm:pl-5 md:px-3 lg:pl-8 xl:pl-3 2xl:pl-6 font-medium">
                <p>LG Kuttukaran</p>
                <p>L123-456-7890</p>
                <p>5 Bricks: $50,0000</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="w-full  md:w-1/2 xl:w-1/3 flex flex-wrap p-1 md:p-2 xl:p-3">
            <div className="w-full flex bg-sky-600 rounded-lg p-4 sm:p-3 md:p-2 lg:p-4 xl:p-2 2xl:p-5">
              <div className="flex justify-center items-center w-1/2 xs:1/3 sm:w-1/4 md:w-2/5 md:p-2">
                <img src={AvatarImg} className="rounded-lg" />
              </div>
              <div className="flex flex-col md:w-3/5 justify-center lg:justify-around text-white text-sm sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-2xl pl-3 sm:pl-5 md:px-3 lg:pl-8 xl:pl-3 2xl:pl-6 font-medium">
                <p>LG Kuttukaran</p>
                <p>L123-456-7890</p>
                <p>5 Bricks: $50,0000</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="w-full  md:w-1/2 xl:w-1/3 flex flex-wrap p-1 md:p-2 xl:p-3">
            <div className="w-full flex bg-sky-600 rounded-lg p-4 sm:p-3 md:p-2 lg:p-4 xl:p-2 2xl:p-5">
              <div className="flex justify-center items-center w-1/2 xs:1/3 sm:w-1/4 md:w-2/5 md:p-2">
                <img src={AvatarImg} className="rounded-lg" />
              </div>
              <div className="flex flex-col md:w-3/5 justify-center lg:justify-around text-white text-sm sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-2xl pl-3 sm:pl-5 md:px-3 lg:pl-8 xl:pl-3 2xl:pl-6 font-medium">
                <p>LG Kuttukaran</p>
                <p>L123-456-7890</p>
                <p>5 Bricks: $50,0000</p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="w-full  md:w-1/2 xl:w-1/3 flex flex-wrap p-1 md:p-2 xl:p-3">
            <div className="w-full flex bg-sky-600 rounded-lg p-4 sm:p-3 md:p-2 lg:p-4 xl:p-2 2xl:p-5">
              <div className="flex justify-center items-center w-1/2 xs:1/3 sm:w-1/4 md:w-2/5 md:p-2">
                <img src={AvatarImg} className="rounded-lg" />
              </div>
              <div className="flex flex-col md:w-3/5 justify-center lg:justify-around text-white text-sm sm:text-xl md:text-lg lg:text-xl xl:text-lg 2xl:text-2xl pl-3 sm:pl-5 md:px-3 lg:pl-8 xl:pl-3 2xl:pl-6 font-medium">
                <p>LG Kuttukaran</p>
                <p>L123-456-7890</p>
                <p>5 Bricks: $50,0000</p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <button className="py-3 px-6 rounded-lg bg-red-700 hover:bg-red-800 text-white max-w-sm font-montserrat text-center">
          SEE ALL DONORS
        </button>
      </div>

      <div className="flex flex-wrap w-full bg-gray-200  px-8 sm:px-16 md:px-20 lg:px-24 xl:px-48 2xl:px-64 pt-12 relative justify-center">
        <div className="lg:w-1/3 xs:w-full md:w-2/3 z-10 flex items-center">
          <img src={Image2} className="w-full xl:object-cover object-fill" />
        </div>
        <div className="w-full lg:w-2/3 py-8 md:py-12 z-10 flex flex-col items-center lg:items-start lg:pl-16 xl:pl-24">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-center lg:text-left">
            Frequently Asked Questions
          </p>
          <p className="text-sky-700 text-4xl font-bold md:text-5xl xl:text-6xl 2xl:text-7xl text-center lg:text-left pb-5">
            Undestanding Our Campaign
          </p>
          <SelectionGroup />
        </div>
      </div>
      <div className="flex flex-wrap px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 items-center bg-slate-600 p-8">
        <div className="flex flex-col w-full lg:w-1/3 p-5">
          <p className="text-center lg:text-left mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white">
            7634 Bricks
          </p>
          <p className="text-center lg:text-left mx-auto text-sm sm:text-md md:text-lg lg:text-xl 2xl:text-2xl text-white">
            Bought as on 21 Mar 2023
          </p>
        </div>
        <div className="w-full h-1 lg:w-1 lg:h-20 bg-white"></div>
        <div className="flex flex-col w-full lg:w-1/3 p-5">
          <p className="text-center lg:text-left mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl  font-bold text-yellow-400 ">
            $7,63,40,000
          </p>
          <p className="text-center lg:text-left mx-auto text-sm sm:text-md md:text-lg lg:text-xl 2xl:text-2xl text-white">
            Raised until 31 Mar 2023
          </p>
        </div>
        <div className="w-full h-1 lg:w-1 lg:h-20 bg-white"></div>
        <div className="w-full ml-auto lg:w-auto flex justify-center p-5">
          <Link
            to="/buybrick"
            className="bg-red-700 hover:bg-red-800 rounded-md font-medium text-white px-12 py-3 text-center lg:text-left text-sm sm:text-md md:text-lg lg:text-xl"
          >
            BUY A BRICK
          </Link>
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

export default Landing;
