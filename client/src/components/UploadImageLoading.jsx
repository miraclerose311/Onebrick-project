import { Oval } from 'react-loader-spinner';
import PropTypes from 'prop-types';

const UploadImageLoading = ({ loading }) => {
  return (
    loading && (
      <div className='flex left-0 top-0 w-full h-full bg-gray-300 opacity-95 justify-center items-center absolute z-100'>
        <Oval
          height={80}
          width={80}
          color='#0369a1'
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor='#0369a1'
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    )
  );
};

UploadImageLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default UploadImageLoading;
