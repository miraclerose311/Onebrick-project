import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { add_donor_address } from "../../features/brick/brickSlice"

const DonorAddress = ({ handleNextModal }) => {

    //Declear States for Donor Address Form
    const [address, setAddress] = useState('')
    const [pin, setPin] = useState('')
    const [country, setCountry] = useState('');
    const [region, setState] = useState('');

    //Get Donor Address from Redux for display when redirect
    const { donor_address } = useSelector(state => state.brick.brick)

    useEffect(() => {
        setAddress(donor_address.address)
        setCountry(donor_address.country)
        setState(donor_address.region)
        setPin(donor_address.pin)
    }, [])

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        const addressData = {
            address, country, region, pin
        }
        dispatch(add_donor_address(addressData))
        handleNextModal()
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
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='PIN'
            />
            <button
                className='text-gray-100 bg-red-700 px-4 py-2 my-4 rounded-md'
                onClick={handleSubmit}
            >
                MAKE PAYMENT
            </button>
        </>
    )
}

export default DonorAddress