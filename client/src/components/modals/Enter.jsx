import { useSelector, useDispatch } from "react-redux";
import {
	increaseAmount,
	decreaseAmount,
	changeLocation,
} from "../../features/brick/brickSlice";
import { FaAnglesRight } from "react-icons/fa6";
import { isProfiled } from "../../actions/auth";
import { useState } from "react";

const Enter = ({ handleNextModal }) => {
	const { amount, location } = useSelector((state) => state.brick.brick);
	const { profiled } = useSelector((state) => state.auth);
	console.log(profiled);

	const dispatch = useDispatch();
	dispatch(isProfiled());

	const handleIncreaseAmount = () => {
		amount <= 35000 && dispatch(increaseAmount());
	};
	const handleDecreaseAmount = () => {
		amount > 1 && dispatch(decreaseAmount());
	};
	const handleChangeLocation = (e) => {
		dispatch(changeLocation(e.target.value));
	};

	const count = profiled ? 3 : 1;

	return (
		<>
			<p className="text-4xl font-montserrat px-8">Congratulations!</p>
			<p className="font-raleway text-xl my-4">
				You have taken a step towards making a significant difference!
			</p>
			<p className="font-raleway text-xl my-4">
				How many bricks would you like to contribute to our Wall of Hope?
			</p>
			<div className="flex flex-row">
				<button
					className="border px-4 py-1 text-2xl border-gray-400 w-12"
					onClick={handleDecreaseAmount}
				>
					-
				</button>
				<button className="border px-4 py-1 text-2xl border-gray-400 w-12">
					{amount}
				</button>
				<button
					className="border px-4 py-1 text-2xl border-gray-400 w-12"
					onClick={handleIncreaseAmount}
				>
					+
				</button>
			</div>
			<p className="font-montserrat text-2xl py-2">Contribution</p>
			<p className="font-raleway text-xl py-2">₹ {10000 * amount}</p>
			<select
				className="border px-2 py-2 my-6 cursor-pointer border-gray-400"
				onChange={handleChangeLocation}
			>
				<option>I am a Non-Resident Indian</option>
				<option>I am a Foreign National</option>
			</select>
			<button
				className="text-gray-100 bg-red-700 px-4 py-2 rounded-md"
				onClick={(e) => handleNextModal(count)}
			>
				<span className="flex flex-row items-center justify-between gap-x-3">
					READY TO PAY <FaAnglesRight />
				</span>
			</button>
		</>
	);
};

export default Enter;
