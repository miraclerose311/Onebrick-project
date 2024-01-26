import PropTypes from "prop-types";
import { GrUserManager } from "react-icons/gr";

const SupportWord = ({ title, message }) => {
	return (
		<div className='flex flex-col py-6'>
			<div className='flex items-center gap-6'>
				<div className='bg-red-100 rounded-full flex p-2'>
					<GrUserManager className='w-8 h-8' />
				</div>
				<div className='flex flex-col'>
					<p className='text-start text-xl font-medium'>{title}</p>
					<p className='text-start'>{message}</p>
				</div>
			</div>
		</div>
	);
};

SupportWord.propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};

export default SupportWord;
