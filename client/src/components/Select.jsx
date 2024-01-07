import { useState } from "react";
import PropTypes from "prop-types";

const Select = ({ optionArray }) => {
  const [options, setOptions] = useState([]);

  optionArray.map((index, option) => {
    options.push(<option key={index}>{option}</option>);
  });

  return (
    <select onChange={setOptions((e) => e.target.value)}>{options}</select>
  );
};

Select.propTypes = {
  optionArray: PropTypes.object.isRequired,
};

export default Select;
