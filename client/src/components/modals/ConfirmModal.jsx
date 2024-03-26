import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/auth";
import { jwtDecode } from "jwt-decode";

import userAvatar from "../../assets/img/user.png";
import { useEffect, useState } from "react";
import { clearUser } from "../../features/userSlice";

const ConfirmModal = ({
  filtered,
  handleClickOnList,
  handleShowAll,
  handleGoToDedicate,
  hideModal,
}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [masterId, setMasterId] = useState(null);
  useEffect(() => {
    if (token) {
      const { id } = jwtDecode(token);
      setMasterId(id);
    } else {
      setMasterId(null);
    }
  }, [token, dispatch]);

  const userId = filtered[0].user;

  useEffect(() => {
    dispatch(getUser(userId));
  }, [userId]);

  const { user } = useSelector((state) => state.user);
  const { bricks } = useSelector((state) => state.brick);

  const brickArray = bricks?.filter((element) => element.user === userId);

  const onClickNotDedicated = (brick_id, userId, userName) => {
    if (masterId && masterId === userId) handleGoToDedicate(brick_id);
    else {
      alert(`You can't dedicate to ${userName}' brick.`);
    }
  };

  const onClickBrick = (brick_id) => {
    dispatch(clearUser());
    handleClickOnList(brick_id);
    hideModal();
  };

  const onClickShowAll = (brickIDs) => {
    hideModal();
    dispatch(clearUser());
    handleShowAll(brickIDs);
  };

  return (
    <div className="w-full sm:w-4/5 flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-end gap-4">
        <img
          src={user.picture ? user.picture : userAvatar}
          className="w-20 sm:w-24 h-20 sm:h-24 rounded-full mx-auto"
        />
        <p className="text-2xl font-bold font-raleway">{user.fullName}</p>
      </div>
      <p className="text-xl font-raleway font-medium hidden sm:flex">
        {brickArray.length}&nbsp;BRICKS DONATED
      </p>
      <div className="w-4/5 md:w-full max-h-48 scroll-hidden flex flex-col border border-gray-100">
        {brickArray.map((brick) => (
          <p
            key={brick.brick_id}
            className="w-full text-md border-gray-200 font-raleway my-2 cursor-pointer border-b"
          >
            {brick.dedication ? (
              <span onClick={() => onClickBrick(brick.brick_id)}>
                Dedicated to {brick.dedication.name}
              </span>
            ) : (
              <span
                onClick={() =>
                  onClickNotDedicated(brick.brick_id, brick.user, user.fullName)
                }
              >
                Not dedicated
              </span>
            )}
          </p>
        ))}
      </div>
      <span
        className="cursor-pointer bg-red-700 rounded-sm hover:bg-red-600 text-white px-4 py-1"
        onClick={() => onClickShowAll(brickArray)}
      >
        View all
      </span>
      <div className="bg-[#FBF8BE] shadow-lg shadow-yellow-300/50 rounded-xl w-full hidden sm:flex flex-col gap-6 p-4">
        <p className="text-lg sm:text-2xl font-medium font-raleway">
          Do you want to donate more bricks?
        </p>
        <p className="text-sm sm:text-lg font-raleway">
          It’s simple. Just mouseover a brick and click to Donate!
        </p>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  filtered: PropTypes.array.isRequired,
  // clickedIndex: PropTypes.number.isRequired,
  // handleDedicate: PropTypes.func.isRequired,
  handleClickOnList: PropTypes.func.isRequired,
  handleShowAll: PropTypes.func.isRequired,
  handleGoToDedicate: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default ConfirmModal;
