import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

// Import the edit icon from a suitable icon library (e.g., react-icons)
import { FaEdit } from "react-icons/fa";

const EditableParagraphWithIcon = ({ name, content, className, onBlur }) => {
  const { token } = useSelector((state) => state.auth);
  const [editableContent, setEditableContent] = useState(content);
  const [userRole, setUserRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (token) {
      const { role } = jwtDecode(token);
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, [token]);

  // const classNames = (...classes) => {
  //   return classes.filter(Boolean).join(" ");
  // };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-full flex justify-between items-center">
      {isEditing ? (
        <textarea
          name={name}
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
          onBlur={(e) => onBlur(e.target.getAttribute("name"), e.target.value)}
          className={`${className} w-full p-2`}
        />
      ) : (
        <p>{content}</p>
      )}
      {userRole === 2 && (
        <FaEdit
          onClick={handleEditClick}
          style={{ cursor: "pointer" }}
          className="w-12"
        />
      )}
    </div>
  );
};

EditableParagraphWithIcon.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  className: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
};

export default EditableParagraphWithIcon;
