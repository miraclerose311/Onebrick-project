import PropTypes from "prop-types";

const EditableParagraph = ({ name, content, className }) => {
  return (
    <p
      name={name}
      className={`${className} cursor-pointer outline-none focus:border focus:border-sky-300 focus:p-2`}
      contentEditable
      suppressContentEditableWarning={true} // Prevents warning for contentEditable without onChange event
    >
      {content}
    </p>
  );
};

EditableParagraph.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  className: PropTypes.string.isRequired,
};

export default EditableParagraph;
