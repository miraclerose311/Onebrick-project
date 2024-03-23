import PropTypes from "prop-types";

import { useEffect, useState } from "react";

import { clearLoading, setLoading } from "../../features/loadingSlice";
import { FacebookShareButton } from "react-share";
import {
  FaTelegramPlane,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";

const NewShareModal = ({ hideModal }) => {
  const dispatch = useDispatch();

  const [socialData, setSocialData] = useState({});

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getSocialMediaData = async () => {
      dispatch(setLoading());
      try {
        const response = await fetch(`${backendUrl}/api/social/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warnning": true,
          },
        });
        if (response.ok) {
          const dataArray = await response.json();
          const dataObject = dataArray.reduce((obj, item) => {
            obj[item.mediaType] = item; // Assume each item has 'mediaType' field
            return obj;
          }, {});
          console.log(dataObject);
          setSocialData(dataObject);
        } else {
          console.error(
            "Error fetching social media data:",
            response.statusText
          );
        }
        dispatch(clearLoading());
      } catch (error) {
        console.error("Error fetching social media data:", error);
      }
    };
    getSocialMediaData();
  }, []);

  console.log("socialData", socialData);
  const title = "AlphaHospice";

  // at the top of your component
  const [shareUrls, setShareUrls] = useState({});

  useEffect(() => {
    if (Object.keys(socialData).length !== 0) {
      const newShareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(socialData.Facebook.url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(socialData.Twitter.url)}&text=${encodeURIComponent(socialData.Twitter.description)}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(socialData.Linkedin.url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(socialData.Linkedin.description)}&source=${encodeURIComponent(socialData.Linkedin.url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${socialData.Whatsapp.url}`)}`,
        telegram: `https://t.me/share/url?url=${socialData.Telegram.url}&text=${encodeURIComponent(title)}`,
      };
      setShareUrls(newShareUrls);
    }
  }, [socialData]);

  const handleFacebookShare = () => {
    if (socialData) {
      window.FB.ui({
        method: "share",
        href: socialData.Facebook.url,
        quote: "Alphahospice One brick",
        picture: socialData.Facebook.image,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      style={{ zIndex: 200 }}
    >
      <div
        className="flex flex-col items-center relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Please Share to Your Socia Media!
        </h3>

        <div className="flex justify-center space-x-4">
          {socialData && (
            <FacebookShareButton
              url={socialData.Facebook.url}
              title="Alphahospice One brick"
              image={socialData.Facebook.image}
              onClick={handleFacebookShare}
            />
          )}

          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href={shareUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700"
          >
            <FaLinkedinIn size={24} />
          </a>
          <a
            href={shareUrls.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500"
          >
            <FaWhatsapp size={24} />
          </a>
          <a
            href={shareUrls.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400"
          >
            <FaTelegramPlane size={24} />
          </a>
          <a href={shareUrls.email} target="_self" className="text-red-600">
            <MdEmail size={24} />
          </a>
        </div>
        {/* Close Button */}
        <button
          onClick={hideModal}
          type="button"
          className="mt-4 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

NewShareModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default NewShareModal;
