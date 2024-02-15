import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/auth";

import userAvatar from "../../assets/img/user.png";
import { useEffect } from "react";

const ConfirmModal = ({
	filtered,
	clickedIndex,
	handleDedicate,
	handleClickOnList,
	handleShowAll,
	handleGoToDedicate,
	hideComfirmModal,
	hideModal,
}) => {
	const dispatch = useDispatch();

	const userId = filtered[0].user;

	useEffect(() => {
		dispatch(getUser(userId));
	}, [userId]);

	const { user } = useSelector((state) => state.user);
	const { bricks } = useSelector((state) => state.brick);

	const brickArray = bricks?.filter((element) => element.user === userId);

	const clickedBrick = bricks[clickedIndex];

	const onClickBrick = (brick_id) => {
		handleClickOnList(brick_id);
		hideModal();
	};

	const onClickShowAll = (brickIDs) => {
		hideComfirmModal();
		handleShowAll(brickIDs);
	};

	return (
		<div className='flex flex-col items-center justify-center gap-4 sm:w-4/5'>
			<div className='flex flex-col items-end gap-4'>
				<img
					src={user.picture ? user.picture : userAvatar}
					className='w-28 h-28 rounded-full mx-auto'
				/>
				<p className='text-2xl font-bold font-raleway'>{user.fullName}</p>
			</div>
			<p className='text-xl font-raleway font-medium hidden sm:flex'>
				{brickArray.length}&nbsp;BRICKS DONATED
			</p>
			<div className='w-full max-h-48 scroll-hidden hidden sm:flex sm:flex-col border border-gray-100'>
				{brickArray.map((brick) => (
					<p
						key={brick.brick_id}
						className='w-full text-md border-b-2 border-gray-200 font-raleway my-2 cursor-pointer'
					>
						{brick.dedication ? (
							<span onClick={() => onClickBrick(brick.brick_id)}>
								Dedicated to {brick.dedication.name}
							</span>
						) : (
							<span onClick={() => handleGoToDedicate(brick.brick_id)}>
								Not dedicated
							</span>
						)}
					</p>
				))}
			</div>
			<span
				className='cursor-pointer bg-red-700 rounded-sm hover:bg-red-600 text-white px-4 py-1'
				onClick={() => onClickShowAll(brickArray)}
			>
				View all
			</span>
			<div className='bg-[#FBF8BE] shadow-lg shadow-yellow-300/50 rounded-xl w-full hidden sm:flex flex-col gap-6 p-4'>
				<p className='text-lg sm:text-2xl font-medium font-raleway'>
					Do you want to donate more bricks?
				</p>
				<p className='text-sm sm:text-lg font-raleway'>
					It’s simple. Just mouseover a brick and click to Donate!
				</p>
			</div>
			{clickedBrick.dedication ? (
				<div className='flex flex-col gap-3 sm:gap-1 w-full h-full items-center justify-around py-2 sm:hidden'>
					{/* {user.fullName != clickedBrick.donor.fullName && <p className="font-raleway">
            Donated by{" "}
            <b>
              {user.fullName == clickedBrick.donor.fullName
                ? "You"
                : clickedBrick.donor.fullName}
            </b>
            .
          </p>} */}
					<p className='font-raleway'>
						<br /> Dedicated to <b>{clickedBrick.dedication.name}</b> who is{" "}
						{user.fullName == clickedBrick.donor.fullName ? "my" : "His(Her)"}{" "}
						<b>{clickedBrick.dedication.relationship}</b>.
					</p>
					<div className='w-2/3 rounded-lg'>
						<div className='flex flex-col w-full items-center justify-between gap-y-3'>
							<img
								className='w-20 h-20 rounded-full'
								src={
									clickedBrick.dedication && clickedBrick.dedication.image
										? clickedBrick.dedication.image
										: userAvatar
								}
								alt='dedication image'
							/>
						</div>
					</div>
					<p className='font-raleway text-md'>
						{clickedBrick.dedication.message}
					</p>
				</div>
			) : (
				<div className='flex flex-col gap-4 w-full h-full justify-center items-center px-4 py-6 sm:hidden'>
					<p className='text-xl font-bold font-montserrat'>
						{clickedBrick.brick_id}
					</p>
					<p className='font-lg font-bold font-raleway'>
						Donated by{" "}
						{user.fullName == clickedBrick.donor.fullName
							? "You"
							: clickedBrick.donor.fullName}
					</p>
					{clickedBrick.user === userId && (
						<button
							className='text-gray-100 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md cursor-pointer'
							onClick={handleDedicate}
						>
							DEDICATE NOW
						</button>
					)}
				</div>
			)}
		</div>
	);
};

ConfirmModal.propTypes = {
	filtered: PropTypes.array.isRequired,
	clickedIndex: PropTypes.number.isRequired,
	handleDedicate: PropTypes.func.isRequired,
	handleClickOnList: PropTypes.func.isRequired,
	handleShowAll: PropTypes.func.isRequired,
	handleGoToDedicate: PropTypes.func.isRequired,
	hideComfirmModal: PropTypes.func.isRequired,
	hideModal: PropTypes.func.isRequired,
};

export default ConfirmModal;
