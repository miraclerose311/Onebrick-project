import PropTypes from "prop-types";

const BrickResetModal = ({ isOpen, closeModal, count, changeCount }) => {
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20`}
    >
      {/* Modal content */}
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Modal body */}
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Enter Count
          </h3>
          <div className="mt-2 px-7 py-3">
            {/* Input field with label */}
            <label
              htmlFor="count"
              className="block text-sm font-medium text-gray-700"
            >
              Input counts you want to set as fake.
            </label>
            <input
              type="number"
              id="count"
              name="count"
              value={count}
              min={0}
              max={35000}
              onChange={(e) => changeCount(e.target.value)}
              className="mt-1 p-2 border-2 border-gray-300 rounded-md w-full"
              placeholder="Enter a number..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

BrickResetModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  changeCount: PropTypes.func.isRequired,
  // handleReset: PropTypes.func.isRequired,
};

export default BrickResetModal;
