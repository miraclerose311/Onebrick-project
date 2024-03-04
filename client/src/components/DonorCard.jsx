import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DonorCard = ({ donorData }) => {
	const navigate = useNavigate();
	
	const { avatar, fullName, purchasedBricksCount } = donorData;

	const buybrickState = {
		isSlideModalOpen: true,
		donorName: fullName,
		pageContent: 7
	}	

	const handleClickReadMore = () => {
		navigate('/buybrick', {state: buybrickState})
	}

	return (
		<>
			<div
				className='w-56 h-80 flex flex-col justify-around items-center p-4 border border-gray-400 rounded-md'
			>
				<div className='w-full flex flex-col items-center gap-2'>
					<img
						className='w-20 h-20 rounded-full'
						src={avatar}
					/>
					<span className='w-full text-center font-bold font-sans overflow-hidden'>
						{fullName}
					</span>
				</div>
				<span>{purchasedBricksCount} bricks sponsored</span>
				<button onClick={handleClickReadMore} className='w-full py-1 border-2 border-red-700 hover:bg-red-700 hover:text-white rounded-full'>
					Read More
				</button>
			</div>
		</>
	);
};

DonorCard.propTypes = {
	donorData: PropTypes.object.isRequired,
};

export default DonorCard;
