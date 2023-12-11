import { useRef } from "react";

const BrickInfo = ({ brickInfo, modalPosition }) => {
	// const modalRef = useRef(null);

	return (
		<div
			className="border border-gray-600 bg-gray-200 opacity-80 absolute px-4 py-8 h-56 w-72 flex flex-col justify-center items-center z-10"
			// ref={modalRef}
			style={{
				left: modalPosition.x,
				top: modalPosition.y,
				boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
			}}
		>
			{"user" in brickInfo ? (
				<div>
					<p className="font-lg py-2 font-bold font-montserrat">
						{brickInfo.user.fullName}
					</p>
					<p className="font-lg py-2 font-bold font-montserrat">
						{brickInfo.user.email}
					</p>
					<p className="font-lg py-2 font-bold font-montserrat">
						{brickInfo.user.profile.country}
					</p>
					<p className="font-lg py-2 font-bold font-montserrat">
						{brickInfo.user.profile.country}
					</p>
					<p className="font-lg py-2 font-bold font-montserrat">
						{brickInfo.user.profile.address}
					</p>
				</div>
			) : (
				<div>
					<p className="font-lg py-2 font-bold font-montserrat">
						{brickInfo.brick_id}
					</p>
					<p className="font-lg py-2 font-bold font-montserrat">
						This brick sold by Ghost
					</p>
				</div>
			)}
		</div>
	);
};

export default BrickInfo;
