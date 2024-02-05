import PropTypes from "prop-types";

const SupportWord = ({ item }) => {
	const getTimeDelta = (pastDate) => {
		const now = new Date();
		const past = new Date(pastDate);
		const deltaMilliseconds = now - past;

		const minute = 60 * 1000;
		const hour = 60 * minute;
		const day = 24 * hour;
		const month = 30 * day;
		const year = 12 * month;

		if (deltaMilliseconds < minute) {
			return "Just now";
		} else if (deltaMilliseconds < hour) {
			return `${Math.floor(deltaMilliseconds / minute)} Mins`;
		} else if (deltaMilliseconds < day) {
			return `${Math.floor(deltaMilliseconds / hour)} Hours`;
		} else if (deltaMilliseconds < month) {
			return `${Math.floor(deltaMilliseconds / day)} Days`;
		} else if (deltaMilliseconds < year) {
			// Continue for larger intervals as needed...
			return `${Math.floor(deltaMilliseconds / day)} Months`;
		}
	};
	return (
		<div className='flex flex-col py-4 xl:py-6'>
			<div className='flex items-start gap-6'>
				<img
					src={item.user.picture}
					className='w-12 h-12 rounded-full mt-1'
				/>
				<div className='flex flex-col items-start'>
					<p className='text-lg lg:text-xl font-medium font-raleway'>
						{item.user.fullName}
					</p>
					<p className='text-gray-600 font-bold font-montserrat'>
						{getTimeDelta(item.date)}
					</p>
					<p className='text-xl lg:text-2xl font-normal font-raleway mt-2'>
						{item.message}
					</p>
				</div>
			</div>
		</div>
	);
};

SupportWord.propTypes = {
	item: PropTypes.object.isRequired,
};

export default SupportWord;
