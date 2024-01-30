import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setLocation, setAmountOfReduce } from "../../features/brickSlice";
import { FaAnglesRight } from "react-icons/fa6";
import { useState } from "react";

const IntroModal = ({ handleNextModal }) => {
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  const handleAmount = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue === "" || /^[0-9]+$/.test(newValue)) {
      setAmount(Math.min(newValue, 32000));
    }
  };
  const handleIncreaseAmount = () => {
    if (amount < 32000) {
      setAmount(amount + 1);
    }
  };

  const handleDecreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  const handleChangeLocation = (e) => {
    dispatch(setLocation(e.target.value));
  };
  const handleReadyPay = () => {
    dispatch(setAmountOfReduce(amount));
    handleNextModal();
  };

  return (
    <>
      <p className="text-4xl font-montserrat px-8">Congratulations!</p>
      <p className="font-raleway text-xl my-4">
        You have taken a step towards making a significant difference!
      </p>
      <p className="font-raleway text-xl mt-4">
        How many bricks would you like to contribute to our Wall of Hope?
      </p>
      <div className="w-40 flex justify-between items-center border border-gray-800 rounded-md px-3 my-6">
        <button className="text-xl mb-0.5" onClick={handleDecreaseAmount}>
          -
        </button>
        {/* <span className="flex items-center border px-8 py-1 h-2/3 bg-gray-300 text-lg">
          {amount}
        </span> */}
        <input
          type="text"
          min={1}
          max={32000}
          value={amount}
          className="w-24 border px-2 py-2 h-2/3 outline-none focus:border focus:border-sky-400 bg-gray-300 text-lg text-center"
          onChange={(e) => handleAmount(e)}
        />
        <button className="text-xl mb-0.5" onClick={handleIncreaseAmount}>
          +
        </button>
      </div>
      <div className="flex flex-col">
        <p className="font-montserrat text-2xl">Contribution</p>
        <p className="font-raleway text-xl">₹ {1000 * amount}</p>
      </div>
      <select
        className="border px-2 py-2 my-6 cursor-pointer border-gray-400"
        onChange={handleChangeLocation}
      >
        <option key={0}>I am a Resident Indian</option>
        <option key={1}>I am a Non-Resident Indian</option>
        <option key={2}>I am a Foreign National</option>
      </select>
      <button
        className="text-gray-100 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md mt-4"
        onClick={handleReadyPay}
      >
        <span className="flex flex-row items-center justify-between gap-x-3">
          READY TO PAY <FaAnglesRight />
        </span>
      </button>
    </>
  );
};

IntroModal.propTypes = {
  handleNextModal: PropTypes.func.isRequired,
};

export default IntroModal;
