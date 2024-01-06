import React from "react";

const ImageUpload = ({ previewFile, fileName, onFileSelect, className }) => {
  return (
    <div className="relativ h-full">
      <input
        type="file"
        id={fileName}
        className="hidden"
        name={fileName}
        onChange={(e) => onFileSelect(e.target.files[0], e.target.name)}
      />
      <label htmlFor={fileName} className="cursor-pointer">
        <img
          src={previewFile}
          alt="Upload"
          className={`inline-block h-full w-full object-cover ${className}`}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
