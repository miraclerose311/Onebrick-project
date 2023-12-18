import PropTypes from "prop-types";
import userImg from "../../assets/img/user.png";

const BrickInformationModal = ({ brickInfo, modalPosition }) => {
	return (
		<div
			className="border border-gray-600 bg-gray-200 opacity-90 absolute py-2 px-4 h-56 w-72 items-center rounded-md z-10"
			style={{
				left: modalPosition.x,
				top: modalPosition.y,
				boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
			}}
		>
			{"dedication" in brickInfo ? (
				<div className="flex flex-col w-full h-full items-center justify-around">
					<p className="font-raleway">
						I dedicate this brick to my
						<span>{brickInfo.dedication.relationship}.</span>
						<br />
						<span className="text-xl font-montesrrat font-medium">
							<b>{brickInfo.dedication.name}</b>
						</span>
					</p>
					<div className="w-2/3 rounded-lg">
						<div className="flex flex-col w-full items-center justify-between gap-y-3">
							<img
								className="w-20 h-20 rounded-full"
								src={userImg}
								alt="dedication image"
							></img>
						</div>
					</div>
					<p className="font-raleway text-md">{brickInfo.dedication.message}</p>
				</div>
			) : (
				<div className="flex flex-col w-full h-full justify-center items-center px-4">
					<p className="font-lg py-2 font-bold font-raleway text-2xl">
						{brickInfo.brick_id}
					</p>
					<p className="font-lg py-2 font-bold font-raleway">
						Dedication information dose not exist.
					</p>
				</div>
			)}
		</div>
	);
};

BrickInformationModal.propTypes = {
	brickInfo: PropTypes.object.isRequired,
	modalPosition: PropTypes.object.isRequired,
};

export default BrickInformationModal;
