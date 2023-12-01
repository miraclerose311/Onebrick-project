import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { add_donor_address } from "../../features/brick/brickSlice"
import { FaAnglesRight } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const DonorAddress = ({ handleNextModal }) => {

    //Declear States for Donor Address Form
    const [address, setAddress] = useState('')
    const [pin, setPin] = useState('')
    const [country, setCountry] = useState('');
    const [region, setState] = useState('');   //region means state

    const notify = () => {
        toast.warn("Please fill in the required fields.", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
        })
    }

    //Get Donor Address from Redux for display when redirect
    const { donor_address } = useSelector(state => state.brick.brick)

    useEffect(() => {
        setAddress(donor_address.address)
        setCountry(donor_address.country)
        setState(donor_address.state)
        setPin(donor_address.pin)
    }, [])
    console.log(address, country, pin)
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        if (address && country && pin) {
            const addressData = {
                address, country, region, pin
            }
            dispatch(add_donor_address(addressData))
            handleNextModal()
        }
        else {
            notify();
        }
    }

    return (
        <>
            <p className='text-4xl font-montserrat px-8'>
                Just one more step!
            </p>
            <p className='font-raleway text-xl my-4'>Why we need this?</p>
            <p className='font-raleway text-xl my-4'>
                You have taken a step towards making a significant difference!
            </p>
            <ToastContainer />
            <textarea
                value={address}
                onChange={e => setAddress(e.target.value)}
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2 h-36'
                placeholder='Address'
            />
            <CountryDropdown
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                value={country}
                onChange={(val) => setCountry(val)} />
            <RegionDropdown
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                country={country}
                value={region}
                onChange={(val) => setState(val)} />
            <input
                onChange={e => setPin(e.target.value)}
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='PIN'
            />
            <button
                className='text-gray-100 bg-red-700 px-4 py-2 my-4 rounded-md'
                onClick={handleSubmit}
            >
                <span className='flex flex-row items-center justify-between gap-x-3'>MAKE PAYMENT <FaAnglesRight /></span>
            </button>
        </>
    )
}

export default DonorAddress