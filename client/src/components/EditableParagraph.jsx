import PropTypes from "prop-types";

const EditableParagraph = ({ name, content, onBlur, className }) => {
  return (
    <p
      name={name}
      className={`${className} cursor-pointer`}
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
  onBlur: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default EditableParagraph;
