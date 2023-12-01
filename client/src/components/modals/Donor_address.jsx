const DonorAddress = ({ handleNextModal }) => {

    return (
        <>
            <p className='text-4xl font-montserrat px-8'>
                Just one more step!
            </p>
            <p className='font-raleway text-xl my-4'>Why we need this?</p>
            <p className='font-raleway text-xl my-4'>
                You have taken a step towards making a significant difference!
            </p>
            <input
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='Address'
            />
            <input
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='Country'
            />
            <input
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='State'
            />
            <input
                className='border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2'
                placeholder='PIN'
            />
            <button
                className='text-gray-100 bg-red-700 px-4 py-2 my-4 rounded-md'
                onClick={handleNextModal}
            >
                MAKE PAYMENT
            </button>
        </>
    )
}

export default DonorAddress