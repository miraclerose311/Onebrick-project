import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertWord } from "../../actions/support";
import { setAlert } from "../../features/alertSlice";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

import { IoClose } from "react-icons/io5";

import WordsofSupportModalImg from "../../assets/img/WallofHope/words_modal.png";

const WordsofSupportsModal = ({ hideModal }) => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const { token } = useSelector((state) => state.auth);

  // Initialize userId
  useEffect(() => {
    if (token) {
      const { id } = jwtDecode(token);
      setUserId(id);
    } else {
      setUserId(null);
    }
  }, []);

  const handleSubmit = () => {
    if (message) {
      const supportWordData = {
        message,
        user: userId,
      };
      dispatch(insertWord(supportWordData));
      setMessage("");
      hideModal();
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
			id='wordsModal-pan'
			className='fixed flex h-full w-full overflow-y-auto justify-center items-center z-50'
			onClick={handleClose}
		>
			<div className='w-5/6 sm:w-2/3 md:w-2/3 2xl:w-7/12 h-2/3 sm:h-4/5 lg:h-1/2 2xl:h-2/3 flex bg-white rounded-md relative'>
				<IoClose
					className='absolute top-4 right-4 cursor-pointer w-8 h-8'
					onClick={() => hideModal()}
				/>
				<div className='w-1/2 hidden lg:flex'>
					<img
						src={WordsofSupportModalImg}
						className='rounded-l-md object-cover w-full h-full'
					/>
				</div>
				<div className='w-full lg:w-1/2 h-full px-8 md:px-12 py-6 flex flex-col justify-evenly shadow-md shadow-gray-500 rounded-r-md items-center gap-3'>
					<div className='flex flex-col gap-2'>
						<p className='text-2xl sm:text-4xl lg:text-2xl xl:text-4xl 2xl:text-4xl font-montserrat font-bold'>
							Words of Support
						</p>
						<p className='w-full text-center text-gray-600'>
							Before departing, kindly offer a brief message of encouragement
							that may assist us in attracting additional donors
						</p>
					</div>
					<textarea
						name='message'
						placeholder='Message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className='w-full max-h-56 h-2/5 2xl:h-48 p-2 border border-gray-200 hover:border-sky-300 outline-none rounded-sm'
					/>
					<button
						onClick={handleSubmit}
						className='py-1 md:py-2 px-12 mt-3 rounded-lg border-2 border-sky-700 hover:bg-sky-800 hover:text-white font-montserrat text-center'
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
