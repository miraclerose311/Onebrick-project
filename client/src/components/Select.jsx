/** @format */

import { useState } from "react";

const Select = ({ optionArray }) => {
	const [options, setOptions] = useState([]);

	optionArray.map((index, option) => {
		options.push(<option key={index}>{option}</option>);
	});

	return (
		<select onChange={setOptions((e) => e.target.value)}>{options}</select>
	);
};

export default Select;
