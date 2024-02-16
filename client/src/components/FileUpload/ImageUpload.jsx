import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import UploadImageLoading from './UploadImageLoading';

const ImageUpload = ({
  previewFile,
  fileName,
  onFileSelect,
  loading,
  className,
}) => {
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
    return classes.filter(Boolean).join(' ');
  };

  const handleChangeFile = (e) => {
    onFileSelect(e.target.files[0], e.target.name);
  };

  return (
    <>
      <UploadImageLoading loading={loading} />
      <div className="relativ w-full h-full flex justify-center items-center">
        {userRole === 2 && (
          <input
            type="file"
            id={fileName}
            className="hidden"
            name={fileName}
            onChange={(e) => handleChangeFile(e)}
          />
        )}
        <label htmlFor={fileName} className="flex justify-center w-full h-full">
          <img
            src={previewFile}
            alt="Upload"
            loading="lazy"
            className={classNames(
              `inline-block object-cover ${className}`,
              userRole === 2 && "cursor-pointer"
            )}
          />
        </label>
      </div>
    </>
  );
};

ImageUpload.propTypes = {
  previewFile: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  onFileSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default ImageUpload;
