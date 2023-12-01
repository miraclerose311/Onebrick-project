import video from '../../assets/video.mp4'

const Video = ({ handleNextModal }) => {

    return (
        <>
            <p className='text-4xl font-montserrat px-8'>
                Congratulations!
            </p>
            <p className='font-raleway text-xl my-4'>
                You have taken a step towards making a significant difference!<br />
                Watch this video of one of the beneficaires thanking you for your generosity.
            </p>
            <video src={video} width="750" height="500" controls className='border border-gray-400' />
            <p className='font-raleway text-xl my-4'>
                Did you know you could add a dedication? Yes you can dedicate you brick in the memory of a close relative or a friend.
            </p>

            <button
                className='text-gray-100 bg-red-700 px-6 py-2 my-4 rounded-md'
                onClick={handleNextModal}
            >
                DEDICATE MY BRICK
            </button>
        </>
    )
}

export default Video