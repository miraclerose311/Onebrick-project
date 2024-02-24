import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

import { TbEdit } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";

const EditableParagraph = ({
  name,
  content,
  onBlur,
  isExpand,
  className,
  iconClassName,
}) => {
  const { token } = useSelector((state) => state.auth);
  const [userRole, setUserRole] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [textValue, setTextValue] = useState(null);

  useEffect(() => {
    setTextValue(content);
  }, [content]);

  useEffect(() => {
    if (token) {
      const { role } = jwtDecode(token);
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, [token]);

  const setTextAreaHeight = () => {
    const textarea = document.getElementById("text");
    if (textarea) {
      textarea.style.height = "auto"; // Temporarily shrink to fit
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
      textarea.style.border = "1px solid blue";
      textarea.style.padding = "10px";
    }
  };

  useEffect(() => {
    if (isEditable) {
      setTextAreaHeight();
    }
  }, [textValue, isEditable]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
    onBlur(name, textValue);
  };

  // In this Conponent we can edit paragraph by click
  return (
    <div className="flex flex-col items-start w-full h-auto">
      {userRole === 2 &&
        (isEditable ? (
          <div className="w-full flex justify-end items-center z-20">
            <FaRegSave
              onClick={handleSave}
              className={classNames(
                `cursor-pointer w-5 h-5`,
                iconClassName,
                isExpand == true && { className }
              )}
            />
          </div>
        ) : (
          <div className="w-full flex justify-end items-center z-20">
            <TbEdit
              onClick={handleEdit}
              className={classNames(
                `cursor-pointer w-5 h-5`,
                iconClassName,
                isExpand == true && { className }
              )}
            />
          </div>
        ))}
      {isEditable ? (
        <textarea
          name={name}
          id="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className={classNames(
            `${className} w-full h-auto outline-none focus:p-2 py-0`
          )}
          autoFocus
        />
      ) : (
        <p className={className}>{textValue}</p>
      )}
    </div>
  );
};

EditableParagraph.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  isExpand: PropTypes.bool,
  className: PropTypes.string.isRequired,
  iconClassName: PropTypes.string,
};

export default EditableParagraph;
