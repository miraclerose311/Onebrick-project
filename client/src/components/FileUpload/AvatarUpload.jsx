import PropTypes from "prop-types";

const AvatarUpload = ({ previewFile, onFileSelect }) => {
  return (
    <div className="relativ h-full p-2">
      <input
        type="file"
        id="image-upload"
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files[0], e.target.name)}
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <img
          src={previewFile}
          alt="Upload"
          className="inline-block rounded-full w-20 sm:w-28 h-20 sm:h-28 object-cover"
        />
      </label>
    </div>
  );
};

AvatarUpload.propTypes = {
  previewFile: PropTypes.string.isRequired,
  onFileSelect: PropTypes.func.isRequired,
};

export default AvatarUpload;
