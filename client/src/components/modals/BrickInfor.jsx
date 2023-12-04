import { useRef } from "react";


const BrickInfo = ({ brickInfo, modalPosition }) => {

  // const modalRef = useRef(null);
  const { index, id, sold, clicked } = brickInfo
  return (
    <div
      className='border border-gray-600 bg-gray-200 opacity-80 absolute px-4 py-8 h-auto w-72 flex flex-col justify-center items-center z-10'
      // ref={modalRef}
      style={{
        left: modalPosition.x,
        top: modalPosition.y,
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.7)',
      }}
    >
      <p className='font-lg py-2 font-bold font-montserrat'>index: {index}</p>
      <p className='font-lg py-2 font-bold font-montserrat'>id: {id}</p>
      <p className='font-raleway pb-2'>
        Buy this Brick and Save a Life. Click on this box to dedicate your
        support and help us build a sanctuary of care for those in need.
      </p>
    </div>
  )
}

export default BrickInfo;