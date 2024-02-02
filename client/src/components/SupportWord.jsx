import PropTypes from "prop-types";
import { GrUserManager } from "react-icons/gr";

const SupportWord = ({ message }) => {
  return (
    <div className="flex flex-col py-2 xl:py-6">
      <div className="flex items-center gap-6">
        <div className="bg-red-100 rounded-full flex p-2">
          <GrUserManager className="w-8 h-8" />
        </div>
        <p className="text-start">{message}</p>
      </div>
    </div>
  );
};

SupportWord.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SupportWord;
