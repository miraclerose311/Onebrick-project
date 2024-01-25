import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProgressBar = ({ height }) => {
  const { sold } = useSelector((state) => state.admin);

  return (
    <div className="absolute left-10 sm:left-16 md:left-20 lg:left-24 xl:left-36 bottom-8 sm:bottom-16 sm:w-1/3 lg:w-1/6 flex flex-col items-center z-10">
      <div className="font-montserrat text-sky-700 font-bold">
        {sold} / 32000
      </div>
      <div className={`w-full bg-gray-300 h-${height}`}>
        <div
          className={`bg-sky-700 h-${height}`}
          style={{ width: `${(sold / 32000) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  height: PropTypes.number.isRequired,
};

export default ProgressBar;
