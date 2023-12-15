import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addDonorInfo } from '../../features/donor/donorSlice';
import { FaAnglesRight } from 'react-icons/fa6';
import { setAlertWithTimeout } from '../../features/alert/alertSlice';

const DonorInformationModal = ({ handleNextModal }) => {
  const [fullName, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [pan, setPan] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const donor = useSelector((state) => state.donor);
  const dispatch = useDispatch();
  useEffect(() => {
    setName(donor.fullName);
    setMobile(donor.mobile);
    setEmail(donor.email);
    setPan(donor.pan);
    setAadhaar(donor.aadhaar);
  }, [donor.fullName, donor.mobile, donor.email, donor.pan, donor.aadhaar]);

  const handleSubmit = () => {
    if (fullName === '' || mobile === '' || email === '') {
      const errorAlert = {
        alertType: 'error',
        content: 'Please input required fields',
      };
      dispatch(setAlertWithTimeout(errorAlert));
    } else {
      const infoData = {
        fullName,
        mobile,
        email,
        pan,
        aadhaar,
      };
      dispatch(addDonorInfo(infoData));
      handleNextModal();
    }
  };

  return (
    <>
      <p className='text-4xl font-montserrat px-8'>Donor Information</p>
      <p className='font-raleway text-xl my-4'>Why we need this?</p>
      <p className='font-raleway text-xl my-4'>
        You have taken a step towards making a significant difference!
      </p>
      <input
        type='text'
        value={fullName}
        onChange={(e) => setName(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        placeholder='Full Name'
      />
      <input
        type='text'
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        placeholder='Mobile'
      />
      <input
        type='text'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        placeholder='Email ID'
      />
      <input
        type='text'
        value={pan}
        onChange={(e) => setPan(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        placeholder='PAN (if available)'
      />
      <input
        type='text'
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        placeholder='Aadhaar ID (if available)'
      />
      <button
        className='text-gray-100 bg-red-700 px-6 py-2 my-4 rounded-md'
        onClick={handleSubmit}
      >
        <span className='flex flex-row items-center justify-between gap-x-3'>
          ADD ADDRESS <FaAnglesRight />
        </span>
      </button>
    </>
  );
};

DonorInformationModal.propTypes = {
  handleNextModal: PropTypes.func.isRequired,
};

export default DonorInformationModal;
