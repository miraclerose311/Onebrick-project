import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const SoldModal = ({ modalPosition, brick_id }) => {
	const { amount } = useSelector((state) => state.brick.current);
	return (
		<div
			className='border border-gray-600 rounded bg-gray-200 absolute px-4 py-8 w-52 h-64 flex flex-col justify-center items-center z-30'
			style={{
				left: modalPosition.x,
				top: modalPosition.y,
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
			}}
		>
			<p className='text-md py-3 font-montserrat'>Yay!!</p>
			<p className='w-full text-xs pb-2'>
				You have paid for {amount} Brick of Hope. Your Brick Credential is
			</p>
			<p className='bg-yellow-500 text-sm px-12 py-2 my-3'>{brick_id}</p>
			<p className='text-xs'>
				You can now locate your brick on the Wall of Hope by search using this
				ID or your Name.
			</p>
		</div>
	);
};

SoldModal.propTypes = {
	modalPosition: PropTypes.object.isRequired,
	brick_id: PropTypes.string.isRequired,
};

export default SoldModal;
