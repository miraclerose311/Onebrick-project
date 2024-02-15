import { FaAnglesRight } from "react-icons/fa6";
import PropTypes from "prop-types";

const CongratulationModal = ({ handleNextModal, handleSkipDedication }) => {
  return (
		<>
			<p className='text-2xl sm:text-4xl font-medium font-montserrat px-8'>
				Congratulations!
			</p>
			<p className='font-raleway text-xl my-4'>
				You have taken a step towards making a significant difference!
				<br />
				Watch this video of one of the beneficaires thanking you for your
				generosity.
			</p>
			<video
				src='https://youtu.be/xC1we1BdLDE'
				width='750'
				height='500'
				controls
				className='border border-gray-400'
			/>
			<p className='font-raleway text-xl my-4'>
				Did you know you could add a dedication? Yes you can dedicate you brick
				in the memory of a close relative or a friend.
			</p>

			<button
				className='text-gray-100 bg-red-700 px-6 py-2 my-4 rounded-md'
				onClick={handleNextModal}
			>
				<span className='flex flex-row items-center justify-between gap-x-3'>
					DEDICATE MY BRICK
					<FaAnglesRight />
				</span>
			</button>
			<p
				className=' cursor-pointer text-sky-700 hover:text-sky-500'
				onClick={handleSkipDedication}
			>
				Offer Words of Support
			</p>
		</>
	);
};

CongratulationModal.propTypes = {
  handleNextModal: PropTypes.func.isRequired,
  handleSkipDedication: PropTypes.func.isRequired,
};

export default CongratulationModal;
