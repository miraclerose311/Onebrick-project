import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSoldAmount } from '../actions/brick';

const ProgressBar = () => {
  const dispatch = useDispatch();
  const bricks = useSelector((state) => state.brick);

  useEffect(() => {
    dispatch(getSoldAmount());
  }, [bricks, dispatch]);

  const { soldAmount } = useSelector((state) => state.brick);

  return (
    <div className='fixed sm:left-16 md:left-20 lg:left-24 xl:left-36 bottom-16 sm:w-1/10 sm:w-1/6 flex flex-col items-center z-10'>
      <div className='font-montserrat text-sky-700 font-bold'>
        {soldAmount} / 35000
      </div>
      <div className='w-full bg-gray-300 rounded-full h-2.5'>
        <div
          className='bg-sky-700 h-2.5 rounded-full'
          style={{ width: `${(soldAmount / 35000) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
