/** @format */

import { useState } from "react";

const Collapse = ({ title, content }) => {
	const [expand, setExpand] = useState(false);
	const handleToggle = () => {
		setExpand(!expand);
	};
	const classOfTitle = expand
		? "text-red-800 text-xl underline decoration-red-800"
		: "text-xl";
	const classOfButton = expand
		? "text-red-800 text-3xl"
		: "text-2xl text-center";
	const classOfContent = expand ? "flex text-xl" : "hidden";
	return (
		<div className="bg-white w-full px-3 py-2 flex-col rounded-lg">
			<div className="flex justify-between items-center">
				<p className={classOfTitle}>{title}</p>
				<button
					className={classOfButton}
					onClick={handleToggle}
				>
					{expand ? "-" : "+"}
				</button>
			</div>
			<p className={classOfContent}>{content}</p>
		</div>
	);
};

export default Collapse;
