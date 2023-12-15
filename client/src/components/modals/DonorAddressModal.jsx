import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { addDonorInfo } from '../../features/donor/donorSlice';
import { FaAnglesRight } from 'react-icons/fa6';

const DonorAddressModal = ({ handleNextModal }) => {
  // Declear States for Donor Address Form
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');

  // Get Donor Address from Redux for display when redirect
  const donor = useSelector((state) => state.donor);

  useEffect(() => {
    setAddress(donor.address);
    setCountry(donor.country);
    setState(donor.state);
    setPin(donor.pin);
  }, [donor.address, donor.country, donor.state, donor.pin]);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (address && country && pin) {
      const addressData = {
        address,
        country,
        state,
        pin,
      };
      dispatch(addDonorInfo(addressData));
      handleNextModal();
    }
  };

  return (
    <>
      <p className='text-4xl font-montserrat px-8'>Just one more step!</p>
      <p className='font-raleway text-xl my-4'>Why we need this?</p>
      <p className='font-raleway text-xl my-4'>
        You have taken a step towards making a significant difference!
      </p>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2 h-36'
        placeholder='Address'
      />
      <CountryDropdown
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        value={country}
        onChange={(val) => setCountry(val)}
      />
      <RegionDropdown
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        country={country}
        value={state}
        onChange={(val) => setState(val)}
      />
      <input
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
        placeholder='PIN'
      />
      <button
        className='text-gray-100 bg-red-700 px-4 py-2 my-4 rounded-md'
        onClick={handleSubmit}
      >
        <span className='flex flex-row items-center justify-between gap-x-3'>
          MAKE PAYMENT <FaAnglesRight />
        </span>
      </button>
    </>
  );
};

DonorAddressModal.propTypes = {
  handleNextModal: PropTypes.func.isRequired,
};

export default DonorAddressModal;
