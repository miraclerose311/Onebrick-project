import { memo, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const BuyBrickModal = ({
  modalPosition,
  clickedBrick,
  handleBuyBrickButtonClick,
  hideModal,
}) => {
  const modalRef = useRef(null);
  const [position, setPosition] = useState({ x: -400, y: -500 });

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

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "buybrickmodal-pan") {
      hideModal();
    }
  };

  return (
    <div
      id="buybrickmodal-pan"
      className="fixed w-full h-full z-50 bg-gray-500/20"
      onClick={handleClose}
    >
      <div
        className="border border-gray-600 bg-gray-200 rounded-md opacity-100 absolute px-6 py-8 w-full sm:w-60 h-auto flex flex-col gap-3 justify-center items-center"
        style={{
          left: position.x,
          top: position.y,
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
        }}
        ref={modalRef}
      >
        <p className="text-xl py-2 font-bold font-montserrat">{clickedBrick}</p>
        <p className="font-raleway pb-2">
          DONATE this Brick and Save a Life. Click on this box to dedicate your
          support and help us build a sanctuary of care for those in need.
        </p>
        <button
          className="text-gray-100 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md"
          onClick={handleBuyBrickButtonClick}
        >
          DONATE THIS BRICK
        </button>
      </div>
    </div>
  );
};

BuyBrickModal.propTypes = {
  modalPosition: PropTypes.object.isRequired,
  clickedBrick: PropTypes.string.isRequired,
  handleBuyBrickButtonClick: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

const MemorizedBuybrickModal = memo(BuyBrickModal);

export default MemorizedBuybrickModal;
