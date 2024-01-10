import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const EditableParagraph = ({ name, content, className, onBlur }) => {
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
    <p
      name={name}
      className={classNames(
        `${className} outline-none focus:border focus:border-sky-300 focus:p-2`,
        userRole === 2 && "cursor-pointer"
      )}
      contentEditable={userRole === 2 ? true : false}
      suppressContentEditableWarning={true} // Prevents warning for contentEditable without onChange event
      onBlur={(e) =>
        onBlur(e.target.getAttribute("name"), e.target.textContent)
      }
    >
      {content}
    </p>
  );
};

EditableParagraph.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  className: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default EditableParagraph;
