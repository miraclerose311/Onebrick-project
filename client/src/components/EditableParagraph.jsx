import React, { useState } from "react";

const EditableParagraph = ({ content, onBlur, className }) => {
  return (
    <p
      className={className}
      contentEditable
      suppressContentEditableWarning={true} // Prevents warning for contentEditable without onChange event
      onBlur={(e) => onBlur(e.target)}
    >
      {content}
    </p>
  );
};

export default EditableParagraph;
