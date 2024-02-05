import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import SupportWord from "../SupportWord";
import ProgressBar1 from "../ProgressBar1";

import { getCurrentDonors } from "../../actions/donor";
import { getWords } from "../../actions/support";

import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

const Popup = ({ hideModal, setDonorName, setIsWordsofSupportModalOpen }) => {
  const modalRef = useRef();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const { currentDonors } = useSelector((state) => state.donor);
  const { supportWords } = useSelector((state) => state.support);

  const limit = 5;
  const totalPages = Math.ceil(currentDonors.length / limit);
  const startPoint = (currentPage - 1) * limit;

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 300, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    console.log("supportWords", supportWords);
  }, [supportWords]);

  useEffect(() => {
    dispatch(getCurrentDonors());
    dispatch(getWords());
  }, [dispatch]);

  const handleClick = (e) => {
    if (e.currentTarget) {
      setDonorName(e.currentTarget.id);
      hideModal();
    }
  };

  window.onclick = (e) => {
    if (e.target == document.getElementById("empty")) {
      hideModal();
    }
  };

  return (
    <div
      id="popup-modal"
      ref={modalRef}
      className="w-full h-[100vh] fixed z-50 scroll-hidden"
    >
      <div id="empty" className="w-full h-full bg-transparent"></div>
      <div className="myModal-content w-full flex flex-wrap md:flex-row-reverse shadow-custom-2 bg-white overflow-auto shadow-gray-500  absolute">
        <div className="w-full md:w-1/2 xl:w-5/12 py-16 px-8 md:px-0 md:pr-16 lg:pr-24 xl:pr-28 2xl:pr-36 md:pl-12 lg:pl-16 2xl:pl-24 h-full flex justify-center bg-white">
          <div className="w-full h-[525px] flex flex-col border border-gray-800 rounded-md px-6 md:px-12 py-6 overflow-auto scroll-hidden">
            <ProgressBar1 height={2} />
            <div className="h-full flex flex-col gap-3 mt-5">
              <p className="text-2xl font-medium">RECENT DONORS</p>
              <div className="flex flex-col gap-4">
                {currentDonors &&
                  currentDonors
                    .slice(startPoint, startPoint + limit)
                    .map((item, index) => (
                      <div
                        key={index}
                        id={item.fullName}
                        className="flex gap-4 cursor-pointer"
                        onClick={(e) => handleClick(e)}
                      >
                        <img
                          src={item.avatar}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col">
                          <p className="text-xl font-normal">{item.fullName}</p>
                          <p className="text-start">
                            Rs. {item.purchasedBricksCount * 1000}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
              <div className="flex w-full justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <HiChevronLeft className="cursor-pointer hover:scale-150 transform duration-200" />
                </button>

                <span>
                  {currentPage} / {totalPages || 1}
                </span>

                <button
                  onClick={() => {
                    currentPage < totalPages && setCurrentPage(currentPage + 1);
                  }}
                >
                  <HiChevronRight className="cursor-pointer hover:scale-150 transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full md:w-1/2 xl:w-7/12 min-h-[1000px] py-16 px-8 md:px-0 md:pl-16 lg:pl-24 xl:pl-28 2xl:pl-36 scroll-hidden">
          <p className="text-lg lg:text-2xl text-justify text-neutral-700 first-letter:text-6xl first-letter:float-left first-letter:mr-3">
            Welcome to the Wall of Hope, a visual representation of collective
            support and compassion at Alpha Hospice. Each brick you see is a
            chance to contribute meaningfully. By clicking on a virtual brick,
            you can personalize it with your message or dedication and then
            proceed with your donation. Your participation not only aids in
            building our hospice but also weaves your story into our community
            tapestry. Join us in this significant endeavor-every brick, every
            contribution,brings us closer to realizing our shared vision of
            care. and dignity.
          </p>
          <hr className="my-5 border border-red-800/70" />
          <div className="flex flex-col items-start gap-3 pt-8">
            <p className="text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl">
              Words of Supports({supportWords.length})
            </p>
            <button
              onClick={setIsWordsofSupportModalOpen}
              className="py-1 md:py-2 px-12 mt-3 rounded-lg border-2 border-sky-700 hover:bg-sky-800 hover:text-white font-montserrat text-center"
            >
              ADD WORDS OF SUPPORT
            </button>
          </div>
          {Array.isArray(supportWords) &&
            supportWords.map((item, index) => {
              return <SupportWord key={index} message={item.message} />;
            })}
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  isShow: PropTypes.bool,
  hideModal: PropTypes.func.isRequired,
  setDonorName: PropTypes.func.isRequired,
};

const MemorizedPopup = memo(Popup);

export default MemorizedPopup;
