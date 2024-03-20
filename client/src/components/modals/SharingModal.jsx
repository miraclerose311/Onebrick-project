import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { clearLoading, setLoading } from "../../features/loadingSlice";

// import imageUrl from "../../assets/img/WallofHope/alpha_building_high_res.jpg";

const SharingModal = ({ hideModal }) => {
  const dispatch = useDispatch();

  const [socialData, setSocialData] = useState({});

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "SharingModal-pan") {
      hideModal();
    }
  };

  console.log(socialData);

  useEffect(() => {
    dispatch(setLoading());
    dispatch(clearLoading());
  }, []);

  console.log(socialData);

  useEffect(() => {
    const getSocialMediaData = async () => {
      dispatch(setLoading());
      try {
        const response = await fetch(`${backendUrl}/api/social/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const dataArray = await response.json();
          const dataObject = dataArray.reduce((obj, item) => {
            obj[item.mediaType] = item; // Assume each item has 'mediaType' field
            return obj;
          }, {});
          setSocialData(dataObject);
        } else {
          console.error(
            "Error fetching social media data:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching social media data:", error);
      }
    };
    getSocialMediaData();
  }, [dispatch]);

  const title = "Sharing URL";

  return (
    <div
      id="SharingModal-pan"
      className="fixed flex justify-center items-center w-full h-full z-50"
      onClick={handleClose}
    >
      <div className="bg-white shadow-md shadow-gray-300 rounded-md absolute p-5 w-[480px] flex flex-col gap-3 items-center">
        <div className="w-full flex justify-between">
          <p className="text-2xl font-bold mt-5 px-8">Help by Sharing</p>
          <IoCloseCircleOutline
            onClick={() => hideModal()}
            size={24}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            {/* Assuming that socialData['Facebook'] has already been set */}
            <FacebookShareButton
              url={socialData["Facebook"]?.link}
              id="Facebook"
              quote="Check out this awesome website!"
              hashtag="#react"
              image={socialData["Facebook"]?.image}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <label htmlFor="facebook">Facebook</label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <TelegramShareButton
              id="telegram"
              url={socialData["Telegram"]?.link}
              title={title}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <label htmlFor="telegram" className="">
              Telegram
            </label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <TwitterShareButton
              id="twitter"
              url={socialData["Twitter"]?.link}
              title={title}
            >
              <XIcon size={32} round />
            </TwitterShareButton>
            <label htmlFor="Twitter" className="">
              Twitter
            </label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <WhatsappShareButton
              url={socialData["Whatsapp"]?.link}
              image={socialData["Whatsapp"]?.image}
              title={title}
              separator=":: "
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <label>Whatsapp</label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <LinkedinShareButton
              url={socialData["Linkedin"]?.link}
              image={socialData["Linkedin"]?.image}
              title={title}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <label>LinkedIn</label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <EmailShareButton
              url={socialData["Email"]?.link}
              image={socialData["Email"]?.image}
              subject={title}
              body="body"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            <label>Email</label>
          </div>
        </div>
        {/* <div className="w-full px-8 flex gap-2">
          <input
            name="url-input"
            value={shareURL}
            onChange={(e) => setshareURL(e.target.value)}
            className="border border-neutral-700 rounded-md p-1.5 w-3/4 outline-none focus:border-sky-500 text-sm"
          />
          <button className="bg-neutral-700 rounded-md text-white px-6 py-1.5">
            <span className="flex items-center">Copy</span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

SharingModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default SharingModal;
