import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentDonors } from "../../actions/donor";
import PropTypes from "prop-types";
import ProgressBar1 from "../ProgressBar1";
import SupportWord from "../SupportWord";

import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

const ModalOfWall = () => {
  const [visible, setVisible] = useState(true);

  const { currentDonors } = useSelector((state) => state.donor);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 5;
  const totalPages = Math.ceil(currentDonors.length / limit);

  const startPoint = (currentPage - 1) * limit;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentDonors());
  }, [dispatch]);

  window.onclick = (e) => {
    if (e.target == document.getElementById("myModal")) {
      setVisible(false);
    }
  };

  const supportWords = [
    { title: "Title of Support", text: "The Alpah hospice is greate company." },
    { title: "Title of Support", text: "The Alpah hospice is greate company." },
    { title: "Title of Support", text: "The Alpah hospice is greate company." },
    { title: "Title of Support", text: "The Alpah hospice is greate company." },
    { title: "Title of Support", text: "The Alpah hospice is greate company." },
    { title: "Title of Support", text: "The Alpah hospice is greate company." },
  ];

  return (
    visible && (
      <div id="myModal" className="w-full h-full fixed z-50">
        <div className="myModal-content w-full h-2/3 top-1/3 flex flex-wrap shadow-custom-2 bg-white overflow-auto shadow-gray-500  absolute">
          <div className="bg-white w-full md:w-1/2 xl:w-7/12 py-16 px-16 md:px-0 md:pl-16 lg:pl-24 xl:pl-28 2xl:pl-36 scroll-hidden">
            <p className=" text-2xl text-justify text-neutral-700 first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:text-red-700">
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
              <p className="text-4xl">Words of Supports(30)</p>
              <p className="text-2xl text-gray-700">
                Please donate to share words of support.
              </p>
            </div>
            {supportWords.map((item, index) => {
              return (
                <SupportWord key={index} title={item.title} text={item.text} />
              );
            })}
          </div>
          <div className="w-full md:w-1/2 xl:w-5/12 py-16 px-16 md:px-0 md:pr-16 lg:pr-24 xl:pr-28 2xl:pr-36 md:pl-12 lg:pl-16 2xl:pl-24 h-full flex justify-center bg-white">
            <div className="w-full flex flex-col border border-gray-800 rounded-md px-12 py-6 overflow-auto scroll-hidden">
              <ProgressBar1 height={2} />
              <div className="h-full flex flex-col gap-3 mt-5">
                <p className="text-2xl font-medium">RECENT DONORS</p>
                <div className="flex flex-col gap-4">
                  {currentDonors &&
                    currentDonors
                      .slice(startPoint, startPoint + limit)
                      .map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <img
                            src={item.avatar}
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="flex flex-col">
                            <p className="text-xl font-normal">
                              {item.fullName}
                            </p>
                            <p className="text-start">
                              Rs. {item.purchasedBricksCount * 10000}
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
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => {
                      currentPage < totalPages &&
                        setCurrentPage(currentPage + 1);
                    }}
                  >
                    <HiChevronRight className="cursor-pointer hover:scale-150 transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

ModalOfWall.propTypes = {
  isShow: PropTypes.bool,
};

export default ModalOfWall;
