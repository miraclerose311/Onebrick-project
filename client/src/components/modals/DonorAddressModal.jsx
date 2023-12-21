import { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { FaAnglesRight } from "react-icons/fa6";
import PropTypes from "prop-types";
import { addDonorInfo } from "../../features/donor/donorSlice";
import { insertDonor } from "../../actions/donor";

const DonorAddressModal = ({ handleBuyBrick }) => {
	// Declear States for Donor Address Form
	const [address, setAddress] = useState("");
	const [pin, setPin] = useState("");
	const [country, setCountry] = useState("");
	const [state, setState] = useState("");
	const [errors, setErrors] = useState({
		address: "",
		country: "",
		pin: "",
	});

	//Get user Id from token
	const { token } = useSelector((state) => state.auth);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (token) {
			const { id } = jwtDecode(token);
			setUserId(id);
		}
	}, [token]);

	// Get Donor Address from Redux for display when redirect
	const donor = useSelector((state) => state.donor);
	const dispatch = useDispatch();

	useEffect(() => {
		setAddress(donor.address);
		setPin(donor.pin);
	}, [donor]);

	function isValidNumber(mobile) {
		const regex = /^[0-9]{4,}$/;
		return regex.test(mobile);
	}
	const handleSubmit = () => {
		// Initialize an errors object
		let newErrors = {};

		// Address Full Name
		if (!address.trim()) {
			newErrors.address = "Address is required";
		}
		// Validate PIN
		if (!pin.trim()) {
			newErrors.pin = "PIN is required";
		} else if (!isValidNumber(pin)) {
			newErrors.pin = "Please enter a valid PIN number";
		}

		// Update the errors state
		setErrors(newErrors);
		if (Object.keys(newErrors).length === 0) {
			const addressData = {
				address,
				country,
				state,
				pin,
			};
			dispatch(addDonorInfo(addressData));
			const { fullName, mobile, email, pan, aadhaar } = donor;
			const newDonorData = {
				userId,
				fullName,
				mobile,
				email,
				pan,
				aadhaar,
				address,
				country,
				state,
				pin,
			};
			dispatch(insertDonor(newDonorData));
			handleBuyBrick();
		}
	};

	const handleFocus = (e) => {
		setErrors({ ...errors, [e.target.name]: "" });
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<>
			<p className='text-4xl font-montserrat px-8'>Just one more step!</p>
			<p className='font-raleway text-xl my-4'>Why we need this?</p>
			<p className='font-raleway text-xl my-4'>
				You have taken a step towards making a significant difference!
			</p>
			<textarea
				name='address'
				value={address}
				onChange={(e) => setAddress(e.target.value)}
				onFocus={handleFocus}
				className={classNames(
					"border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2 h-36",
					errors.address && "border-red-400"
				)}
				placeholder='Address'
			/>
			{errors.address && (
				<p className='text-red-400 text-xs text-left w-2/3'>{errors.address}</p>
			)}
			<CountryDropdown
				className={classNames(
					"border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2"
				)}
				name='country'
				value={country}
				onChange={(val) => setCountry(val)}
			/>
			{errors.country && (
				<p className='text-red-400 text-xs text-left w-2/3'>{errors.country}</p>
			)}
			<RegionDropdown
				className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
				country={country}
				name='state'
				value={state}
				onChange={(val) => setState(val)}
			/>
			<input
				name='pin'
				value={pin}
				onChange={(e) => setPin(e.target.value)}
				onFocus={handleFocus}
				className={classNames(
					"border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2",
					errors.pin && "border-red-400"
				)}
				placeholder='PIN'
			/>
			{errors.pin && (
				<p className='text-red-400 text-xs text-left w-2/3'>{errors.pin}</p>
			)}
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
	handleBuyBrick: PropTypes.func.isRequired,
};

export default DonorAddressModal;
