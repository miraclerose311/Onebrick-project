import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const UrlChangeModal = ({
  isModalOpen,
  name,
  value,
  scrollY,
  onBlur,
  closeModal,
}) => {
  const [inputValue, setInputValue] = useState(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleUpdate = (name, value) => {
    onBlur(name, value);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div
      style={{ top: scrollY + window.innerHeight / 3 }}
      className="w-full absolute flex justify-center items-center z-50"
    >
      <div className="w-2/3 flex flex-col gap-6 item-center bg-white rounded-lg shadow-md shadow-gray-500 p-12">
        <input
          name={name}
          value={inputValue ? inputValue : ""}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border border-gray-300 rounded-sm py-2 px-2"
        />
        <div className="flex justify-center gap-3">
          <button
            onClick={closeModal}
            className="bg-green-600 hover:bg-green-700 rounded-md text-white text-xl px-6 py-2"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdate(name, inputValue)}
            className="bg-red-700 hover:bg-red-800 rounded-md text-white text-xl px-6 py-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

UrlChangeModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  scrollY: PropTypes.number,
  onBlur: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UrlChangeModal;
