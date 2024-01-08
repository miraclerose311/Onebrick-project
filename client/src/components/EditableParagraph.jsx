import PropTypes from "prop-types";

const EditableParagraph = ({ name, content, className, onBlur }) => {
  return (
    <p
      name={name}
      className={`${className} cursor-pointer outline-none focus:border focus:border-sky-300 focus:p-2`}
      contentEditable
      suppressContentEditableWarning={true} // Prevents warning for contentEditable without onChange event
      onBlur={(e) =>
        onBlur(e.target.getAttribute("name"), e.target.textContent)
      }
    >
      {content}
    </p>
  );
};

EditableParagraph.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  className: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default EditableParagraph;
