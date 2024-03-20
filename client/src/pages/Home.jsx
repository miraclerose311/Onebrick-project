import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrickSoldAmount } from "../actions/brick";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import axios from "axios";

import Icon1 from "../assets/img/home/icon1.png";
import Icon2 from "../assets/img/home/icon2.png";
import Icon3 from "../assets/img/home/icon3.png";
import Icon4 from "../assets/img/home/icon4.png";
import Icon5 from "../assets/img/home/icon5.png";
import Icon6 from "../assets/img/home/icon6.png";
import Icon7 from "../assets/img/home/icon7.png";

import Ellipse1 from "../assets/img/home/Ellipse1.png";
import Ellipse2 from "../assets/img/home/Ellipse2.png";

import { AiOutlineInteraction } from "react-icons/ai";

import { getCurrentDonors, getDonorAmount } from "../actions/donor";
import { getContents, updateContent } from "../actions/content";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import SelectionGroup from "../components/SelectionGroup";
import ImageUpload from "../components/FileUpload/ImageUpload";
import EditableParagraph from "../components/FileUpload/EditableParagraph";
import UrlChangeModal from "../components/modals/UrlChangeModal";


const Home = () => {
  const base_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [videoFilePath, setVideoFilePath] = useState("");
  const [scrollY, setScrollY] = useState(0);

  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [currentLoadingComponent, setCurrentLoadingComponent] = useState("");

  const { sold, donor } = useSelector((state) => state.admin);

  const [imgSrc, setImageSrc] = useState({
    Home0: "",
    Home1: "",
    Home2: "",
    Home3: "",
    Home4: "",
    Home5: "",
    Home6: "",
    Avatar1: "",
    Avatar2: "",
    Avatar3: "",
    Avatar4: "",
    Avatar5: "",
    Avatar6: "",
    Avatar7: "",
    Avatar8: "",
    Avatar9: "",
    Avatar10: "",
    Video0: "",
    Video1: "",
  });

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const { role } = jwtDecode(token);
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, [token]);

  const fileList = Object.keys(imgSrc);

  const loadImage = () => {
    fileList.forEach((name) => {
      // Changed from map to forEach since you don't use the returned array
      fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/${name}.txt`)
        .then((response) => response.text())
        .then((base64Text) => {
          setImageSrc((prevImgSrc) => ({
            ...prevImgSrc,
            [name]: `${base64Text}`, // Assuming [name] is a unique key
          }));
        })
        .catch(console.error);
    });
  };

  useEffect(() => {
    dispatch(getBrickSoldAmount());
    dispatch(getDonorAmount());
    dispatch(getCurrentDonors());
    dispatch(getContents());
  }, [dispatch]);

  useEffect(() => {
    loadImage();
  }, []);

  const sendFileData = async (imageData) => {
    try {
			if (Object.keys(imageData).length === 0) {
				console.log("No imageData to send");
				return;
			}
			await axios.post(
				`${base_URL}/api/upload/image`,
				JSON.stringify({ imageData }),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			setImageSrc((prevImgSrc) => ({
				...prevImgSrc,
				[Object.keys(imageData)]: Object.values(imageData),
			}));
			setUploadImageLoading(false);
			setCurrentLoadingComponent("");
		} catch (error) {
			console.error("Image upload failed", error.response || error.message);
		}
  };

  const handleFileChange = async (file, fileName) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target.result;
        const imageData = { [fileName]: base64String };
        setUploadImageLoading(true);
        setCurrentLoadingComponent(fileName);
        sendFileData(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const { currentDonors } = useSelector((state) => state.donor);
  const { contents } = useSelector((state) => state.content);

  const onBlur = (name, content) => {
    const contentData = {
      name,
      content,
    };
    dispatch(updateContent(contentData));
    setIsModalOpen(false);
  };

  const getYouTubeID = (url) => {
    const regExp =
      /^.*(youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:(?:v|e)\/|(?:watch|embed(?:\/popup)?)(?:\.php)?\?v=|\/(?:[a-z]{2}\/)?video\/))([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    }

    return null;
  };

  const handleClickEditVideo = (name, filePath) => {
    if (name === "HomeVideo1") {
      const scrollY = SecondRef.current.offsetTop;
      setScrollY(scrollY);
      setIsModalOpen(true);
    } else {
      setScrollY(10);
      setIsModalOpen(true);
    }
    // setIsModalOpen(true);
    setVideoName(name);
    setVideoFilePath(filePath);
  };

  // useEffect(() => {
  //   // Only open the modal if scrollY is updated to a non-zero value
  //   console.log("scrollY", scrollY);
  //   // if (scrollY !== 0) {
  //   //   setIsModalOpen(true);
  //   // }
  // }, [scrollY]);

  const today = new Date();

  const date = today.getDate().toString().padStart(2, "0");
  const month = today.toLocaleString("default", { month: "short" });
  const year = today.getFullYear();

  const formattedDate = `${date} ${month} ${year}`;

  // Assuming 'sold' is defined somewhere in your component or props
  // const percentSold = (sold / 35000) * 100;

  const FirstRef = useRef();
  const SecondRef = useRef();

  return (
    <div className="relative">
      <Navbar />
      <div
        ref={FirstRef}
        className="flex flex-wrap-reverse lg:flex-wrap-reverse items-center bg-gray-100 w-full pt-28 pb-12 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 relative"
      >
        <div className="w-full lg:w-1/3">
          <div className="flex flex-col gap-5 lg:gap-10 items-center lg:items-start 2xl:py-12 z-20">
            <EditableParagraph
              name="HomeText1"
              content={contents.HomeText1 || "Building Compassion"}
              onBlur={onBlur}
              className="w-full text-sky-700 text-center lg:text-start text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-none font-bold font-montserrat z-20"
            />
            <EditableParagraph
              name="HomeText2"
              content={contents.HomeText2 || "Brick by Brick"}
              onBlur={onBlur}
              className="w-full text-center lg:text-justify text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-montserrat z-20"
            />
            <EditableParagraph
              name="HomeText3"
              content={
                contents.HomeText3 ||
                "Join us in Building Compassion: Brick by brick and make a lasting difference in the lives of those in need of palliative care. Each brick you donate symbolizes not just your generosity, but also your active participation in creating a sanctuary of comfort and hope."
              }
              onBlur={onBlur}
              className="w-full text-center lg:text-start text-md sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl font-raleway z-20"
            />
            <Link
              to="/buybrick"
              className="bg-red-700 hover:bg-red-800  shadow-md shadow-gray-500 text-white text-center py-2 lg:py-3 z-20 w-[200px] rounded-lg max-w-sm  font-montserrat "
            >
              DONATE NOW
            </Link>
          </div>
        </div>

        <div className="w-full h-full lg:w-2/3 lg:pl-8 2xl:pl-12 py-12 flex flex-col justify-items-center items-center z-10 relative">
          {userRole === 2 && (
            <span
              onClick={() =>
                handleClickEditVideo("HomeVideo0", contents.HomeVideo0)
              }
              className="w-full flex justify-start cursor-pointer py-2"
            >
              <AiOutlineInteraction className="w-5 h-5" />
            </span>
          )}
          <div className="w-full h-[30vh] lg:h-[40vh] xl:h-[60vh] 2xl:h-[70vh]">
            {contents.HomeVideo0 && (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeID(
                  contents.HomeVideo0
                )}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Upload"
                className="inline-block h-full w-full object-cover"
              />
            )}
          </div>
          <div className="hidden lg:flex bg-[#FD8D40] rounded-full w-48 h-48 p-4 absolute left-[-40px] bottom-[-40px] z-30">
            <div className="flex flex-col -rotate-45 justify-center items-center bg-transparent rounded-full border-4 border-[#FEB782] border-r-white w-full h-full">
              <span className="text-xl font-bold text-white">Donations</span>
              <span className="text-3xl font-montserrat font-bold text-white">
                ₹<span className="text-5xl">{(sold * 0.1).toFixed(1)}</span>L
              </span>
            </div>
          </div>
          {/* <div className="hidden lg:flex bg-[#FD8D40] rounded-full w-48 h-48 p-4 absolute left-[-40px] bottom-[-40px] z-20">
            <ProgressCircle percent={percentSold} />
            <div className="flex flex-col rotate-[-45] justify-center items-center bg-transparent rounded-full w-full h-full absolute top-0 left-0">
              <span className="text-3xl font-bold text-white z-10">
                Donations
              </span>
              <span className="text-5xl font-montserrat font-bold text-white z-10">
                ₹{(sold * 0.1).toFixed(2)}L
              </span>
            </div>
          </div> */}
        </div>
        <img src={Ellipse1} className="absolute right-0 top-0 z-0" />
        <img src={Ellipse2} className="absolute left-0 top-96" />
      </div>

      <div className="flex flex-wrap w-full items-center px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 pt-12 lg:py-24 relative">
        <div className="w-5/12 bg-gray-200 absolute center-vertical lg:py-32 2xl:py-56 left-0 hidden lg:flex"></div>
        <div className="w-full lg:w-1/3 flex justify-center items-center h-[30vh] lg:h-[40vh] xl:h-[60vh] relative z-10">
          <ImageUpload
            fileName={fileList[1]}
            previewFile={imgSrc[fileList[1]]}
            onFileSelect={handleFileChange}
            loading={
              currentLoadingComponent === fileList[1] && uploadImageLoading
            }
            className="w-full h-full"
          />
        </div>
        <div className="lg:pl-12 xl:pl-20 py-12 lg:py-0 w-full lg:w-2/3">
          <div className="flex flex-col items-center lg:items-start gap-5 lg:gap-10">
            <EditableParagraph
              name="HomeText4"
              content={contents.HomeText4 || "Empowering Lives brick by brick"}
              onBlur={onBlur}
              className="lg:text-left text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-sky-700 leading-none text-center font-montserrat font-medium z-10"
            />
            <EditableParagraph
              name="HomeText5"
              content={
                contents.HomeText5 ||
                "Alpha Hospice's Building Compassion: Brick by Brick campaign embodies our commitment to providing unwavering support and care to those facing life's final journey. Our mission is to extend a hand of comfort, dignity, and compassion to every individual and their families through exceptional palliative care."
              }
              onBlur={onBlur}
              className="text-md sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl text-justify w-full font-raleway z-20"
            />
            <EditableParagraph
              name="HomeText6"
              content={
                contents.HomeText6 ||
                "This campaign is a significant step towards constructing a new hospice - a haven where warmth, care, and understanding thrive. Each brick symbolizes not just a building block but a pledge of hope, healing, and community support Your  involvement is pivotal in turning this vision into a reality, as we strive together towards a collective goal of enhancing palliative care services and facilities."
              }
              onBlur={onBlur}
              className="text-md sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl text-justify w-full turncate font-raleway z-20"
            />
            <Link
              to="/about"
              className="py-2 lg:py-3 w-[200px] rounded-lg border-2 border-red-700 hover:bg-red-800 max-w-sm hover:text-white font-montserrat text-center"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 bg-gray-300 justify-center items-center py-12 lg:p-24">
        <EditableParagraph
          name="HomeText7"
          content={
            contents.HomeText7 || "3 Ways you can help make a difference"
          }
          onBlur={onBlur}
          className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center text-sky-700 font-bold font-montserrat z-10"
        />
        <EditableParagraph
          name="HomeText8"
          content={
            contents.HomeText8 ||
            "Here are three impactful ways you can help us achieve our financial goals and make a meaningful difference in the lives of those we serve. Each action you take brings us closer to realizing our shared vision."
          }
          onBlur={onBlur}
          className="text-center text-md sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl my-3 lg:my-12 font-raleway"
        />
        <div className="flex flex-wrap justify-center w-full">
          <div className="p-5 2xl:p-10 w-full sm:w-2/3 md:w-1/2 xl:w-1/3">
            <div className="bg-gray-800 text-white flex flex-col gap-8 rounded-md items-center p-5 lg:px-8 py-12 h-full hover:scale-105 cursor-pointer transform duration-300">
              <div className="w-24 h-24  shadow-md shadow-gray-600 border-red-800 rounded-full">
                <img
                  src={Icon1}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <EditableParagraph
                name="HomeText9"
                content={contents.HomeText9 || "1. Donate A Brick By Click"}
                onBlur={onBlur}
                className="text-xl md:text-2xl lg:text-2xl 2xl:text-3xl font-bold text-center w-full font-montserra"
              />
              <EditableParagraph
                name="HomeText10"
                content={
                  contents.HomeText10 ||
                  "Contribute directly to our hospice by donating a symbolic brick. Each brick lays the foundation for a haven of care."
                }
                onBlur={onBlur}
                className="text-md sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl font-raleway text-center"
              />
              <button className="py-2 px-6 rounded-lg bg-red-700 hover:bg-red-800 max-w-sm font-montserrat text-center">
                READ MORE
              </button>
            </div>
          </div>
          <div className="p-5 2xl:p-10 w-full sm:w-2/3 md:w-1/2 xl:w-1/3">
            <div className="bg-white flex flex-col gap-8 rounded-md items-center p-5 lg:px-8 py-12 h-full  hover:scale-105 cursor-pointer transform duration-300">
              <div className="w-24 h-24 border-red-800 rounded-full">
                <img
                  src={Icon2}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <EditableParagraph
                name="HomeText11"
                content={contents.HomeText11 || "2. Share Our Stories"}
                onBlur={onBlur}
                className="overflow-clip text-xl md:text-2xl lg:text-2xl 2xl:text-3xl font-bold text-center w-full font-montserra text-sky-700"
              />
              <EditableParagraph
                name="HomeText12"
                content={
                  contents.HomeText12 ||
                  "Contribute directly to our hospice by donating a symbolic brick. Each brick lays the foundation for a haven of care"
                }
                onBlur={onBlur}
                className="text-md sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl font-raleway text-center"
              />
              <button className="overflow-clip py-2 px-2 rounded-lg border-2 border-red-700 hover:bg-red-800 hover:text-white max-w-sm font-montserrat text-center">
                SPREAD THE WORD
              </button>
            </div>
          </div>
          <div className="p-5 2xl:p-10 w-full sm:w-2/3 md:w-1/2 xl:w-1/3">
            <div className=" bg-white flex flex-col gap-8 rounded-md items-center p-5 lg:px-8 py-12 h-full  hover:scale-105 cursor-pointer transform duration-300">
              <div className="w-24 h-24 border-red-800 rounded-full">
                <img
                  src={Icon3}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <EditableParagraph
                name="HomeText13"
                content={contents.HomeText13 || "3.Volunteer With Us"}
                onBlur={onBlur}
                className="overflow-clip text-xl md:text-2xl lg:text-2xl 2xl:text-3xl font-bold text-center w-full font-montserra text-sky-700"
              />
              <EditableParagraph
                name="HomeText14"
                content={
                  contents.HomeText14 ||
                  "Contribute directly to our hospice by donating a symbolic brick. Each brick lays the foundation for a haven of care"
                }
                onBlur={onBlur}
                className="text-md sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl font-raleway text-center"
              />
              <button className="overflow-clip py-2 px-2 rounded-lg border-2 border-red-700 hover:bg-red-800 hover:text-white max-w-sm font-montserrat text-center">
                BECOME A VOLUNTEER
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={SecondRef}
        className="flex flex-col justify-center items-center w-full px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 py-24 mb-16 md:mb-12 xl:mb-24 bg-white"
      >
        <EditableParagraph
          name="HomeText15"
          content={contents.HomeText15 || "Moments of Compassion"}
          onBlur={onBlur}
          className="w-full font-bold text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl text-center text-sky-700 lg:pt-0 font-montserrat z-10"
        />
        <EditableParagraph
          name="HomeText16"
          content={
            contents.HomeText16 ||
            "Explore our gallery to witness the profound impact of your support. Each image and video here tells a story - from the tangible progress of our hospice construction to the life- changing narratives of our beneficiaries."
          }
          onBlur={onBlur}
          className="text-md text-center sm:text-lg md:text-xl lg:text-md xl:text-xl 2xl:text-2xl text-neutral-600 my-6 lg:my-12 font-raleway"
        />
        {userRole === 2 && (
          <span
            onClick={() =>
              handleClickEditVideo("HomeVideo1", contents.HomeVideo1)
            }
            className="w-full flex justify-start cursor-pointer p-2"
          >
            <AiOutlineInteraction className="w-5 h-5" />
          </span>
        )}
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-2/3 h-[30vh] md:h-[40vh] lg:h-[50vh] p-2 drop-shadow-md">
            {contents.HomeVideo1 && (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeID(
                  contents.HomeVideo1
                )}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Upload"
                className="inline-block h-full w-full object-cover"
              />
            )}
          </div>
          <div className="w-full lg:w-1/3 h-[30vh] md:h-[40vh] p-2 mt-auto drop-shadow-md relative">
            <ImageUpload
              fileName={fileList[3]}
              previewFile={imgSrc[fileList[3]]}
              onFileSelect={handleFileChange}
              loading={
                currentLoadingComponent === fileList[3] && uploadImageLoading
              }
              className="w-full h-full"
            />
          </div>
          <div className="w-full lg:w-1/3 h-[30vh] md:h-[40vh] p-2 drop-shadow-md relative">
            <ImageUpload
              fileName={fileList[4]}
              previewFile={imgSrc[fileList[4]]}
              onFileSelect={handleFileChange}
              loading={
                currentLoadingComponent === fileList[4] && uploadImageLoading
              }
              className="w-full h-full"
            />
          </div>
          <div className="w-full lg:w-2/3 h-[30vh] md:h-[40vh] lg:h-[50vh] p-2 drop-shadow-md relative">
            <ImageUpload
              fileName={fileList[5]}
              previewFile={imgSrc[fileList[5]]}
              onFileSelect={handleFileChange}
              loading={
                currentLoadingComponent === fileList[5] && uploadImageLoading
              }
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 py-12 bg-neutral-700 justify-center items-center relative  pt-20 sm:pt-24 md:pt-28 lg:pt-36 xl:pt-40">
        <div className="w-full px-8 sm:px-16 md:px-24 lg:px-24 xl:mb-12 xl:px-48 2xl:px-64 absolute -top-12 md:-top-20 lg:-top-24 xl:-top-28 2xl:-top-30">
          <div className="w-full flex flex-wrap bg-stone-200 py-2 lg:py-5 rounded-md">
            <div className="flex flex-col justify-start items-center w-1/4 text-center">
              <div className="flex justify-center items-center w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
                <img
                  src={Icon4}
                  className="w-5/6 h-5/6 object-cover rounded-full"
                />
              </div>
              <p className="md:p-3 underline underline-offset-4 lg:underline-offset-8 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center font-raleway">
                {sold}
              </p>
              <p className="hidden md:flex text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                Bricks Donated
              </p>
            </div>
            <div className="flex flex-col justify-start items-center w-1/4 text-center">
              <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
                <img
                  src={Icon5}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="md:p-3 underline underline-offset-4 lg:underline-offset-8 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center font-raleway">
                ₹{(sold * 0.1).toFixed(2)}L
              </p>
              <p className="hidden md:flex text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                Donations received
              </p>
            </div>
            <div className="flex flex-col justify-start items-center w-1/4 text-center">
              <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
                <img
                  src={Icon6}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="md:p-3 underline underline-offset-4 lg:underline-offset-8 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center font-raleway">
                {donor}
              </p>
              <p className="hidden md:flex text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                Donors
              </p>
            </div>
            <div className="flex flex-col justify-start items-center w-1/4 text-center">
              <div className="w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24 h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 border-red-800 rounded-full">
                <img
                  src={Icon7}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="md:p-3 underline underline-offset-4 lg:underline-offset-8 text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center font-raleway">
                {Math.floor(sold / 3500).toFixed(2)}%
              </p>
              <p className="hidden md:flex text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                Towards our Goal
              </p>
            </div>
          </div>
        </div>
        <EditableParagraph
          name="HomeText17"
          content={contents.HomeText17 || "Hearts of Generosity"}
          onBlur={onBlur}
          className="text-2xl lg:text-4xl text-center text-gray-300 font-raleway w-full"
          iconClassName="text-white"
        />
        <EditableParagraph
          name="HomeText18"
          content={contents.HomeText18 || "Our Donors Speak"}
          onBlur={onBlur}
          className="w-full text-4xl text-white font-bold md:text-5xl xl:text-6xl 2xl:text-7xl text-center font-montserrat z-10"
          iconClassName="text-white"
        />
        <EditableParagraph
          name="HomeText19"
          content={
            contents.HomeText19 ||
            "Discover the inspiring voices of our donors whose generosity fuels our mission. Their testimonials reflect the spirit of altruism and the profound impact of every contribution."
          }
          onBlur={onBlur}
          className="text-lg lg:text-xl 2xl:text-2xl text-center text-gray-400 py-3 font-raleway"
          iconClassName="text-white"
        />

        <div className="flex justify-center lg:pt-12 flex-wrap">
          <div className="w-full md:w-1/2 lg:w-1/3 p-5 lg:p-2 2xl:p-5 relative">
            <div className="bg-neutral-800 shadow-md shadow-gray-900 p-5 xl:p-8 2xl:p-12 flex flex-col gap-8 rounded-md">
              {/* <EditableParagraph
                name="HomeText20"
                content={
                  contents.HomeText20 ||
                  "Every brick in the hospice symbolizes hope and compassion. As a donor.it’s rewarding to see the real difference my contribution makes in the lives of patients and their families."
                }
                onBlur={onBlur}
                className="text-xl text-gray-300 indent-8"
              /> */}
              <p className="text-xl text-gray-300 indent-8">
                Every brick in the hospice symbolizes hope and compassion. As a
                donor.it’s rewarding to see the real difference my contribution
                makes in the lives of patients and their families.
              </p>
              <hr className="border-gray-500" />
              <div className="flex gap-3 items-center">
                <div className="bg-white rounded-full w-16 h-16 relative">
                  <ImageUpload
                    fileName={fileList[15]}
                    previewFile={imgSrc[fileList[15]]}
                    onFileSelect={handleFileChange}
                    loading={
                      currentLoadingComponent === fileList[15] &&
                      uploadImageLoading
                    }
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col ml-3">
                  <p className="text-white text-xl">Vikram Patel</p>
                  <p className="text-white text-xl">Professor</p>
                </div>
              </div>
              <div className="absolute bottom-[-10px] right-10 flex bg-sky-600 rounded-full w-16 h-16 p-3">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  className="w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90.51 122.88"
                >
                  <title>comma</title>
                  <path
                    fill="#ffffff"
                    d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
                  />
                </svg>
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  className="w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90.51 122.88"
                >
                  <title>comma</title>
                  <path
                    fill="#ffffff"
                    d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-5 lg:p-2 2xl:p-5 relative">
            <div className="bg-neutral-800 shadow-md shadow-gray-900 p-5 xl:p-8 2xl:p-12 flex flex-col gap-8 rounded-md">
              {/* <EditableParagraph
                name="HomeText21"
                content={
                  contents.HomeText21 ||
                  "Every brick in the hospice symbolizes hope and compassion. As a donor.it’s rewarding to see the real difference my contribution makes in the lives of patients and their families."
                }
                onBlur={onBlur}
                className="text-xl text-gray-300 indent-8"
              /> */}
              <p className="text-xl text-gray-300 indent-8">
                Every brick in the hospice symbolizes hope and compassion. As a
                donor.it’s rewarding to see the real difference my contribution
                makes in the lives of patients and their families.
              </p>
              <hr className="border-gray-500" />
              <div className="flex gap-3 items-center">
                <div className="bg-white rounded-full w-16 h-16 relative">
                  <ImageUpload
                    fileName={fileList[7]}
                    previewFile={imgSrc[fileList[7]]}
                    onFileSelect={handleFileChange}
                    loading={
                      currentLoadingComponent === fileList[7] &&
                      uploadImageLoading
                    }
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col ml-3">
                  <p className="text-white text-xl">Vikram Patel</p>
                  <p className="text-white text-xl">Professor</p>
                </div>
              </div>
              <div className="absolute bottom-[-10px] right-10 flex bg-sky-600 rounded-full w-16 h-16 p-3">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  className="w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90.51 122.88"
                >
                  <title>comma</title>
                  <path
                    fill="#ffffff"
                    d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
                  />
                </svg>
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  className="w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90.51 122.88"
                >
                  <title>comma</title>
                  <path
                    fill="#ffffff"
                    d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-5 lg:p-2 2xl:p-5 relative">
            <div className="bg-neutral-800 shadow-md shadow-gray-900 p-5 xl:p-8 2xl:p-12 flex flex-col gap-8 rounded-md">
              {/* <EditableParagraph
                name="HomeText22"
                content={
                  contents.HomeText22 ||
                  "Every brick in the hospice symbolizes hope and compassion. As a donor.it’s rewarding to see the real difference my contribution makes in the lives of patients and their families."
                }
                onBlur={onBlur}
                className="text-xl text-gray-300 indent-8"
              /> */}
              <p className="text-xl text-gray-300 indent-8">
                Every brick in the hospice symbolizes hope and compassion. As a
                donor.it’s rewarding to see the real difference my contribution
                makes in the lives of patients and their families.
              </p>
              <hr className="border-gray-500" />
              <div className="flex gap-3 items-center">
                <div className="bg-white rounded-full w-16 h-16 relative">
                  {/* <img src={Avatar3} className="w-full h-full rounded-full" /> */}
                  <ImageUpload
                    fileName={fileList[8]}
                    previewFile={imgSrc[fileList[8]]}
                    onFileSelect={handleFileChange}
                    loading={
                      currentLoadingComponent === fileList[8] &&
                      uploadImageLoading
                    }
                    className="rounded-full"
                  />
                </div>
                <div className="flex-col ml-3">
                  <p className="text-white text-xl">Vikram Patel</p>
                  <p className="text-white text-xl">Professor</p>
                </div>
              </div>
              <div className="absolute bottom-[-10px] right-10 flex bg-sky-600 rounded-full w-16 h-16 p-3">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  className="w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90.51 122.88"
                >
                  <title>comma</title>
                  <path
                    fill="#ffffff"
                    d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
                  />
                </svg>
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  className="w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 90.51 122.88"
                >
                  <title>comma</title>
                  <path
                    fill="#ffffff"
                    d="M46.94,0c18.2-.34,35.67,10.56,41.59,33.31,8.5,32.65-11.38,78-41,89.56H22.58c9.22-10.58,38.62-38.4,34.18-53.4-6.91,7.94-17,11-26.76,9.84C-19.27,73.68-3.79.94,46.94,0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <button className="py-3 px-6 rounded-lg bg-white shadow-md hover:shadow-white/50 hover:border border-red-700 font-montserrat text-center my-12 lg:mt-24 lg:mb-12">
          SEE ALL TESTIMONIALS
        </button>
      </div>

      <div className="flex flex-col w-full px-8 sm:px-20 md:px-24 lg:px-32 xl:px-48 2xl:px-64 bg-gray-100 py-12 sm:py-20 md:py-24 lg:py-28 xl:py-32 2xl:py-36 justify-center items-center">
        <EditableParagraph
          name="HomeText23"
          content={contents.HomeText23 || "Some of our recent donors"}
          onBlur={onBlur}
          className="w-full text-4xl text-sky-700 font-bold md:text-5xl xl:text-6xl 2xl:text-7xl text-center font-montserrat z-10"
        />
        <div className="w-full flex flex-wrap py-8 md:py-12 xl:py-16">
          {currentDonors && currentDonors.slice(0, 6).map((donorInfo, index) => (
            <div
              key={index}
              className="w-full  md:w-1/2 xl:w-1/3 flex flex-wrap p-1 md:p-2"
            >
              <div className="w-full flex bg-sky-500 shadow-sm shadow-gray-500 rounded-lg p-4 sm:p-3 md:p-2 lg:p-4 xl:p-2 2xl:p-5">
                <div className="flex justify-center items-center w-1/3 sm:w-1/4 md:w-2/5 md:p-2">
                  <img
                    alt="Donor avatar"
                    src={donorInfo.avatar}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2 md:w-3/5 justify-center lg:justify-center text-white text-md sm:text-xl pl-3 sm:pl-5 md:px-3 lg:pl-8 xl:pl-3 2xl:pl-6 font-medium">
                  <p>{donorInfo.fullName}</p>
                  <p>
                    {donorInfo.purchasedBricksCount} Bricks: ₹
                    {donorInfo.purchasedBricksCount * 10000}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="py-3 px-6 rounded-lg bg-red-700 shadow-md shadow-gray-500 hover:bg-red-800 text-white max-w-sm font-montserrat text-center">
          SEE ALL DONORS
        </button>
      </div>

      <div className="flex flex-wrap items-center w-full bg-gray-200  px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 lg:py-12 2xl:py-24 relative justify-center">
        <div className="w-full lg:w-1/3 h-[40vh] xl:h-[50vh] 2xl:h-[60vh] flex justify-center py-8 lg:py-0 z-10 items-center relative">
          <ImageUpload
            fileName={fileList[7]}
            previewFile={imgSrc[fileList[7]]}
            onFileSelect={handleFileChange}
            loading={
              currentLoadingComponent === fileList[7] && uploadImageLoading
            }
            className="w-full"
          />
        </div>
        <div className="w-full lg:w-2/3 py-8 md:py-12 z-10 flex flex-col items-center lg:items-start lg:pl-16 xl:pl-24 gap-5">
          <EditableParagraph
            name="HomeText24"
            content={contents.HomeText24 || "Frequently Asked Questions"}
            onBlur={onBlur}
            className="w-full text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-center lg:text-left"
          />
          <EditableParagraph
            name="HomeText25"
            content={contents.HomeText25 || "Undestanding Our Campaign"}
            onBlur={onBlur}
            className="text-sky-700 text-4xl font-bold md:text-5xl xl:text-6xl 2xl:text-7xl text-center lg:text-left pb-5"
          />
          <SelectionGroup />
        </div>
      </div>

      <div className="flex flex-wrap px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 items-center bg-slate-600 p-8">
        <div className="flex flex-col w-full lg:w-1/3 p-5">
          <p className="text-center lg:text-left mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white">
            {sold} Bricks
          </p>
          <p className="text-center lg:text-left mx-auto text-sm sm:text-md md:text-lg lg:text-xl 2xl:text-2xl text-white">
            Donated as on {formattedDate}
          </p>
        </div>
        <div className="w-full h-1 lg:w-1 lg:h-20 bg-white"></div>
        <div className="flex flex-col w-full lg:w-1/3 p-5">
          <p className="text-center lg:text-left mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl  font-bold text-yellow-400 ">
            ₹{(sold * 0.1).toFixed(2)}L
          </p>
          <p className="text-center lg:text-left mx-auto text-sm sm:text-md md:text-lg lg:text-xl 2xl:text-2xl text-white">
            Raised as on {formattedDate}
          </p>
        </div>
        <div className="w-full h-1 lg:w-1 lg:h-20 bg-white"></div>
        <div className="w-full ml-auto lg:w-auto flex justify-center p-5">
          <Link
            to="/buybrick"
            className="bg-red-700 rounded-md font-medium text-white hover:bg-red-800 px-12 py-3 text-center lg:text-left text-sm sm:text-md md:text-lg lg:text-xl"
          >
            DONATE A BRICK
          </Link>
        </div>
      </div>
      <UrlChangeModal
        name={videoName}
        value={videoFilePath}
        onBlur={onBlur}
        isModalOpen={isModalOpen}
        scrollY={scrollY}
        closeModal={() => setIsModalOpen(false)}
      />
      <Footer />
      <ScrollToTop
        className="scroll-to-top flex fixed shadow-md shadow-gray-800 justify-center items-center rounded-full bottom-6 right-6"
        smooth
        height={18}
        style={{ zIndex: 999 }}
      />
    </div>
  );
};

export default Home;
