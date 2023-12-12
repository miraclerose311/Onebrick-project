import { useState } from "react";
import PropTypes from 'prop-types';

const Collapse = ({title, content}) => {
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
	const classOfContent = expand ? "flex text-xl w-fill" : "hidden";

	return (
		<div
			className="bg-white w-full cursor-pointer px-3 py-2 flex-col rounded-lg"
			onClick={handleToggle}
		>
			<div className="flex justify-between items-center">
				<p className={classOfTitle}>{title}</p>
				<button className={classOfButton}>{expand ? "-" : "+"}</button>
			</div>
			<p className={classOfContent}>{content}</p>
		</div>
	);
};

Collapse.PropTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
}

export default Collapse;
