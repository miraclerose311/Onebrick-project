import PropTypes from "prop-types";
import { FaUserAstronaut } from "react-icons/fa";

const SupportWord = ({ title, text }) => {
  return (
    <div className="flex flex-col py-6">
      <div className="flex items-center gap-6">
        <div className="bg-red-100 rounded-full flex p-2">
          <FaUserAstronaut className="w-8 h-8" />
        </div>
        <div className="flex flex-col">
          <p className="text-start text-xl font-medium">{title}</p>
          <p className="text-start">{text}</p>
        </div>
      </div>
    </div>
  );
};

SupportWord.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SupportWord;
