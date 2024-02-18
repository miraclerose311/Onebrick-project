import { useSelector } from "react-redux";
import { FaAnglesRight } from "react-icons/fa6";
import PropTypes from "prop-types";
import userImg from "../../assets/img/user.png";
import Loading from "../Loading";

const DedicationConfirmModal = ({ handleConfirm, clickedIndex }) => {
  const { bricks } = useSelector((state) => state.brick);

  const currentBrick = bricks[clickedIndex];

  const handleSubmit = () => {
    handleConfirm();
  };

  return (
    <div className="flex flex-col gap-5 w-full justify-center items-center">
      <div>
        <p className="text-2xl sm:text-4xl font-medium font-montserrat px-8">
          Congratulations!
        </p>
        <p className="font-raleway text-xl">
          You have successfuly donated a brick.
        </p>
      </div>

      {currentBrick.dedication ? (
        <div className="flex flex-col items-center bg-yellow-200 drop-shadow-lg w-full sm:w-4/5 h-auto rounded-lg my-2 px-4 py-6">
          <p className="font-raleway text-md">
            I dedicate this brick to my {currentBrick.dedication.relationship}
            <br />
            <span className="text-lg">
              <b>{currentBrick.dedication.name}</b>
            </span>
          </p>
          <div className="w-2/3 rounded-lg px-4 py-2">
            {currentBrick.dedication.image ? (
              <div className="flex flex-col w-full items-center justify-between gap-y-3">
                <img
                  alt="not found"
                  className="w-20 h-20 rounded-full"
                  src={currentBrick.dedication.image}
                />
              </div>
            ) : (
              <div className="flex flex-col w-full items-center justify-between gap-y-3">
                <img
                  className="w-28 h-28 rounded-full"
                  src={userImg}
                  alt="dedication image"
                ></img>
              </div>
            )}
          </div>
          <p className="font-raleway text-md">
            {currentBrick.dedication.message}
          </p>
        </div>
      ) : (
        <Loading loading={true} />
      )}

      <button
        className="text-gray-100 bg-red-700 hover:bg-red-800 px-4 py-2 my-4 rounded-md"
        onClick={handleSubmit}
      >
        <span className="flex flex-row items-center justify-between gap-x-3">
          Offer Words of Support
          <FaAnglesRight />
        </span>
      </button>
    </div>
  );
};

DedicationConfirmModal.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  clickedIndex: PropTypes.number.isRequired,
};

export default DedicationConfirmModal;
