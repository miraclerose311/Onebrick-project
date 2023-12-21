import { useState, useEffect } from "react";
import axios from "axios";

import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";

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
	});

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = `page=${currentPage}&limit=${limit}&term=${term}&mobile=${sorts.mobile}&country=${sorts.country}&state=${sorts.state}&address=${sorts.address}&pan=${sorts.pan}&pin=${sorts.pin}`;
				const response = await axios.get(
					`http://localhost:5000/api/donor/current_page?${query}`
				);
				setData(response.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		console.log(term);
		fetchData();
	}, [currentPage, limit, sorts, term]);

	useEffect(() => {
		// Setting up the delay
		const timerId = setTimeout(() => {
			setTerm(search);
		}, 1000); // Adjust the delay as needed

		return () => {
			clearTimeout(timerId); // Clear the timeout if the component unmounts or the term changes
		};
	}, [search]);

	return (
		<div className='bricktable w-full px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 mt-24'>
			<div className='w-full flex flex-col py-1'>
				<p className='font-montserrat font-bold text-4xl text-center'>
					Our Donors
				</p>
				<input
					name='search'
					value={search}
					placeholder='Search for all fields..'
					className='border border-gray-400 p-2 rounded-md ml-auto'
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<table className='w-full'>
				<thead className='bg-gray-800 text-white opacity-800'>
					<tr className='font-montserrat font-normal'>
						<th>
							<div className='w-full h-full flex justify-around items-center'>
								<span>Full Name</span>
							</div>
						</th>
						<th>
							<div className='w-full h-full flex justify-around items-center'>
								<span>Email</span>
							</div>
						</th>
						<th>
							<div className='w-full h-full flex justify-around items-center'>
								<span>Mobile</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									{sorts.mobile === 0 && (
										<TbArrowsSort
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, mobile: 1 }))
											}
											className='text-sky-500'
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
											className='text-sky-500'
										/>
									)}
									{sorts.mobile === -1 && (
										<FaSortAmountUp
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, mobile: 1 }))
											}
											className='text-sky-500'
										/>
									)}
								</div>
							</div>
						</th>
						<th>
							<div className='w-full h-full flex justify-around items-center'>
								<span>Country</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									{sorts.country === 0 && (
										<TbArrowsSort
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, country: 1 }))
											}
											className='text-sky-500'
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
											className='text-sky-500'
										/>
									)}
									{sorts.country === -1 && (
										<FaSortAmountUp
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, country: 1 }))
											}
											className='text-sky-500'
										/>
									)}
								</div>
							</div>
						</th>
						<th>
							<div className='w-full h-full flex justify-around items-center'>
								<span>State</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									{sorts.state === 0 && (
										<TbArrowsSort
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, state: 1 }))
											}
											className='text-sky-500'
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
											className='text-sky-500'
										/>
									)}
									{sorts.state === -1 && (
										<FaSortAmountUp
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, state: 1 }))
											}
											className='text-sky-500'
										/>
									)}
								</div>
							</div>
						</th>
						<th>
							<div className='w-full h-full flex justify-around items-center'>
								<span>Address</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									{sorts.address === 0 && (
										<TbArrowsSort
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, address: 1 }))
											}
											className='text-sky-500'
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
											className='text-sky-500'
										/>
									)}
									{sorts.address === -1 && (
										<FaSortAmountUp
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, address: 1 }))
											}
											className='text-sky-500'
										/>
									)}
								</div>
							</div>
						</th>
						<th>
							<div className='w-full h-full flex justify-around items-center'>
								<span>PIN</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									{sorts.pin === 0 && (
										<TbArrowsSort
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, pin: 1 }))
											}
											className='text-sky-500'
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
											className='text-sky-500'
										/>
									)}
									{sorts.pin === -1 && (
										<FaSortAmountUp
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, pin: 1 }))
											}
											className='text-sky-500'
										/>
									)}
								</div>
							</div>
						</th>
						<th>
							<div className='w-full h-full flex justify-around items-center'>
								<span>PAN</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									{sorts.pan === 0 && (
										<TbArrowsSort
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, pan: 1 }))
											}
											className='text-sky-500'
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
											className='text-sky-500'
										/>
									)}
									{sorts.pan === -1 && (
										<FaSortAmountUp
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, pan: 1 }))
											}
											className='text-sky-500'
										/>
									)}
								</div>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					{data.documents &&
						data.documents.map((item, index) => (
							<tr
								key={index}
								className='text-md font-raleway'
							>
								<td>{item.fullName}</td>
								<td>{item.email}</td>
								<td>{item.mobile}</td>
								<td>{item.country}</td>
								<td>{item.state}</td>
								<td>{item.address}</td>
								<td>{item.pin}</td>
								<td>{item.pan}</td>
							</tr>
						))}
				</tbody>
			</table>
			<div className='flex gap-20 p-2 justify-center text-lg'>
				<select
					onChange={(e) => setLimit(e.target.value)}
					className='bg-gray-800 border border-gray-400 text-white rounded-md'
				>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
				</select>
				<div className='flex items-center gap-6'>
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
				<div className='flex gap-2'>
					Move to
					<input
						name='movePage'
						value={currentPage}
						className='w-12 border border-gray-400 rounded-sm text-center'
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
	);
};

export default DonorTable;
