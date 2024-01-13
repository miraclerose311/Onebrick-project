import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const BuyBrickModal = ({
  modalPosition,
  clickedIndex,
  handleBuyBrickButtonClick,
  hideModal,
}) => {
  const [isFirstClick, setIsFirstClick] = useState(true);
  const modalRef = useRef(null);
  const [position, setPosition] = useState({});
  const [visible, setVisible] = useState("hidden");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !isFirstClick
      ) {
        hideModal();
      }
      if (isFirstClick) setIsFirstClick(false);
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [hideModal, isFirstClick]);

  // Use effect to calculate the position after the component mounts or updates
  useEffect(() => {
    if (modalRef.current && modalPosition.x && modalPosition.y) {
      const modalHeight = modalRef.current.offsetHeight;
      const modalWidth = modalRef.current.offsetWidth;
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
  }, [modalPosition]);

  useEffect(() => {
    if (position) setVisible("visible");
    console.log("change modalposition in modal component");
  }, [position]);

  return (
    <div
      className="border border-gray-600 bg-gray-200 opacity-100 absolute px-6 py-8 w-60 h-auto flex flex-col gap-3 justify-center items-center z-40"
      style={{
        left: position.x,
        top: position.y,
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.7)",
        visible: visible,
      }}
      ref={modalRef}
    >
      <p className="text-xl py-2 font-bold font-montserrat">{clickedIndex}</p>
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
  );
};

BuyBrickModal.propTypes = {
  modalPosition: PropTypes.object.isRequired,
  clickedIndex: PropTypes.string.isRequired,
  handleBuyBrickButtonClick: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default BuyBrickModal;
