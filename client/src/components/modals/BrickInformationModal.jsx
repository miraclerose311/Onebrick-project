import PropTypes from 'prop-types';
import userImg from '../../assets/img/user.png';

const BrickInformationModal = ({ brickInfo, modalPosition }) => {
  console.log(brickInfo);

  return (
    <div
      className='border border-gray-600 bg-gray-200 opacity-80 absolute px-4 py-8 h-56 w-72 flex flex-col justify-center items-center z-10'
      style={{
        left: modalPosition.x,
        top: modalPosition.y,
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.7)',
      }}
    >
      {brickInfo.dedication ? (
        <div className='flex flex-col items-center'>
          <p className='font-raleway text-md my-2'>
            I dedicate this brick to my {brickInfo.dedication.relationship}
            <br />
            <span className='text-lg'>
              <b>{brickInfo.dedication.name}</b>
            </span>
          </p>
          <div className='w-2/3 rounded-lg my-2 px-4 py-2'>
            <div className='flex flex-col w-full items-center justify-between gap-y-3'>
              <img
                className='w-20 h-20 rounded-full'
                src={userImg}
                alt='dedication image'
              ></img>
            </div>
          </div>
          <p className='font-raleway text-md my-2'>
            {brickInfo.dedication.message}
          </p>
        </div>
      ) : (
        <div>
          <p className='font-lg py-2 font-bold font-montserrat'>
            {brickInfo.brick_id}
          </p>
          <p className='font-lg py-2 font-bold font-montserrat'>
            This brick sold by Ghost
          </p>
        </div>
      )}
    </div>
  );
};

BrickInformationModal.propTypes = {
  brickInfo: PropTypes.object.isRequired,
  modalPosition: PropTypes.object.isRequired,
};

export default BrickInformationModal;
