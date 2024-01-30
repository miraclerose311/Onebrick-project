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

import imageUrl from "../../assets/img/WallofHope/alpha_building_high_res.jpg";

const SharingModal = ({ hideModal }) => {
  const [shareURL, setshareURL] = useState("");

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "SharingModal-pan") {
      hideModal();
    }
  };

  useEffect(() => {
    setshareURL("https://sunfish-right-mastodon.ngrok-free.app");
  }, []);

  const title = "Sharing URL";

  return (
    <div
      id="SharingModal-pan"
      className="fixed flex justify-center items-center w-[100vw] h-[100vh] bg-gray-800/40 z-50"
      onClick={handleClose}
    >
      <div className="bg-white shadow-md shadow-gray-300 rounded-md absolute p-5 w-[400px] flex flex-col gap-3 items-center">
        <div className="w-full flex justify-between">
          <p className="text-2xl font-bold mt-5 px-8">Help by Sharing</p>
          <IoCloseCircleOutline
            onClick={() => hideModal()}
            size={24}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/3 flex flex-col justify-center items-center gap-3 py-6">
            <FacebookShareButton
              name="facebook"
              url={shareURL}
              quote="Check out this awesome website!"
              hashtag="#react"
              image={imageUrl}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <label htmlFor="facebook">Facebook</label>
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center gap-3 py-6">
            <TwitterShareButton url={shareURL} title={title}>
              <XIcon size={32} round />
            </TwitterShareButton>
            <label>Twitter</label>
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center gap-3 py-6">
            <TelegramShareButton url={shareURL} title={title}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <label>Telegram</label>
          </div>

          <div className="w-1/3 flex flex-col justify-center items-center gap-3 py-6">
            <WhatsappShareButton url={shareURL} title={title} separator=":: ">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <label>Whatsapp</label>
          </div>

          <div className="w-1/3 flex flex-col justify-center items-center gap-3 py-6">
            <LinkedinShareButton url={shareURL}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <label>LinkedIn</label>
          </div>

          <div className="w-1/3 flex flex-col justify-center items-center gap-3 py-6">
            <EmailShareButton url={shareURL} subject={title} body="body">
              <EmailIcon size={32} round />
            </EmailShareButton>
            <label>Email</label>
          </div>
        </div>
        <div className="w-full px-8 flex gap-2">
          <input
            name="url-input"
            value={shareURL}
            onChange={(e) => setshareURL(e.target.value)}
            className="border border-neutral-700 rounded-md p-1.5 w-3/4 outline-none focus:border-sky-500 text-sm"
          />
          <button className="bg-neutral-700 rounded-md text-white px-6 py-1.5">
            <span className="flex items-center">Copy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

SharingModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default SharingModal;
