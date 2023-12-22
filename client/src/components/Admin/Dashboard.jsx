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
	ResponsiveContainer,
} from "recharts";
import axios from "axios";

import { clearLoading, setLoading } from "../../features/loading/loadingSlice";
import { initialBricks } from "../../actions/brick";
import { initialDonors } from "../../actions/donor";

import BrickResetModal from "./BrickResetModal";

const TotalBrickAmount = 35000;

const Dashboard = () => {
	const base_URL = "http://localhost:5000/api";
	const newDate = new Date();

	const [year, setYear] = useState(newDate.getFullYear());
	const [month, setMonth] = useState(newDate.getMonth() + 1);
	const [displayFakeData, setDisplayFakeData] = useState(true);
	const [fakeData, setFakeData] = useState([]);
	const [realData, setRealData] = useState([]);
	const [fakeAmount, setFakeAmount] = useState(0);
	const [soldAmount, setSoldAmount] = useState(0);
	const [donorAllCount, setDonorAllCount] = useState(0);
	const [donorFakeCount, setDonorFakeCount] = useState(0);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState("");
	const [count, setCount] = useState(0);

	const [fakeChartData, setFakeChartData] = useState({
		labels: [],
		datasets: [],
	});
	const data = [
		{
			name: "Page A",
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
		{
			name: "Page B",
			uv: 3000,
			pv: 1398,
			amt: 2210,
		},
		{
			name: "Page C",
			uv: 2000,
			pv: 9800,
			amt: 2290,
		},
		{
			name: "Page D",
			uv: 2780,
			pv: 3908,
			amt: 2000,
		},
		{
			name: "Page E",
			uv: 1890,
			pv: 4800,
			amt: 2181,
		},
		{
			name: "Page F",
			uv: 2390,
			pv: 3800,
			amt: 2500,
		},
		{
			name: "Page G",
			uv: 3490,
			pv: 4300,
			amt: 2100,
		},
	];
	const [realChartData, setRealChartData] = useState({
		labels: [],
		datasets: [],
	});

	// Chart options
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Monthly Sales Chart",
			},
		},
	};

	const handleChangeSelect = (e) => {
		if (e.target.value === "fake") setDisplayFakeData(true);
		else setDisplayFakeData(false);
	};
	// Redux dispatch function
	const dispatch = useDispatch();

	// Fetch fake sales data
	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(setLoading());

				const query = `year=${year}&month=${month}`;

				const response = await axios.get(`${base_URL}/brick/saleInfo?${query}`);
				const fakeArray = Object.values(response.data.fake);
				const realArray = Object.values(response.data.real);

				setFakeData(fakeArray);
				setRealData(realArray);

				dispatch(clearLoading());
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [year, month, dispatch]);

	useEffect(() => {
		const fetchStaticData = async () => {
			try {
				const response1 = await axios.get(`${base_URL}/brick/fake-amount`);
				setFakeAmount(parseInt(response1.data));

				const response2 = await axios.get(`${base_URL}/brick/real-sold`);
				setSoldAmount(parseInt(response2.data));

				const response3 = await axios.get(`${base_URL}/donor/count-donor`);
				setDonorAllCount(parseInt(response3.data.all));
				setDonorFakeCount(parseInt(response3.data.fake));
			} catch (error) {
				console.log(error);
			}
		};
		fetchStaticData();
	}, [count]);

	// Set Fake Chart Data
	useEffect(() => {
		const newLabels = fakeData.map((item) => item._id.day);
		const newDatasets = [
			{
				label: "Total Sales",
				data: fakeData.map((item) => item.totalSales),
				borderColor: "#facc15", //color
				backgroundColor: "#facc1580", // background color with transparency
			},
		];

		setFakeChartData({
			labels: newLabels,
			datasets: newDatasets,
		});
	}, [fakeData]);

	//Set Real Chart Data
	useEffect(() => {
		const newLabels = realData.map((item) => item._id.day);
		const newDatasets = [
			{
				label: "Total Sales",
				data: realData.map((item) => item.totalSales),
				borderColor: "#facc15", // Example color
				backgroundColor: "#facc1580", // Example background color with transparency
			},
		];

		setRealChartData({
			labels: newLabels,
			datasets: newDatasets,
		});
	}, [realData]);

	const handleModalOpen = (e) => {
		setModalOpen(true);
		if (e.target.name === "brickReset") {
			setModalContent("brick");
		} else {
			setModalContent("donor");
		}
	};

	const handleReset = () => {
		setModalOpen(false);
		if (modalContent === "brick") {
			dispatch(initialBricks(count));
		} else {
			dispatch(initialDonors(count));
		}
		setCount(0);
	};
	console.log(fakeData);
	return (
		<div className='bg-gray-100 w-full lg:w-4/5 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12'>
			<div>
				<p className='font-raleway font-medium text-4xl py-4'>Dash Board</p>
				<hr className='w-full' />
			</div>
			<div className='w-full flex flex-wrap justify-center'>
				<div className='w-full lg:w-1/2 xl:w-1/4 p-4'>
					<div className='flex flex-col item-center bg-white p-4 gap-3 rounded-lg'>
						<p className='text-center text-xl font-montserrat'>Fake bricks</p>
						<p className='text-center font-raleway text-2xl font-medium'>
							{fakeAmount}/{TotalBrickAmount}
						</p>
						<div className='flex justify-around gap-3 items-center'>
							<span className='bg-green-300/30 rounded-md px-2 py-0.5'>
								{(fakeAmount / TotalBrickAmount).toFixed(4)}%
							</span>
							<button
								name='brickReset'
								onClick={handleModalOpen}
								className='bg-red-300 px-4 py-0.5 rounded-md hover:bg-red-500'
							>
								Reset
							</button>
						</div>
					</div>
				</div>
				<div className='w-full lg:w-1/2 xl:w-1/4 p-4'>
					<div className='flex flex-col item-center bg-white p-4 gap-3 rounded-lg'>
						<p className='text-center text-xl font-montserrat'>
							Real Sold bricks
						</p>
						<p className='text-center font-raleway text-2xl font-medium'>
							{soldAmount}/{TotalBrickAmount}
						</p>
						<div className='flex justify-around gap-3 items-center'>
							<span className='bg-green-300/30 rounded-md px-2 py-0.5'>
								{(soldAmount / TotalBrickAmount).toFixed(4)}%
							</span>
							{/* <button className="">Reset</button> */}
						</div>
					</div>
				</div>
				<div className='w-full lg:w-1/2 xl:w-1/4 p-4'>
					<div className='flex flex-col item-center bg-white p-4 gap-3 rounded-lg'>
						<p className='text-center text-xl font-montserrat'>Our Donors</p>
						<p className='text-center font-raleway text-2xl font-medium'>
							{donorFakeCount}/{donorAllCount}
						</p>
						<div className='flex justify-around gap-3 items-center'>
							<span className='bg-green-300/30 rounded-md px-2 py-0.5'>
								{(donorFakeCount / donorAllCount).toFixed(4)}%
							</span>
							<button
								name='donorReset'
								onClick={handleModalOpen}
								className='bg-red-300 px-4 py-0.5 rounded-md hover:bg-red-500'
							>
								Reset
							</button>
						</div>
					</div>
				</div>
				<BrickResetModal
					isOpen={modalOpen}
					closeModal={() => setModalOpen(false)}
					handleReset={handleReset}
					changeCount={(count) => setCount(count)}
				/>
			</div>
			<div className='w-full flex flex-wrap justify-center items-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24'>
				<div className='w-full xl:w-5/6'>
					{displayFakeData ? (
						<LineChart
							width={730}
							height={250}
							data={fakeData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray='1 1' />
							<XAxis dataKey='_id.day' />
							<YAxis />
							<Tooltip />
							<Legend />
							<Line
								type='monotone'
								dataKey='totalSales'
								stroke='#8884d8'
							/>
						</LineChart>
					) : (
						<Line
							options={options}
							data={realChartData}
						/>
					)}
				</div>
				<div className='w-full xl:w-1/6 pl-6 flex flex-wrap'>
					<div className='w-1/3 xs:w-1/2 xl:w-full p-2'>
						<select
							className='p-1 px-3 w-full rounded-md bg-gray-100 hover:bg-gray-200 shadow-md shadow-gray-300'
							onChange={handleChangeSelect}
						>
							<option value='fake'>Fake</option>
							<option value='real'>Real</option>
						</select>
					</div>
					<div className='w-1/3 xs:w-1/2 xl:w-full p-2'>
						<input
							name='year'
							type='number'
							value={year}
							className='p-1 px-3 w-full rounded-md bg-gray-100 hover:bg-gray-200 shadow-md shadow-gray-300'
							onChange={(e) => setYear(parseInt(e.target.value))}
						/>
					</div>
					<div className='w-1/3 xs:w-1/2 xl:w-full p-2'>
						<input
							name='month'
							type='number'
							value={month}
							min={1}
							max={12}
							className='p-1 px-3 w-full rounded-md bg-gray-100 hover:bg-gray-200 shadow-md shadow-gray-300'
							onChange={(e) => setMonth(parseInt(e.target.value))}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
