import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { addDonorInfo } from "../../features/donor/donorSlice";
import { FaAnglesRight } from "react-icons/fa6";

const DonorInformationModal = ({ handleNextModal }) => {
	const [fullName, setName] = useState("");
	const [mobile, setMobile] = useState("");
	const [email, setEmail] = useState("");
	const [pan, setPan] = useState("");
	const [aadhaar, setAadhaar] = useState("");
	const [errors, setErrors] = useState({
		fullName: "",
		email: "",
		mobile: "",
		pan: "",
	});

	const donor = useSelector((state) => state.donor);

	useEffect(() => {
		const { fullName, mobile, email, pan, aadhaar } = donor;
		setName(fullName);
		setMobile(mobile);
		setEmail(email);
		setPan(pan);
		setAadhaar(aadhaar);
	}, [donor]);

	const dispatch = useDispatch();

	function isValidNumber(mobile) {
		const regex = /^[0-9]{8,}$/;
		return regex.test(mobile);
	}
	// Make sure validateEmail function is defined
	function isValidEmail(email) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}

	function isValidPAN(pan) {
		const regex = /^[A-Z, a-z]{5}[0-9]{4}[A-Z]$/;
		return regex.test(pan.toUpperCase());
	}

	const handleSubmit = () => {
		// Initialize an errors object
		let newErrors = {};

		// Validate Full Name
		if (!fullName.trim()) {
			newErrors.fullName = "Full Name is required";
		}

		// Validate Email
		if (!email.trim()) {
			newErrors.email = "Email is required";
		} else if (!isValidEmail(email)) {
			newErrors.email = "Please enter a valid email address";
		}

		// Validate Mobile Number
		if (!mobile.trim()) {
			newErrors.mobile = "Mobile number is required";
		} else if (!isValidNumber(mobile)) {
			newErrors.mobile = "Please enter a valid phone number";
		}

		//Validate PAN Number
		if (!pan.trim()) {
			newErrors.pan = "PAN number is required";
		} else if (!isValidPAN(pan)) {
			newErrors.pan = "Please enter a valid PAN number";
		}
		// Update the errors state
		setErrors(newErrors);

		// If there are no errors, proceed to dispatch the data and handle the next modal
		if (Object.keys(newErrors).length === 0) {
			const infoData = {
				fullName,
				mobile,
				email,
				pan: pan.toUpperCase(),
				aadhaar,
			};
			dispatch(addDonorInfo(infoData));
			handleNextModal();
		}
	};

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	const handleFocus = (e) => {
		setErrors({ ...errors, [e.target.name]: "" });
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
    <>
      <p className="text-4xl font-montserrat px-8">Donor Information</p>
      <p className="font-raleway text-xl my-4">Why we need this?</p>
      <p className="font-raleway text-xl my-4">
        You have taken a step towards making a significant difference!
      </p>

      <input
        type="text"
        name="fullName"
        value={fullName}
        onChange={(e) => setName(e.target.value)}
        onFocus={handleFocus}
        className={classNames(
          "border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2",
          errors.fullName && "border-red-400"
        )}
        placeholder="Full Name"
      />
      {errors.fullName && (
        <p className="text-red-400 text-xs text-left w-2/3">
          {errors.fullName}
        </p>
      )}

      <input
        type="email"
        name="email"
        value={email}
        onFocus={handleFocus}
        onChange={(e) => setEmail(e.target.value)}
        className={classNames(
          "border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2",
          errors.email && "border-red-400"
        )}
        placeholder="Email ID"
      />
      {errors.email && (
        <p className="text-red-400 text-xs text-left w-2/3">{errors.email}</p>
      )}

      <input
        type="text"
        name="mobile"
        value={mobile}
        onFocus={handleFocus}
        onChange={(e) => {
          console.log("parseInt(e.target.value)", parseInt(e.target.value));
          if (parseInt(e.target.value) == number) {
            setMobile(e.target.value);
          }
        }}
        className={classNames(
          "border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2",
          errors.mobile && "border-red-400"
        )}
        placeholder="Mobile"
      />
      {errors.mobile && (
        <p className="text-red-400 text-xs text-left w-2/3">{errors.mobile}</p>
      )}

      <input
        type="text"
        name="pan"
        value={pan}
        onFocus={handleFocus}
        onChange={(e) => setPan(e.target.value)}
        className={classNames(
          "border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2",
          errors.pan && "border-red-400"
        )}
        placeholder="PAN"
      />
      {errors.pan && (
        <p className="text-red-400 text-xs text-left w-2/3">{errors.pan}</p>
      )}

      <input
        type="text"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
        className="border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2"
        placeholder="Aadhaar ID"
      />
      <button
        className="text-gray-100 bg-red-700 px-6 py-2 my-4 rounded-md"
        onClick={handleSubmit}
      >
        <span className="flex flex-row items-center justify-between gap-x-3">
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
