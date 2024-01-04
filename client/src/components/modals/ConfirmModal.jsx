import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const ConfirmModal = ({ filtered }) => {
	const imgSrc = sessionStorage.getItem("avatar");
	const token = sessionStorage.getItem("token");

	const user = jwtDecode(token);

	const brickIdArray = [];
	filtered.map((item) => {
    brickIdArray.push(
      <p className="w-full text-md border-b-2 border-gray-800 font-raleway my-2">
        {item.brick_id}
      </p>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-12">
      <div className="flex flex-col items-end gap-4">
        <img
          src={imgSrc ? imgSrc : user}
          className="w-28 h-28 rounded-full mx-auto"
        />
        <p className="text-2xl font-bold font-raleway">{user.fullName}</p>
      </div>
      <p className="text-xl font-raleway font-medium">
        {brickIdArray.length}&nbsp;BRICKS DONATED
      </p>
      <div className="w-full h-1/6 scroll-hidden">{brickIdArray}</div>
      <div className="bg-[#FBF8BE] shadow-lg shadow-yellow-300/50 rounded-xl w-full flex flex-col gap-6 p-4 mt-8">
        <p className="text-2xl font-medium font-raleway">
          Do you want to donate more bricks?
        </p>
        <p className="text-lg font-raleway">
          It’s simple. Just mouseover a brick and click to Donate!
        </p>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
	filtered: PropTypes.array.isRequired,
};

export default ConfirmModal;
