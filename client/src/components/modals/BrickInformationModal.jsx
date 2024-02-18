import PropTypes from "prop-types";
import userImg from "../../assets/img/user.png";
import { useRef, useEffect, useState } from "react";

const BrickInformationModal = ({
  userId,
  brickInfo,
  modalPosition,
  handleDedicate,
}) => {
  const modalRef = useRef(null);
  const [position, setPosition] = useState({});
  const [visible, setVisible] = useState("hidden");

  // Use effect to calculate the position after the component mounts or updates
  useEffect(() => {
    if (modalRef.current) {
      const modalHeight = modalRef.current.offsetHeight;
      const modalWidth = modalRef.current.offsetWidth;
      if (window.innerWidth > 576) {
        setPosition({
          x:
            window.innerWidth - modalPosition.x > modalWidth
              ? modalPosition.x + 5
              : modalPosition.x - modalWidth - 5,
          y:
            window.innerHeight - modalPosition.y > modalHeight
              ? modalPosition.y + 5
              : modalPosition.y - modalHeight - 5,
        });
      } else {
        setPosition({
          x: 0,
          y: window.innerHeight - modalHeight,
        });
      }
    }
  }, [modalPosition]);

  useEffect(() => {
    setVisible("visible");
  }, [position]);

  return (
    <div
      className="border border-gray-600 bg-gray-200 absolute py-4 px-4 w-full sm:w-80 items-center rounded-md z-10"
      style={{
        left: position.x,
        top: position.y,
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
        visibility: visible,
      }}
      ref={modalRef}
    >
      {brickInfo.dedication ? (
        <div className="flex flex-col gap-1 w-full h-full items-center justify-around">
          <p className="font-raleway">
            Donated by{" "}
            <span className="font-semibold">{brickInfo.donor.fullName}</span>.
            <br /> Dedicated to{" "}
            <span className="font-semibold">
              {brickInfo.dedication.name}
            </span>{" "}
            who is my{" "}
            <span className="font-semibold">
              {brickInfo.dedication.relationship}
            </span>
            .
          </p>
          <div className="w-2/3 rounded-lg">
            <div className="flex flex-col w-full items-center justify-between gap-y-3">
              <img
                className="w-20 h-20 rounded-full"
                src={
                  brickInfo.dedication && brickInfo.dedication.image
                    ? brickInfo.dedication.image
                    : userImg
                }
                alt="dedication image"
              />
            </div>
          </div>
          <p className="font-raleway text-md">{brickInfo.dedication.message}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center px-4 py-6">
          <p className="text-xl font-bold font-montserrat">
            {brickInfo.brick_id}
          </p>
          <p className="font-lg font-bold font-raleway">
            Donated by {brickInfo.donor.fullName}
          </p>
          {brickInfo.user === userId && (
            <button
              className="text-gray-100 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md"
              onClick={handleDedicate}
            >
              DEDICATE NOW
            </button>
          )}
        </div>
      )}
    </div>
  );
};

BrickInformationModal.propTypes = {
  userId: PropTypes.string,
  brickInfo: PropTypes.object.isRequired,
  modalPosition: PropTypes.object.isRequired,
  handleDedicate: PropTypes.func.isRequired,
};

export default BrickInformationModal;
