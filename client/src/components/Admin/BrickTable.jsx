import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLoading, setLoading } from "../../features/loadingSlice";
import ScrollToTop from "react-scroll-to-top";
import axios from "axios";

import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { getBrickSoldAmount } from "../../actions/brick";

const BrickTable = () => {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrickSoldAmount());
  }, [dispatch]);

  const { sold } = useSelector((state) => state.admin);

  const [sorts, setSorts] = useState({
    brick_id: 0,
    date: 0,
    amount: 0,
  });

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading());
        const query = `page=${currentPage}&limit=${limit}&brick_id=${sorts.brick_id}&date=${sorts.date}&amount=${sorts.amount}&term=${term}`;
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/brick/current_page?${query}`
        );
        setData(response.data);
        dispatch(clearLoading());
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, limit, sorts, term, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    // Setting up the delay
    const timerId = setTimeout(() => {
      setTerm(search);
    }, 1000); // Adjust the delay as needed

    return () => {
      clearTimeout(timerId); // Clear the timeout if the component unmounts or the term changes
    };
  }, [search]);

  const today = new Date();

  return (
    <div className="w-full py-12">
      <div>
        <p className="font-raleway font-medium text-4xl py-4 text-center">
          All Brick Data
        </p>
        <hr className="w-full" />
      </div>
      <div className="w-full pt-12">
        <div className="w-full flex justify-between py-1">
          <p className="text-xl font-montserrat">
            {sold} Bricks donated as on {today.getFullYear()}/
            {today.getMonth() + 1}/{today.getDate()}
          </p>
          <input
            name="search"
            value={search}
            placeholder="Search for all fields.."
            className="border border-gray-300 p-2 rounded-md ml-auto pr-12"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="w-full border border-gray-300 shadow-md shadow-gray-300">
          <thead className="font-montserrat text-sky-600 text-center font-semibold border-black">
            <tr>
              <td rowSpan="2">No</td>
              <td rowSpan="2">
                <div className="w-full h-full flex justify-around items-center">
                  <span>BrickId</span>
                  <div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
                    {sorts.brick_id === 0 && (
                      <TbArrowsSort
                        onClick={() =>
                          setSorts((prevSort) => ({ ...prevSort, brick_id: 1 }))
                        }
                        className="text-sky-500"
                      />
                    )}
                    {sorts.brick_id === 1 && (
                      <FaSortAmountDownAlt
                        onClick={() =>
                          setSorts((prevSort) => ({
                            ...prevSort,
                            brick_id: -1,
                          }))
                        }
                        className="text-sky-500"
                      />
                    )}
                    {sorts.brick_id === -1 && (
                      <FaSortAmountUp
                        onClick={() =>
                          setSorts((prevSort) => ({ ...prevSort, brick_id: 0 }))
                        }
                        className="text-sky-500"
                      />
                    )}
                  </div>
                </div>
              </td>
              <td rowSpan="2">Donor Name</td>
              <td rowSpan="2">
                <div className="w-full h-full flex justify-around items-center">
                  <span>
                    Date of
                    <br />
                    purchase
                  </span>
                  <div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
                    {sorts.date === 0 && (
                      <TbArrowsSort
                        onClick={() =>
                          setSorts((prevSort) => ({ ...prevSort, date: 1 }))
                        }
                        className="text-sky-500"
                      />
                    )}
                    {sorts.date === 1 && (
                      <FaSortAmountDownAlt
                        onClick={() =>
                          setSorts((prevSort) => ({ ...prevSort, date: -1 }))
                        }
                        className="text-sky-500"
                      />
                    )}
                    {sorts.date === -1 && (
                      <FaSortAmountUp
                        onClick={() =>
                          setSorts((prevSort) => ({ ...prevSort, date: 0 }))
                        }
                        className="text-sky-500"
                      />
                    )}
                  </div>
                </div>
              </td>
              <td colSpan="3">Dedication</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>Relationship</td>
              <td>message</td>
            </tr>
          </thead>
          <tbody>
            {data.documents &&
              data.documents.map((item, index) => (
                <tr
                  key={index}
                  className={classNames(
                    "font-raleway text-center cursor-pointer hover:bg-sky-100",
                    index % 2 == 0 && "bg-gray-50"
                  )}
                >
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>{item.brick_id}</td>
                  <td>
                    {item.donor && item.donor.fullName
                      ? item.donor.fullName
                      : ""}
                  </td>
                  <td>{item.date ? String(item.date).substring(0, 10) : ""}</td>
                  <td>{item.dedication ? item.dedication.name : ""}</td>
                  <td>{item.dedication ? item.dedication.relationship : ""}</td>
                  <td>{item.dedication ? item.dedication.message : ""}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="w-full flex justify-center">
          <div className="flex flex-wrap w-full xl:w-3/4 2xl:w-2/3 p-5 text-lg">
            <div className="w-full md:w-1/4 flex justify-center items-center">
              <select
                onChange={(e) => setLimit(e.target.value)}
                className="bg-gray-800 opacity-800 text-white rounded-md w-20 py-1"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="flex w-full md:w-1/2 justify-center items-center gap-6">
              <button onClick={() => setCurrentPage(1)}>
                <HiChevronDoubleLeft className="cursor-pointer hover:scale-150 transform duration-200" />
              </button>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <HiChevronLeft className="cursor-pointer hover:scale-150 transform duration-200" />
              </button>

              <span>
                {currentPage} / {data.totalPages}
              </span>

              <button
                onClick={() => {
                  currentPage < data.totalPages &&
                    setCurrentPage(currentPage + 1);
                }}
              >
                <HiChevronRight className="cursor-pointer hover:scale-150 transform duration-200" />
              </button>
              <button onClick={() => setCurrentPage(data.totalPages)}>
                <HiChevronDoubleRight className="cursor-pointer hover:scale-150 transform duration-200" />
              </button>
            </div>
            <div className="flex justify-center items-center w-full md:w-1/4 gap-2">
              Move to
              <input
                name="movePage"
                value={currentPage}
                className="w-12 border border-gray-400 rounded-md text-center my-1"
                onChange={(e) => {
                  const pageNumber = parseInt(e.target.value, 10);
                  if (
                    !isNaN(pageNumber) &&
                    pageNumber >= 1 &&
                    pageNumber <= data.totalPages
                  ) {
                    setCurrentPage(pageNumber);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop
        className="flex fixed shadow-md shadow-gray-500 justify-center items-center rounded-full z-50 bottom-6 right-6"
        smooth
      />
    </div>
  );
};

export default BrickTable;
