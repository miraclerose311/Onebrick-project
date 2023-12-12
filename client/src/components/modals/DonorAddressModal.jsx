import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { add_donor_info } from '../../features/brick/brickSlice';
import { addProfile } from '../../actions/donor';
import { FaAnglesRight } from 'react-icons/fa6';

const DonorAddressModal = ({ handleNextModal }) => {
  // Declear States for Donor Address Form
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState('');
  const [country, setCountry] = useState('');
  const [region, setState] = useState(''); //region means state

  const [userId, setUserId] = useState(null);

  // Get Donor Address from Redux for display when redirect
  const { donor } = useSelector((state) => state.brick);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const { id } = jwtDecode(token);
      console.log(id);
      setUserId(id);
    }
  }, [token]);

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
        state: region,
        pin,
      };
      dispatch(add_donor_info(addressData));
      dispatch(
        addProfile({
          user_id: userId,
          fullName: donor.fullName,
          email: donor.email,
          mobile: donor.mobile,
          pan: donor.pan,
          aadhaar: donor.aadhaar,
          address,
          country,
          region,
          pin,
        })
      );
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
        value={region}
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

export default DonorAddressModal;
