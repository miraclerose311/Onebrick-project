import { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Test = ({
  count,
  clearFilter,
  setIsShareModalOpen,
  onChangeSearchInput,
  setIsWordsofSupportModalOpen,
}) => {
  const { avatar } = useSelector((state) => state.auth);
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col">
      <p>This is test component!!{(count, isAuthenticated, token)}</p>
      <img src={avatar} />
      <button onClick={() => clearFilter()} className="bg-gray-200">
        clear
      </button>
      <div className="bg-gray-200 m-2" onClick={setIsShareModalOpen}>
        setIsShareModalOpen
      </div>
      <div className="bg-gray-200 m-2" onClick={onChangeSearchInput}>
        setIsShareModalOponChangeSearchInputen
      </div>
      <div className="bg-gray-200 m-2" onClick={setIsWordsofSupportModalOpen}>
        setIsWordsofSupportModalOpen
      </div>
    </div>
  );
};

Test.propTypes = {
  count: PropTypes.number.isRequired,
  setIsShareModalOpen: PropTypes.func.isRequired,
  onChangeSearchInput: PropTypes.func.isRequired,
  setIsWordsofSupportModalOpen: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const MemorizedTest = memo(Test);

export default MemorizedTest;
