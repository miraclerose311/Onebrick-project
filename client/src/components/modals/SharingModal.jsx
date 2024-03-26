import PropTypes from "prop-types";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  // TelegramIcon,
  // TelegramShareButton,
  // LinkedinIcon,
  // LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

import { IoCloseCircleOutline } from "react-icons/io5";

const SharingModal = ({ hideModal }) => {
  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "SharingModal-pan") {
      hideModal();
    }
  };

  const shareUrl = "https://learning-rattler-vastly.ngrok-free.app";
  const shareimage = "https://learning-rattler-vastly.ngrok-free.app/share.jpg";

  return (
    <div
      id="SharingModal-pan"
      className="fixed flex justify-center items-center w-full h-full top-0 left-0"
      onClick={handleClose}
      style={{ zIndex: 990 }}
    >
      <div
        className="bg-white shadow-md shadow-gray-300 rounded-md absolute p-5 w-[320px] flex flex-col gap-3 items-center"
        style={{ zIndex: 999 }}
      >
        <div className="w-full flex justify-between">
          <p className="text-2xl font-bold mt-5 px-8">Help by Sharing...</p>
          <IoCloseCircleOutline
            onClick={() => hideModal()}
            size={24}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            {/* Assuming that socialData['Facebook'] has already been set */}
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <label htmlFor="facebook">Facebook</label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <TwitterShareButton id="twitter" url={shareUrl}>
              <XIcon size={32} round />
            </TwitterShareButton>
            <label htmlFor="Twitter" className="">
              Twitter
            </label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <label>Whatsapp</label>
          </div>
          <div className="w-32 flex flex-col justify-center items-center gap-3 py-6">
            <EmailShareButton
              url={shareUrl}
              image={shareimage}
              subject="One Brick"
              body="body"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            <label>Email</label>
          </div>
        </div>
      </div>
    </div>
  );
};

SharingModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default SharingModal;
