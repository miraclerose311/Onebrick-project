import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { add_donor_info } from "../../features/brick/brickSlice"

const DonorInformation = ({ handleNextModal }) => {
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [pan, setPan] = useState('')
    const [aadhaar, setAadhaar] = useState('')

    const { donor_info } = useSelector(state => state.brick.brick)
    const dispatch = useDispatch();
    useEffect(() => {
        setName(donor_info.name)
        setMobile(donor_info.mobile)
        setEmail(donor_info.email)
        setPan(donor_info.pan)
        setAadhaar(donor_info.aadhaar)
    }, [])

    const handleSubmit = (e) => {
        const infoData = {
            name,
            mobile,
            email,
            pan,
            aadhaar
        }
        dispatch(add_donor_info(infoData))
        handleNextModal()
    }

    return (
        <>
            <p className='text-4xl font-montserrat px-8'>
                Donor Information
            </p>
            <p className='font-raleway text-xl my-4'>Why we need this?</p>
            <p className='font-raleway text-xl my-4'>
                You have taken a step towards making a significant difference!
            </p>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='Full Name'
            />
            <input
                type="text"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='Mobile'
            />
            <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='Email ID'
            />
            <input
                type="text"
                value={pan}
                onChange={e => setPan(e.target.value)}
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='PAN (if available)'
            />
            <input
                type="text"
                value={aadhaar}
                onChange={e => setAadhaar(e.target.value)}
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='Aadhaar ID (if available)'
            />
            <button
                className='text-gray-100 bg-red-700 px-6 py-2 my-4 rounded-md'
                onClick={handleSubmit}
            >
                ADD ADDRESS
            </button>
        </>
    )
}

export default DonorInformation