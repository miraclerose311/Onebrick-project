import React, { useState } from "react";

function EditableParagraph() {
  const [content, setContent] = useState("Click to edit this text");

  const handleBlur = (e) => {
    // Update the state when editing is finished
    setContent(e.target.innerText);
  };

  return (
    <div className="App">
      <p
        className="p-2 border-2 rounded-lg focus:outline-none focus:ring ring-sky-600 w-48 h-32 text-justify text-sm overflow-y-auto"
        contentEditable
        suppressContentEditableWarning={true} // Prevents warning for contentEditable without onChange event
        onBlur={handleBlur}
      >
        {content}
      </p>
    </div>
  );
}

export default EditableParagraph;
