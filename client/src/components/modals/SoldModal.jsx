import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const SoldModal = ({ modalPosition, clickedIndex, hideModal }) => {
  const { bricks } = useSelector((state) => state.brick);
  const { amount } = useSelector((state) => state.brick.current);

  const modalRef = useRef(null);
  const [position, setPosition] = useState({ x: -400, y: -500 });

  // Use effect to calculate the position after the component mounts or updates
  useEffect(() => {
    if (modalRef.current) {
      const modalHeight = modalRef.current.offsetHeight;
      const modalWidth = modalRef.current.offsetWidth;
      setPosition({
        x:
          window.screen.width - modalPosition.x > modalWidth
            ? modalPosition.x
            : modalPosition.x - modalWidth,
        y:
          window.screen.height - modalPosition.y > modalHeight
            ? modalPosition.y
            : modalPosition.y - modalHeight,
      });
    }
  }, [modalPosition]);

  const handleClose = (e) => {
    e.preventDefault();
    if (e.target.id === "sold-modal-pan") {
      hideModal();
    }
  };

  return (
    <div
      id="sold-modal-pan"
      className="fixed w-[100vw] h-[100vh] bg-gray-100/10 z-50"
      onClick={handleClose}
    >
      <div
        style={{
          left: position.x,
          top: position.y,
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
        }}
        ref={modalRef}
        className="border border-gray-600 rounded bg-gray-200 absolute px-4 py-8 w-52 h-64 flex flex-col justify-center items-center z-30"
      >
        <p className="text-md py-3 font-montserrat">Yay!!</p>
        <p className="w-full text-xs pb-2">
          You have paid for {amount} Brick of Hope. Your Brick Credential is
        </p>
        <p className="bg-yellow-500 text-sm px-12 py-2 my-3">
          {bricks[clickedIndex].brick_id}
        </p>
        <p className="text-xs">
          You can now locate your brick on the Wall of Hope by search using this
          ID or your Name.
        </p>
      </div>
    </div>
  );
};

SoldModal.propTypes = {
  modalPosition: PropTypes.object.isRequired,
  clickedIndex: PropTypes.number.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default SoldModal;
