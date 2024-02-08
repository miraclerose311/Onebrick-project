// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getContents } from "../../actions/content";

import PropTypes from "prop-types";

const VideoModal = ({ hideModal }) => {
  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "VideoModalPan") {
      hideModal();
    }
  };
  return (
    <div
      id="VideoModalPan"
      className="fixed flex h-full w-full overflow-y-auto justify-center items-center z-50"
      onClick={handleClose}
    >
      <div className="w-5/6 sm:w-2/3 md:w-2/3 2xl:w-7/12 h-2/3 sm:h-4/5 lg:h-1/2 2xl:h-2/3 flex bg-white rounded-md relative">
        <iframe
          src={`https://www.youtube.com/embed/xC1we1BdLDE`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Upload"
          className="inline-block h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

VideoModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default VideoModal;
