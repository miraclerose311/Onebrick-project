import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaAnglesRight } from 'react-icons/fa6';
import user from '../../assets/img/user.png';

const DedicationConfirmModal = ({ handleBuyBrick }) => {
  //Declear States for Dedication Form
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [image, setImage] = useState(null);

  //Get Dedication data from Redux for display when redirect
  const { dedication } = useSelector((state) => state.brick.brick);

  useEffect(() => {
    setName(dedication.name);
    setRelationship(dedication.relationship);
    setImage(dedication.image);
  }, [dedication.name, dedication.relationship, dedication.image]);

  const handleSubmit = () => {
    handleBuyBrick();
  };

  return (
    <>
      <p className='text-4xl font-montserrat px-8'>Confirm Dedication!</p>
      <p className='font-raleway text-xl my-4'>Why we need this?</p>
      <p className='font-raleway text-xl my-4'>
        You have taken a step towards making a significant difference!
      </p>
      <div className='flex flex-col items-center bg-yellow-200 drop-shadow-lg w-4/5 h-auto rounded-lg my-2 px-4 py-2'>
        <p className='font-raleway text-md my-2'>
          I dedicate this brick to my {relationship}
          <br />
          <span className='text-lg'>
            <b>{name}</b>
          </span>
        </p>
        <div className='w-2/3 rounded-lg my-2 px-4 py-2'>
          {image ? (
            <div className='flex flex-col w-full items-center justify-between gap-y-3'>
              <img
                alt='not found'
                className='w-20 h-20 rounded-full'
                src={URL.createObjectURL(image)}
              />
            </div>
          ) : (
            <div className='flex flex-col w-full items-center justify-between gap-y-3'>
              <img
                className='w-20 h-20 rounded-full'
                src={user}
                alt='dedication image'
              ></img>
            </div>
          )}
        </div>
        <p className='font-raleway text-md my-2'>
          Buy this Brick and Save a Life. Click on this box to dedicate your
          support and help us build a sanctuary of care for those in need
        </p>
      </div>

      <button
        className='text-gray-100 bg-red-700 px-4 py-2 my-4 rounded-md'
        onClick={handleSubmit}
      >
        <span className='flex flex-row items-center justify-between gap-x-3'>
          CONGRATULATION
          <FaAnglesRight />
        </span>
      </button>
    </>
  );
};

export default DedicationConfirmModal;
