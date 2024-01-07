import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const ImageUpload = ({ previewFile, fileName, onFileSelect, className }) => {
  const { token } = useSelector((state) => state.auth);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const { role } = jwtDecode(token);
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, [token]);

  return (
    <div className="relativ h-full">
      {userRole === 2 && (
        <input
          type="file"
          id={fileName}
          className="hidden cursor-pointer"
          name={fileName}
          onChange={(e) => onFileSelect(e.target.files[0], e.target.name)}
        />
      )}
      <label htmlFor={fileName}>
        <img
          src={previewFile}
          alt="Upload"
          className={`inline-block h-full w-full object-cover ${className}`}
        />
      </label>
    </div>
  );
};

ImageUpload.propTypes = {
  previewFile: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  onFileSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ImageUpload;
