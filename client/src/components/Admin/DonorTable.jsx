import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearLoading, setLoading } from "../../features/loadingSlice";

import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { getDonorAmount } from "../../actions/donor";

const DonorTable = () => {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("");

  const [sorts, setSorts] = useState({
    mobile: 0,
    country: 0,
    state: 0,
    pin: 0,
    pan: 0,
    address: 0,
    purchasedBricks: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDonorAmount());
  }, [dispatch]);

  const { donor } = useSelector((state) => state.admin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading());

        const query = `page=${currentPage}&limit=${limit}&term=${term}&mobile=${sorts.mobile}&country=${sorts.country}&state=${sorts.state}&address=${sorts.address}&pan=${sorts.pan}&pin=${sorts.pin}&purchasedBricks=${sorts.purchasedBricks}`;
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/donor/current_page?${query}`
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

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

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
        <p className="font-raleway font-medium text-center text-4xl py-4">
          Our Donors
        </p>
        <hr className="w-full" />
      </div>
      <div className="w-full flex justify-between pt-12 pb-1">
        <p className="text-xl">
          {donor} Donors as on {today.getFullYear()}/{today.getMonth() + 1}/
          {today.getDate()}
        </p>
        <input
          name="search"
          value={search}
          placeholder="Search for all fields.."
          className="border border-gray-400 p-2 pr-12 rounded-md ml-auto"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <thead className="font-montserrat font-semibold text-sky-600">
          <tr>
            <td rowSpan="2">No</td>
            <td>
              <div className="w-full h-full flex justify-around items-center gap-2">
                <span>Full Name</span>
              </div>
            </td>
            <td>
              <div className="w-full h-full flex justify-around items-center gap-2">
                <span>Email</span>
              </div>
            </td>
            <td>
              <div className="w-full h-full flex justify-around items-center gap-2">
                <span>Mobile</span>
                <div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
                  {sorts.mobile === 0 && (
                    <TbArrowsSort
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, mobile: 1 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.mobile === 1 && (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        setSorts((prevSort) => ({
                          ...prevSort,
                          mobile: -1,
                        }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.mobile === -1 && (
                    <FaSortAmountUp
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, mobile: 0 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                </div>
              </div>
            </td>
            <td>
              <div className="w-full h-full flex justify-around items-center gap-2">
                <span>Country</span>
                <div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
                  {sorts.country === 0 && (
                    <TbArrowsSort
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, country: 1 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.country === 1 && (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        setSorts((prevSort) => ({
                          ...prevSort,
                          country: -1,
                        }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.country === -1 && (
                    <FaSortAmountUp
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, country: 0 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                </div>
              </div>
            </td>
            <td>
              <div className="w-full h-full flex justify-around items-center gap-2">
                <span>State</span>
                <div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
                  {sorts.state === 0 && (
                    <TbArrowsSort
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, state: 1 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.state === 1 && (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        setSorts((prevSort) => ({
                          ...prevSort,
                          state: -1,
                        }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.state === -1 && (
                    <FaSortAmountUp
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, state: 0 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                </div>
              </div>
            </td>
            <td>
              <div className="w-full h-full flex justify-around items-center gap-2">
                <span>Address</span>
                <div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
                  {sorts.address === 0 && (
                    <TbArrowsSort
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, address: 1 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.address === 1 && (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        setSorts((prevSort) => ({
                          ...prevSort,
                          address: -1,
                        }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.address === -1 && (
                    <FaSortAmountUp
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, address: 0 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                </div>
              </div>
            </td>
            <td>
              <div className="w-full h-full flex justify-around items-center gap-2">
                <span>PIN</span>
                <div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
                  {sorts.pin === 0 && (
                    <TbArrowsSort
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, pin: 1 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.pin === 1 && (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        setSorts((prevSort) => ({
                          ...prevSort,
                          pin: -1,
                        }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.pin === -1 && (
                    <FaSortAmountUp
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, pin: 0 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                </div>
              </div>
            </td>
            <td>
              <div className="w-full h-full flex justify-around items-center gap-2">
                <span>PAN</span>
                <div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
                  {sorts.pan === 0 && (
                    <TbArrowsSort
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, pan: 1 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.pan === 1 && (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        setSorts((prevSort) => ({
                          ...prevSort,
                          pan: -1,
                        }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.pan === -1 && (
                    <FaSortAmountUp
                      onClick={() =>
                        setSorts((prevSort) => ({ ...prevSort, pan: 0 }))
                      }
                      className="text-sky-500"
                    />
                  )}
                </div>
              </div>
            </td>
            <td>
              <div className="w-full h-full flex justify-around items-center gap-2">
                <span>No. Bricks</span>
                <div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
                  {sorts.purchasedBricks === 0 && (
                    <TbArrowsSort
                      onClick={() =>
                        setSorts((prevSort) => ({
                          ...prevSort,
                          purchasedBricks: 1,
                        }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.purchasedBricks === 1 && (
                    <FaSortAmountDownAlt
                      onClick={() =>
                        setSorts((prevSort) => ({
                          ...prevSort,
                          purchasedBricks: -1,
                        }))
                      }
                      className="text-sky-500"
                    />
                  )}
                  {sorts.purchasedBricks === -1 && (
                    <FaSortAmountUp
                      onClick={() =>
                        setSorts((prevSort) => ({
                          ...prevSort,
                          purchasedBricks: 0,
                        }))
                      }
                      className="text-sky-500"
                    />
                  )}
                </div>
              </div>
            </td>
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
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.country}</td>
                <td>{item.state}</td>
                <td>{item.address}</td>
                <td>{item.pin}</td>
                <td>{item.pan}</td>
                <td>{item.purchasedBricksCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap w-full xl:w-3/4 2xl:w-2/3 p-5 text-lg">
          <div className="w-full md:w-1/4 flex justify-center items-center">
            <select
              onChange={(e) => setLimit(e.target.value)}
              className="bg-gray-800 border border-gray-400 text-white rounded-md"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex w-full md:w-1/2 justify-center items-center gap-6">
            <button onClick={() => setCurrentPage(1)}>
              <HiChevronDoubleLeft />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <HiChevronLeft />
            </button>

            <span>
              {currentPage} / {data.totalDocuments}
            </span>

            <button
              onClick={() => {
                currentPage < data.totalDocuments &&
                  setCurrentPage(currentPage + 1);
              }}
            >
              <HiChevronRight />
            </button>
            <button onClick={() => setCurrentPage(data.totalDocuments)}>
              <HiChevronDoubleRight />
            </button>
          </div>
          <div className="flex justify-center w-full md:w-1/4 gap-2">
            Move to
            <input
              name="movePage"
              value={currentPage}
              className="w-12 border border-gray-400 rounded-sm text-center"
              onChange={(e) => {
                const pageNumber = parseInt(e.target.value, 10);
                if (
                  !isNaN(pageNumber) &&
                  pageNumber >= 1 &&
                  pageNumber <= data.totalDocuments
                ) {
                  setCurrentPage(pageNumber);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorTable;
