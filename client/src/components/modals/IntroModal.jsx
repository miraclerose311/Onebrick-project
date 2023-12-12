import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  increaseAmount,
  decreaseAmount,
  changeLocation,
} from '../../features/brick/brickSlice';
import { FaAnglesRight } from 'react-icons/fa6';

const IntroModal = ({ handleSkipModal }) => {
  const { amount } = useSelector((state) => state.brick.current);
  const { profile } = useSelector((state) => state.auth);
  const [skipIndex, setSkipIndex] = useState(1);

  useEffect(() => {
    if (Object.keys(profile).length == 0) setSkipIndex(2);
    else setSkipIndex(4);
  }, [profile]);

  console.log(skipIndex);

  const dispatch = useDispatch();

  const handleIncreaseAmount = () => {
    amount <= 35000 && dispatch(increaseAmount());
  };
  const handleDecreaseAmount = () => {
    amount > 1 && dispatch(decreaseAmount());
  };
  const handleChangeLocation = (e) => {
    dispatch(changeLocation(e.target.value));
  };

  return (
    <>
      <p className='text-4xl font-montserrat px-8'>Congratulations!</p>
      <p className='font-raleway text-xl my-4'>
        You have taken a step towards making a significant difference!
      </p>
      <p className='font-raleway text-xl my-4'>
        How many bricks would you like to contribute to our Wall of Hope?
      </p>
      <div className='flex flex-row'>
        <button
          className='border px-4 py-1 text-2xl border-gray-400 w-12'
          onClick={handleDecreaseAmount}
        >
          -
        </button>
        <button className='border px-4 py-1 text-2xl border-gray-400 w-12'>
          {amount}
        </button>
        <button
          className='border px-4 py-1 text-2xl border-gray-400 w-12'
          onClick={handleIncreaseAmount}
        >
          +
        </button>
      </div>
      <p className='font-montserrat text-2xl py-2'>Contribution</p>
      <p className='font-raleway text-xl py-2'>₹ {10000 * amount}</p>
      <select
        className='border px-2 py-2 my-6 cursor-pointer border-gray-400'
        onChange={handleChangeLocation}
      >
        <option>I am a Non-Resident Indian</option>
        <option>I am a Foreign National</option>
      </select>
      <button
        className='text-gray-100 bg-red-700 px-4 py-2 rounded-md'
        onClick={() => handleSkipModal(skipIndex)}
      >
        <span className='flex flex-row items-center justify-between gap-x-3'>
          READY TO PAY <FaAnglesRight />
        </span>
      </button>
    </>
  );
};

IntroModal.propTypes = {
  handleSkipModal: PropTypes.func.isRequired,
};

export default IntroModal;
