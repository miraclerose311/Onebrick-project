import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { insertWord } from "../../actions/support";
import { setAlert } from "../../features/alertSlice";

import { IoClose } from "react-icons/io5";

import WordsofSupportModalImg from "../../assets/img/WallofHope/words_modal.png";

const WordsofSupportsModal = ({ hideModal }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (title && message) {
      const supportWordData = {
        title,
        message,
      };
      dispatch(insertWord(supportWordData));
      setTitle("");
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
      className="fixed flex h-[100vh] w-[100vw] overflow-y-auto justify-center items-center bg-gray-800/40 z-50"
      onClick={handleClose}
    >
      <div className="w-5/6 md:w-2/3 2xl:w-7/12 h-1/2 sm:h-2/3 lg:h-1/2 2xl:h-2/3 flex bg-white rounded-md relative">
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
        <div className="w-full lg:w-1/2 px-12 py-24 flex flex-col justify-center items-center gap-6 sm:gap-16 lg:gap-6 xl:gap-10 2xl:gap-12">
          <p className="text-3xl sm:text-4xl lg:text-2xl xl:text-4xl 2xl:text-4xl font-montserrat font-bold">
            Words of Support
          </p>
          <div className="flex flex-col w-full items-start">
            <textarea
              name="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full max-h-48 h-32 sm:h-48 lg:h-32 2xl:h-48 p-2 border border-gray-200 hover:border-orange-300 rounded-sm"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="py-2 px-12 mt-3 rounded-lg border-2 border-red-700 hover:bg-red-800 hover:text-white font-montserrat text-center"
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
