import React from "react";

const ImageUpload = ({ previewFile, fileName, onFileSelect }) => {
  return (
    <div className="relativ h-full">
      <input
        type="file"
        id="image-upload"
        name={fileName}
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files[0], e.target.name)}
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <img
          src={previewFile}
          alt="Upload"
          className="inline-block rounded-xl h-full w-full object-cover"
        />
      </label>
    </div>
  );
};

export default ImageUpload;
