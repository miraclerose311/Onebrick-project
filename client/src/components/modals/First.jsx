import { useSelector, useDispatch } from 'react-redux';
import { increaseAmount, decreaseAmount, changeLocation } from '../../features/brick/brickSlice';

const First = ({ handleNextModal }) => {

    const { amount, location } = useSelector((state) => state.brick.brick);

    const dispatch = useDispatch();

    const handleIncreaseAmount = () => {
        amount <= 35000 && dispatch(increaseAmount())
    }
    const handleDecreaseAmount = () => {
        amount > 1 && dispatch(decreaseAmount())
    }
    const handleChangeLocation = (e) => {
        dispatch(changeLocation(e.target.value))
    }

    return (
        <>
            <p className='text-4xl font-montserrat px-8'>
                Congratulations!
            </p>
            <p className='font-raleway text-xl my-4'>
                You have taken a step towards making a significant difference!
            </p>
            <p className='font-raleway text-xl my-4'>
                How many bricks would you like to contribute to our Wall of
                Hope?
            </p>
            <div className='flex flex-row'>
                <button
                    className='border px-4 py-2 text-2xl border-gray-400 w-12'
                    onClick={handleDecreaseAmount}
                >
                    -
                </button>
                <button className='border px-4 py-2 text-2xl border-gray-400 w-12'>
                    {amount}
                </button>
                <button
                    className='border px-4 py-2 text-2xl border-gray-400 w-12'
                    onClick={handleIncreaseAmount}
                >
                    +
                </button>
            </div>
            <p className='font-montserrat text-2xl py-2'>Contribution</p>
            <p className='font-raleway text-xl py-2'>₹ {10000 * amount}</p>
            <select className='border px-2 py-2 my-6 cursor-pointer border-gray-400' onChange={handleChangeLocation}>
                <option>I am a Non-Resident Indian</option>
                <option>I am a Foreign National</option>
            </select>
            <button
                className='text-gray-100 bg-red-700 px-4 py-2 rounded-md'
                onClick={handleNextModal}
            >
                READY TO PAY?
            </button>
        </>
    )
}

export default First;