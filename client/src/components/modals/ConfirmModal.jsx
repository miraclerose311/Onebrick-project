import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { add_dedication } from '../../features/brick/brickSlice';
import user from '../../assets/img/user.png';

const ConfirmModal = ({ handleSold }) => {
  //Declear States for Dedication Form
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  //Get Dedication data from Redux for display when redirect
  const { dedication } = useSelector((state) => state.brick.current);

  useEffect(() => {
    setName(dedication.name);
    setRelationship(dedication.relationship);
    setMessage(dedication.message);
    setImage(dedication.image);
  }, [
    dedication.name,
    dedication.relationship,
    dedication.message,
    dedication.image,
  ]);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    const dedicationData = {
      name,
      relationship,
      message,
      image,
      // : JSON.stringify(image)
    };
    dispatch(add_dedication(dedicationData));
    handleSold();
  };

  return (
    <>
      <p className='text-4xl font-montserrat px-8'>Just one more step!</p>
      <p className='font-raleway text-xl my-4'>Why we need this?</p>
      <p className='font-raleway text-xl my-4'>
        You have taken a step towards making a significant difference!
      </p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        placeholder='I dedicate this brick to(name)'
      />
      <input
        value={relationship}
        onChange={(e) => setRelationship(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        placeholder='who is my'
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2 h-36'
        placeholder='Dedication Message'
      />
      <div className='border border-gray-400 w-2/3 rounded-lg my-2 px-4 py-2'>
        {image ? (
          <div className='flex flex-col w-full items-center justify-between gap-y-3'>
            <img
              alt='not found'
              className='w-20 h-20 rounded-full'
              src={URL.createObjectURL(image)}
            />
            <button onClick={() => setImage(null)}>Remove</button>
          </div>
        ) : (
          <div className='flex flex-col w-full items-center justify-between gap-y-3'>
            <input
              className='w-full'
              type='file'
              name='myImage'
              onChange={(event) => {
                setImage(event.target.files[0]);
              }}
            />
            <img
              className='w-20 h-20 rounded-full'
              src={user}
              alt='dedication image'
            ></img>
          </div>
        )}
      </div>
      <button
        className='text-gray-100 bg-red-700 px-4 py-2 my-4 rounded-md'
        onClick={handleSubmit}
      >
        MAKE PAYMENT
      </button>
    </>
  );
};

ConfirmModal.propTypes = {
  handleSold: PropTypes.func.isRequired,
};

export default ConfirmModal;
