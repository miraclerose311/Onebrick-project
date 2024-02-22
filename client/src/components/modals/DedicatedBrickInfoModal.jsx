import PropTypes from "prop-types";
import userImg from "../../assets/img/user.png";
import { useRef, useEffect, useState } from "react";

const DedicatedBrickInfoModal = ({ brickInfo, modalPosition, hideModal }) => {
  const modalRef = useRef(null);
  const [position, setPosition] = useState({});
  const [visible, setVisible] = useState("hidden");

  // Use effect to calculate the position after the component mounts or updates
  useEffect(() => {
    if (modalRef.current) {
      const modalHeight = modalRef.current.offsetHeight;
      const modalWidth = modalRef.current.offsetWidth;
      if (window.innerWidth > 576) {
        if (modalPosition.x == 0 && modalPosition.y == 0) {
          setPosition({
            x: (window.innerWidth - modalWidth) / 2,
            y: (window.innerHeight - modalWidth) / 2,
          });
        } else {
          setPosition({
            x:
              window.innerWidth - modalPosition.x > modalWidth
                ? modalPosition.x
                : modalPosition.x - modalWidth,
            y:
              window.innerHeight - modalPosition.y > modalHeight
                ? modalPosition.y
                : modalPosition.y - modalHeight,
          });
        }
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

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "dedicated-brickinfo-pan") {
      hideModal();
    }
  };

  return (
    <div
      id="dedicated-brickinfo-pan"
      className="fixed w-full h-full z-50"
      onClick={handleClose}
    >
      <div
        className="border border-gray-600 bg-gray-200 rounded-md opacity-100 absolute px-4 py-4 w-full sm:w-80 h-auto flex flex-col gap-3 justify-center items-center"
        style={{
          left: position.x,
          top: position.y,
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
          visibility: visible,
        }}
        onClick={hideModal}
        ref={modalRef}
      >
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
      </div>
    </div>
  );
};

DedicatedBrickInfoModal.propTypes = {
  brickInfo: PropTypes.object.isRequired,
  modalPosition: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default DedicatedBrickInfoModal;
