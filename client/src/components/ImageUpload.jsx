import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import Loading from "./Loading";

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

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="relativ h-full flex justify-center items-center">
      {userRole === 1 && (
        <input
          type="file"
          id={fileName}
          className="hidden"
          name={fileName}
          onChange={(e) => onFileSelect(e.target.files[0], e.target.name)}
        />
      )}
      <label htmlFor={fileName} className="flex justify-center w-full h-full">
        {previewFile ? (
          <img
            src={previewFile}
            alt="Upload"
            className={classNames(
              `inline-block h-full w-full object-cover ${className}`,
              userRole === 1 && "cursor-pointer"
            )}
          />
        ) : (
          <Loading loading={true} />
        )}
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
