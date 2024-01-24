import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ScrollToTop from "react-scroll-to-top";
import axios from "axios";

import { getContents, updateContent } from "../actions/content";
import ImageUpload from "../components/FileUpload/ImageUpload";
import EditableParagraph from "../components/FileUpload/EditableParagraph";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

import { AiOutlineInteraction } from "react-icons/ai";

import Ellipse10 from "../assets/img/Ellipse10.png";
import UrlChangeModal from "../components/modals/UrlChangeModal";

const Contact = () => {
  const base_URL = `${import.meta.env.VITE_BACKEND_URL}`;

  const { token } = useSelector((state) => state.auth);
  const [imageData, setImageData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [currentLoadingComponent, setCurrentLoadingComponent] = useState("");
  const [imgSrc, setImageSrc] = useState({
    contact1: "",
    contact2: "",
    contact3: "",
    contact4: "",
    contact5: "",
    Avatar11: "",
    Avatar12: "",
    Avatar13: "",
    Avatar14: "",
    Avatar15: "",
    Avatar16: "",
    Avatar17: "",
    Avatar18: "",
    Avatar19: "",
    Avatar20: "",
  });

  const dispatch = useDispatch();

  const fileList = Object.keys(imgSrc);

  const handleFileChange = async (file, fileName) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64String = e.target.result;
        setUploadImageLoading(true);
        setCurrentLoadingComponent(fileName);
        setImageData({ [fileName]: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const sendFileData = async () => {
    try {
      if (Object.keys(imageData).length === 0) {
        console.log("No imageData to send");
        return;
      }
      const response = await axios.post(
        `${base_URL}/api/upload/image`,
        JSON.stringify({ imageData }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Image uploaded", response.data);
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

  useEffect(() => {
    sendFileData();
  }, [imageData]);

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
    loadImage();
    dispatch(getContents());
  }, []);

  useEffect(() => {
    if (token) {
      const { role } = jwtDecode(token);
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, [token]);

  const { contents } = useSelector((state) => state.content);

  const onBlur = (name, content) => {
    const contentData = {
      name,
      content,
    };
    setIsModalOpen(false);
    dispatch(updateContent(contentData));
  };
  return (
    <div className="relative">
      <Navbar />

      <div>
        <div className="bg-gray-300 px-12 sm:px-16 md:px-24 lg:px-32 xl:px-44 2xl:px-64 pt-32">
          <div className="flex flex-wrap pb-24 pt-12">
            <div className="w-full lg:w-1/3 h-[40vh] xl:h-[50vh] justify-center relative">
              <ImageUpload
                fileName={fileList[0]}
                previewFile={imgSrc[fileList[0]]}
                onFileSelect={handleFileChange}
                loading={
                  currentLoadingComponent === fileList[0] && uploadImageLoading
                }
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-2/3 flex flex-col mt-12 lg:mt-0 lg:pl-12 2xl:pl-24 justify-center">
              <EditableParagraph
                name="ContactText1"
                content={contents.ContactText1 || "Contact Us"}
                onBlur={onBlur}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-sky-700 font-montserrat font-bold"
              />
              <EditableParagraph
                name="ContactText2"
                content={
                  contents.ContactText2 ||
                  "Welcome to Alpha Hospice. We are here to assist you with any questions, guidance, or support you may need. Whether you are seeking information about our services, interested in volunteering, or need details about our Link Centers, our team is ready to help. Reach out to us, and we'll ensure you receive the assistance and information you're looking for. Your journey towards compassion and care starts here."
                }
                onBlur={onBlur}
                className="text-lg sm:text-xl md:text-2xl lg:text-lg xl:text-xl 2xl:text-2xl text-justify font-raleway text-gray-600 pt-5 lg:pb-0 pb-12"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap py-24 justify-center items-center px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 relative">
          <div className="w-full md:w-5/6 lg:w-1/2 flex flex-col items-start gap-2 lg:gap-6 z-20 relative">
            <div className="lg:pr-24">
              <EditableParagraph
                name="ContactText3"
                content={contents.ContactText3 || "Get in touch now!"}
                onBlur={onBlur}
                className="text-center md:text-left text-sky-700 text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl font-medium pb-8"
              />
            </div>
            <div className="flex gap-2 sm:gap-4 md:gap-8 lg:gap-4 xl:gap-6 2xl:gap-8 items-center">
              <div className="flex">
                <ImageUpload
                  fileName={fileList[5]}
                  previewFile={imgSrc[fileList[5]]}
                  onFileSelect={handleFileChange}
                  loading={uploadImageLoading}
                  className="p-3 w-4/5 h-4/5"
                />
              </div>
              <div className="flex">
                <EditableParagraph
                  name="ContactText4"
                  content={contents.ContactText4 || "+91 94977 13923"}
                  onBlur={onBlur}
                  className="text-sky-700 text-md sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-montserrat font-medium"
                />
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 md:gap-8 lg:gap-4 xl:gap-6 2xl:gap-8 items-center">
              <div>
                <ImageUpload
                  fileName={fileList[6]}
                  previewFile={imgSrc[fileList[6]]}
                  onFileSelect={handleFileChange}
                  loading={uploadImageLoading}
                  className="p-3 w-4/5 h-4/5"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <Link to={contents.MapUrl} target="blank">
                    <EditableParagraph
                      name="ContactText5"
                      content={
                        contents.ContactText5 || "click here for directions"
                      }
                      onBlur={onBlur}
                      className="text-sky-700 text-md sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-justify font-montserrat font-medium"
                    />
                  </Link>
                  {userRole === 2 && (
                    <span
                      onClick={() => setIsModalOpen(!isModalOpen)}
                      className="cursor-pointer"
                    >
                      <AiOutlineInteraction className="w-5 h-5" />
                    </span>
                  )}
                </div>

                <EditableParagraph
                  name="ContactText6"
                  content={
                    contents.ContactText6 ||
                    "IX/627, Edamuttam, Palappetty, India"
                  }
                  onBlur={onBlur}
                  className="text-sky-700 text-sm sm:text-xl lg:text-md xl:text-lg 2xl:text-xl text-justify w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4 md:gap-8 lg:gap-4 xl:gap-6 2xl:gap-8 items-center">
              <div>
                <ImageUpload
                  fileName={fileList[7]}
                  previewFile={imgSrc[fileList[7]]}
                  onFileSelect={handleFileChange}
                  loading={uploadImageLoading}
                  className="p-3 w-4/5 h-4/5"
                />
              </div>
              <div className="flex-col">
                <EditableParagraph
                  name="ContactText7"
                  content={contents.ContactText7 || "communications"}
                  onBlur={onBlur}
                  className="text-sky-700 text-md sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-justify font-montserrat font-medium"
                />
                <EditableParagraph
                  name="ContactText8"
                  content={contents.ContactText8 || "@alphapalliativecare.org"}
                  onBlur={onBlur}
                  className="text-sky-700 text-md sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl text-justify font-montserrat font-medium"
                />
              </div>
            </div>

            <div className="flex sm:gap-1 md:gap-5 lg:gap-1 xl:gap-3 2xl:gap-5 items-center">
              <div className="hidden sm:flex">
                <ImageUpload
                  fileName={fileList[8]}
                  previewFile={imgSrc[fileList[8]]}
                  onFileSelect={handleFileChange}
                  loading={uploadImageLoading}
                  className="p-3 w-11/12 h-11/12"
                />
              </div>
              <div className="flex items-center">
                <div className="flex justify-center items-center p-3">
                  <ImageUpload
                    fileName={fileList[9]}
                    previewFile={imgSrc[fileList[9]]}
                    onFileSelect={handleFileChange}
                    loading={uploadImageLoading}
                    className="w-10 h-10"
                  />
                </div>
                <div className="flex justify-center items-center p-3">
                  <ImageUpload
                    fileName={fileList[10]}
                    previewFile={imgSrc[fileList[10]]}
                    onFileSelect={handleFileChange}
                    loading={uploadImageLoading}
                    className="w-10 h-10"
                  />
                </div>
                <div className="flex justify-center items-center p-3">
                  <ImageUpload
                    fileName={fileList[11]}
                    previewFile={imgSrc[fileList[11]]}
                    onFileSelect={handleFileChange}
                    loading={uploadImageLoading}
                    className="w-10 h-10"
                  />
                </div>
                <div className="flex justify-center items-center p-3">
                  <ImageUpload
                    fileName={fileList[12]}
                    previewFile={imgSrc[fileList[12]]}
                    onFileSelect={handleFileChange}
                    loading={uploadImageLoading}
                    className="w-10 h-10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-wrap pt-12 lg:pt-0 z-20">
            <div className="w-full lg:w-1/2 flex p-1.5">
              <input
                placeholder="First Name"
                className="w-full px-3 py-3 focus:border-sky-700 outline-none border border-sky-300 focus:border-2 rounded drop-shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2 flex p-1.5">
              <input
                placeholder="Last Name"
                className="w-full px-3 py-3 focus:border-sky-700 outline-none border border-sky-300 focus:border-2 rounded drop-shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2 flex p-1.5">
              <input
                placeholder="Email ID"
                className="w-full px-3 py-3 focus:border-sky-700 outline-none border border-sky-300 focus:border-2 rounded drop-shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2 flex p-1.5">
              <input
                placeholder="Mobile No"
                className="w-full px-3 py-3 focus:border-sky-700 outline-none border border-sky-300 focus:border-2 rounded drop-shadow-lg"
              />
            </div>

            <div className="w-full flex p-1.5">
              <textarea
                placeholder="Message"
                className="w-full px-3 pt-2 pb-24 focus:border-sky-700 outline-none border border-sky-300 focus:border-2 rounded drop-shadow-lg"
              />
            </div>

            <div className="w-full p-1.5">
              <button className="w-full p-3 bg-sky-600 hover:bg-sky-700 rounded text-white">
                Send Message
              </button>
            </div>
          </div>
          <img
            className="hidden lg:flex absolute right-0 top-0 z-0 object-fill h-full w-2/3"
            src={Ellipse10}
          />
          <UrlChangeModal
            name="MapUrl"
            value={contents.MapUrl}
            onBlur={onBlur}
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        </div>

        {/* <div className="flex flex-col gap-5 md:gap-8 xl:gap-12 w-full py-12 bg-neutral-200 z-20  px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64">
          <EditableParagraph
            name="ContactText9"
            content={contents.ContactText9 || "Our Care Network"}
            onBlur={onBlur}
            className="text-sky-700 text-4xl xl:text-6xl 2xl:text-7xl"
          />
          <EditableParagraph
            name="ContactText10"
            content={
              contents.ContactText10 ||
              "Search for an Alpha centre in your district. Select the district and click on Enter button"
            }
            onBlur={onBlur}
            className="text-gray-500 text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg"
          />
          <input
            className="w-full lg:w-3/4 py-3 px-5 rounded-xl border border-gray-500 text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg"
            placeholder="Search for District"
          />
        </div> */}

        {/* <div className="w-full py-24 px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center py-5">
              <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/4">
                <ImageUpload
                  fileName={fileList[1]}
                  previewFile={imgSrc[fileList[1]]}
                  onFileSelect={handleFileChange}
                loading={uploadImageLoading}

                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-col justify-center lg:px-12 xl:px-16 2xl-px-24 mt-5 lg:mt-0">
                <p className="text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-medium">
                  ALPHA HOSPICE EDAMUTTAM
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  Alpha Palliative Care, Alpha Hospice Edamuttan, Edamuttam P.O.
                  Thrissur - 680568
                </p>
                <p className="mt-2 text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Present:</span> Mr. Mohanan
                  Painat
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Contact No:</span> 04802835100,
                  2835200
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Email:</span>{" "}
                  <a>alpha.mathilakam@gmail.com</a>
                </p>
                <a className="text-sky-700 text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg mt-2 cursor-pointer">
                  CLICK TO GET DIRECTIONS
                </a>
              </div>
            </div>
            <hr className="border-t-2 border-gray-500" />

            <div className="flex flex-wrap items-center py-5">
              <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/4">
                <ImageUpload
                  fileName={fileList[2]}
                  previewFile={imgSrc[fileList[2]]}
                  onFileSelect={handleFileChange}
                loading={uploadImageLoading}

                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-col justify-center lg:px-12 xl:px-16 2xl-px-24 mt-5 lg:mt-0">
                <p className="text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-medium">
                  THRISSUR LINK CENTRE
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  Alpha Palliative Care, Thrissur Link Centre, Masjid ROad,
                  Road, Near Congress Bhavan, Kovilakaparambu. ANyyanthole.
                  Thrissure - 04
                </p>
                <p className="mt-2 text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Present:</span> Mr. Sreekumar P
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Secretary:</span> P.
                  Mohammedkutty
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Treasurer:</span> Mr. C.
                  Venugopalan
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Contact No:</span> 9745844552
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Email:</span>{" "}
                  <a>edathiruthy.alpha@gmail.com</a>
                </p>
                <a className="text-sky-700 text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg mt-2 cursor-pointer">
                  CLICK TO GET DIRECTIONS
                </a>
              </div>
            </div>
            <hr className="border-t-2 border-gray-500" />

            <div className="flex flex-wrap items-center py-5">
              <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/4">
                <ImageUpload
                  fileName={fileList[3]}
                  previewFile={imgSrc[fileList[3]]}
                  onFileSelect={handleFileChange}
                loading={uploadImageLoading}

                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-col justify-center lg:px-12 xl:px-16 2xl-px-24 mt-5 lg:mt-0">
                <p className="text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-medium">
                  EDATHIRUTHY LINK CENTRE
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  Alpha Palliative Care, Edathiruthy Link Center, Halwa Theruvu,
                  High School Road, Chenthrapinni, Thrissur-680687.
                </p>
                <p className="mt-2">
                  <span className="font-medium">Present:</span> Mr. Mohanan
                  Painat
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Contact No:</span> 04802835100,
                  2835200
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Email:</span>{" "}
                  <a>alpha.mathilakam@gmail.com</a>
                </p>
                <a className="text-sky-700 text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg mt-2 cursor-pointer">
                  CLICK TO GET DIRECTIONS
                </a>
              </div>
            </div>
            <hr className="border-t-2 border-gray-500" />

            <div className="flex flex-wrap items-center py-5">
              <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/4">
                <ImageUpload
                  fileName={fileList[4]}
                  previewFile={imgSrc[fileList[4]]}
                  onFileSelect={handleFileChange}
                loading={uploadImageLoading}

                />
              </div>
              <div className="w-full lg:w-2/3 flex flex-col justify-center lg:px-12 xl:px-16 2xl-px-24 mt-5 lg:mt-0">
                <p className="text-xl md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-medium">
                  MATHILAKAM LINK CENTRE
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  Alpha Palliative Care, Edathiruthy Link Center, Halwa Theruvu,
                  High School Road, Chenthrapinni, Thrissur-680687.
                </p>
                <p className="mt-2">
                  <span className="font-medium">Present:</span> Mr. Mohanan
                  Painat
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Contact No:</span> 04802835100,
                  2835200
                </p>
                <p className="text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg">
                  <span className="font-medium">Email:</span>{" "}
                  <a>alpha.mathilakam@gmail.com</a>
                </p>
                <a className="text-sky-700 text-sm sm:text-md md:text-lg lg:text-sm xl:text-md 2xl:text-lg mt-2 cursor-pointer">
                  CLICK TO GET DIRECTIONS
                </a>
              </div>
            </div>
          </div>
          <div className="mx-auto w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/4 xl:w-1/4 mt-24">
            <Pagination />
          </div>
        </div> */}
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
