import { useRef } from 'react';
const BuyBrickModal = ({
  modalPosition,
  clickedIndex,
  handleBuyBrickButtonClick,
}) => {
  const modalRef = useRef(null);

  return (
    <div
      className='border border-gray-600 bg-gray-200 opacity-80 absolute px-4 py-8 w-52 h-72 flex flex-col justify-center items-center z-30'
      ref={modalRef}
      style={{
        left: modalPosition.x,
        top: modalPosition.y,
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.7)',
      }}
    >
      <p className='font-lg py-2 font-bold font-montserrat'>{clickedIndex}</p>
      <p className='font-raleway pb-2'>
        Buy this Brick and Save a Life. Click on this box to dedicate your
        support and help us build a sanctuary of care for those in need.
      </p>
      <button
        className='text-gray-100 bg-red-700 px-4 py-2 rounded-md'
        onClick={handleBuyBrickButtonClick}
      >
        BUY THIS BRICK
      </button>
    </div>
  );
};

export default BuyBrickModal;
