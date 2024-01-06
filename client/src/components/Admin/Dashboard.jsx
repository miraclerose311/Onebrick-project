import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

import { clearLoading, setLoading } from "../../features/loadingSlice";

const TotalBrickAmount = 35000;

const Dashboard = () => {
  const base_URL = `${import.meta.env.VITE_BACKEND_URL}`;
  const newDate = new Date();

  const [byMonth, setByMonth] = useState(true);
  const [year, setYear] = useState(newDate.getFullYear());
  const [month, setMonth] = useState(newDate.getMonth() + 1);
  const [realData, setRealData] = useState([]);

  const dispatch = useDispatch();

  const handleChangeByMonth = (e) => {
    if (e.target.value === "bymonth") setByMonth(true);
    else setByMonth(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (byMonth) {
          const query = `year=${year}`;
          const response = await axios.get(
            `${base_URL}/api/brick/saleInfo/bymonth?${query}`
          );
          console.log(response);
          const brickData = Object.values(response.data);

          setRealData(brickData);
        } else {
          const query = `year=${year}&month=${month}`;
          const response = await axios.get(
            `${base_URL}/api/brick/saleInfo/byday?${query}`
          );
          console.log(response);
          const brickData = Object.values(response.data);

          setRealData(brickData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    dispatch(setLoading());
    fetchData();
    dispatch(clearLoading());
  }, [year, month, byMonth, dispatch]);

  // useEffect(() => {
  //   const fetchStaticData = async () => {
  //     try {
  //       dispatch(getBrickSoldAmount());
  //       dispatch(getDonorAmount());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchStaticData();
  // }, [dispatch]);

  // const handleModalOpen = (e) => {
  //   setModalOpen(true);
  //   if (e.target.name === "brickReset") {
  //     setModalContent("brick");
  //   } else {
  //     setModalContent("donor");
  //   }
  // };

  // const handleReset = () => {
  //   setModalOpen(false);
  //   if (modalContent === "brick") {
  //     dispatch(initialBricks(count));
  //   } else {
  //     dispatch(initialDonors(count));
  //   }
  //   setCount(0);
  // };

  return (
    <div className="bg-gray-100 w-full">
      <div>
        <p className="font-raleway font-medium text-4xl py-4">Dash Board</p>
        <hr className="w-full" />
      </div>
      {/* <div className="w-full flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 xl:w-1/3 p-4">
          <div className="flex flex-col item-center bg-white p-4 gap-3 rounded-lg shadow-md shadow-bray-600">
            <p className="text-center text-xl font-montserrat">Fake bricks</p>
            <p className="text-center font-raleway text-2xl font-medium">
              {fakesold}/{TotalBrickAmount}
            </p>
            <div className="flex justify-around gap-3 items-center">
              <span className="bg-green-300/30 rounded-md px-2 py-0.5">
                {((fakesold / TotalBrickAmount) * 100).toFixed(2)}%
              </span>
              <button
                name="brickReset"
                onClick={handleModalOpen}
                className="bg-red-300 px-4 py-0.5 rounded-md hover:bg-red-500"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 xl:w-1/3 p-4">
          <div className="flex flex-col item-center bg-white p-4 gap-3 rounded-lg shadow-md shadow-bray-600">
            <p className="text-center text-xl font-montserrat">
              Real Sold bricks
            </p>
            <p className="text-center font-raleway text-2xl font-medium">
              {sold}/{TotalBrickAmount}
            </p>
            <div className="flex justify-around gap-3 items-center">
              <span className="bg-green-300/30 rounded-md px-2 py-0.5">
                {((sold / TotalBrickAmount) * 100).toFixed(2)}%
              </span>
              {/* <button className="">Reset</button>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 xl:w-1/3 p-4">
          <div className="flex flex-col item-center bg-white p-4 gap-3 rounded-lg shadow-md shadow-bray-600">
            <p className="text-center text-xl font-montserrat">Our Donors</p>
            <p className="text-center font-raleway text-2xl font-medium">
              {fakedonor}/{donor}
            </p>
            <div className="flex justify-around gap-3 items-center">
              <span className="bg-green-300/30 rounded-md px-2 py-0.5">
                {((fakedonor / donor) * 100).toFixed(2)}%
              </span>
              <button
                name="donorReset"
                onClick={handleModalOpen}
                className="bg-red-300 px-4 py-0.5 rounded-md hover:bg-red-500"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <BrickResetModal
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          count={parseInt(count)}
          handleReset={handleReset}
          changeCount={(changedcount) => setCount(changedcount)}
        />
      </div> */}
      <div className="w-full flex flex-wrap justify-center items-center">
        <div className="w-full p-4 mt-12">
          <div className="pt-12 pb-6 w-full flex justify-center">
            <LineChart
              width={850}
              height={400}
              data={realData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={byMonth ? "_id.month" : "_id.day"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-2 flex flex-wrap">
          <div className="w-1/3 p-2">
            <select
              className="p-2 px-3 w-full rounded-md bg-white hover:boder-gray-200 cursor-pointer shadow-md shadow-gray-300"
              onChange={handleChangeByMonth}
            >
              <option value="bymonth">By Month</option>
              <option value="byday">By Day</option>
            </select>
          </div>
          <div className="w-1/3 p-2">
            <input
              name="year"
              type="number"
              value={year}
              className="p-2 px-3 w-full rounded-md bg-white hover:boder-gray-200 cursor-pointer shadow-md shadow-gray-300"
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
          </div>
          <div className="w-1/3 p-2">
            <input
              name="month"
              type="number"
              value={month}
              min={1}
              max={12}
              className="p-2 px-3 w-full rounded-md bg-white hover:boder-gray-200 cursor-pointer shadow-md shadow-gray-300"
              onChange={(e) => setMonth(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
