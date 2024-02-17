import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProgressBar = ({ height }) => {
  const { sold } = useSelector((state) => state.admin);

  return (
    <div className="absolute bottom-12 left-0 w-full flex justify-center md:justify-start z-30">
      <div className="w-3/4 sm:w-1/3 lg:w-1/6 md:ml-12 flex flex-col items-center">
        <div className="font-montserrat text-sky-700 font-bold">
          {sold} / 40000
        </div>
        <div className={`w-full bg-gray-300 h-${height}`}>
          <div
            className={`bg-sky-700 h-${height}`}
            style={{ width: `${(sold / 40000) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  height: PropTypes.number.isRequired,
};

export default ProgressBar;
