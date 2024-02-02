import PropTypes from "prop-types";

import IntroModal from "./IntroModal";
import DonorInformationModal from "./DonorInformationModal";
import DonorAddressModal from "./DonorAddressModal";
import VideoModal from "./VideoModal";
import DedicationFormModal from "./DedicationFormModal";
import DedicationConfirmModal from "./DedicationConfirmModal";
import ConfirmModal from "./ConfirmModal";

//import react icons
import { HiMiniArrowLeft } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const SlideModalContainer = ({
  setIsSlideModalOpen,
  handleCloseModal,
  handlePreviousModal,
  handleNextModal,
  modalContent,
  handleBuyBrick,
  dedicationBrickId,
  handleConfirm,
  handleSkipDedication,
  clickedIndex,
  filtered,
}) => {
  return (
    <div
      id="slide-modal"
      className="modal flex justify-center"
      onClick={(e) => {
        if (e.target.id == "slide-modal") setIsSlideModalOpen(false);
      }}
    >
      <div className="absolute w-5/6 h-5/6 bg-white sm:w-96 sm:h-[800px] lg:w-[400px] lg:h-4/5 px-6 flex-col flex justify-center items-center rounded-md sm:left-24 sm:top-12">
        <HiMiniArrowLeft
          className="modal-previous-button text-xl hover:cursor-pointer"
          onClick={handlePreviousModal}
        />
        <IoClose
          className="modal-close-button text-xl font-bold hover:cursor-pointer"
          onClick={handleCloseModal}
        />
        {modalContent === 1 && <IntroModal handleNextModal={handleNextModal} />}
        {modalContent === 2 && (
          <DonorInformationModal handleNextModal={handleNextModal} />
        )}
        {modalContent === 3 && (
          <DonorAddressModal handleBuyBrick={handleBuyBrick} />
        )}
        {modalContent === 4 && (
          <VideoModal
            handleNextModal={handleNextModal}
            handleSkipDedication={handleSkipDedication}
          />
        )}
        {modalContent === 5 && (
          <DedicationFormModal
            handleNextModal={handleNextModal}
            brick_id={dedicationBrickId}
          />
        )}
        {modalContent === 6 && (
          <DedicationConfirmModal
            handleConfirm={handleConfirm}
            clickedIndex={clickedIndex}
          />
        )}
        {modalContent === 7 && <ConfirmModal filtered={filtered} />}
      </div>
    </div>
  );
};

SlideModalContainer.propTypes = {
  setIsSlideModalOpen: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handlePreviousModal: PropTypes.func.isRequired,
  handleNextModal: PropTypes.func.isRequired,
  modalContent: PropTypes.number.isRequired,
  handleBuyBrick: PropTypes.func.isRequired,
  dedicationBrickId: PropTypes.string,
  handleConfirm: PropTypes.func.isRequired,
  handleSkipDedication: PropTypes.func.isRequired,
  clickedIndex: PropTypes.number,
  filtered: PropTypes.array,
};

export default SlideModalContainer;
