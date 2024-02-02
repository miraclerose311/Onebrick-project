import { useState } from "react";
import { useDispatch } from "react-redux";
import { insertWord } from "../../actions/support";
import { setAlert } from "../../features/alertSlice";
import PropTypes from "prop-types";

import { IoClose } from "react-icons/io5";

import WordsofSupportModalImg from "../../assets/img/WallofHope/words_modal.png";

const WordsofSupportsModal = ({ hideModal }) => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (message) {
      const supportWordData = {
        message,
      };
      dispatch(insertWord(supportWordData));
      setMessage("");
    } else {
      dispatch(
        setAlert({ alertType: "error", content: "Please feel all inputs." })
      );
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "wordsModal-pan") {
      hideModal();
    }
  };

  return (
    <div
      id="wordsModal-pan"
      className="fixed flex h-full w-full overflow-y-auto justify-center items-center z-50"
      onClick={handleClose}
    >
      <div className="w-5/6 sm:w-2/3 md:w-2/3 2xl:w-7/12 h-2/3 sm:h-4/5 lg:h-1/2 2xl:h-2/3 flex bg-white rounded-md relative">
        <IoClose
          className="absolute top-4 right-4 cursor-pointer w-8 h-8"
          onClick={() => hideModal()}
        />
        <div className="w-1/2 hidden lg:flex">
          <img
            src={WordsofSupportModalImg}
            className="rounded-l-md object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 h-full px-8 md:px-12 py-6 flex flex-col justify-evenly shadow-md shadow-gray-500 rounded-md items-center gap-3">
          <p className="text-2xl sm:text-4xl lg:text-2xl xl:text-4xl 2xl:text-4xl font-montserrat font-bold">
            Words of Support
          </p>
          <textarea
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full max-h-56 h-1/2 2xl:h-48 p-2 border border-gray-200 hover:border-sky-300 outline-none rounded-sm"
          />
          <button
            onClick={handleSubmit}
            className="py-1 md:py-2 px-12 mt-3 rounded-lg border-2 border-sky-700 hover:bg-sky-800 hover:text-white font-montserrat text-center"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

WordsofSupportsModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default WordsofSupportsModal;
