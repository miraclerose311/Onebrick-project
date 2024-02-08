import { IoIosArrowUp } from "react-icons/io";
import PropTypes from "prop-types";

const ArrowUpButton = ({ handleSetIsPopupOpen }) => {
  return (
    <div className="fixed bottom-0 h-16 flex justify-center items-center sm:hidden cursor-pointer">
      <IoIosArrowUp
        onClick={() => handleSetIsPopupOpen(true)}
        className="font-normal text-4xl"
      />
    </div>
  );
};

ArrowUpButton.propTypes = {
  handleSetIsPopupOpen: PropTypes.func.isRequired,
};

export default ArrowUpButton;
