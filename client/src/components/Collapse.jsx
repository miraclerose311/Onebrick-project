import { useState } from 'react';
import PropTypes from 'prop-types';

const Collapse = ({ id, expand, title, content, handleClickExpand }) => {
  const classOfTitle = expand
    ? "text-red-800 text-xl underline decoration-red-800"
    : "text-xl";
  const classOfButton = expand
    ? "text-red-800 text-3xl"
    : "text-2xl text-center";
  const classOfContent = expand ? "flex text-xl w-fill" : "hidden";

  return (
    <div
      id={id}
      expand={expand}
      className="bg-white w-full cursor-pointer px-3 py-2 flex-col rounded-lg"
      onClick={() => handleClickExpand(id, expand)}
    >
      <div className="flex justify-between items-center">
        <p className={classOfTitle}>{title}</p>
        <button className={classOfButton}>{expand ? "-" : "+"}</button>
      </div>
      <p className={classOfContent}>{content}</p>
    </div>
  );
};

Collapse.propTypes = {
  id: PropTypes.number.isRequired,
  expand: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleClickExpand: PropTypes.func.isRequired,
};

export default Collapse;
