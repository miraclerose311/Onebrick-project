import { useState, useEffect } from "react";
import axios from "axios";

import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";

const BrickTable = () => {
	const [data, setData] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [search, setSearch] = useState("");
	const [term, setTerm] = useState("");

	const [filter, setFilter] = useState({
		sold: { modal: false, value: "all" },
		fake: { modal: false, value: "all" },
	});

	const [sorts, setSorts] = useState({
		brick_id: 0,
		date: 0,
	});

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const query = `page=${currentPage}&limit=${limit}&sold=${filter.sold.value}&fake=${filter.fake.value}&brick_id=${sorts.brick_id}&date=${sorts.date}&term=${term}`;
				const response = await axios.get(
					`http://localhost:5000/api/brick/current_page?${query}`
				);
				setData(response.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		console.log(term);
		fetchData();
	}, [currentPage, limit, filter, sorts, term]);

	const handleFilter = (e) => {
		const { name, value } = e.target;
		setFilter((prevFilters) => ({
			...prevFilters,
			[name]: {
				...prevFilters[name],
				value: value,
				modal: false, // closes the modal when a selection is made
			},
		}));
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

	return (
		<div className='bricktable w-full px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 mt-24'>
			<div className='w-full flex flex-col py-1'>
				<p className='font-montserrat font-bold text-2xl text-center'>
					All Brick Data
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
						<th rowSpan='2'>
							<div className='w-full h-full flex justify-around items-center'>
								<span>BrickId</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									{sorts.brick_id === 0 && (
										<TbArrowsSort
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, brick_id: 1 }))
											}
											className='text-sky-500'
										/>
									)}
									{sorts.brick_id === 1 && (
										<FaSortAmountDownAlt
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, brick_id: -1 }))
											}
											className='text-sky-500'
										/>
									)}
									{sorts.brick_id === -1 && (
										<FaSortAmountUp
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, brick_id: 1 }))
											}
											className='text-sky-500'
										/>
									)}
								</div>
							</div>
						</th>
						<th
							rowSpan='2'
							className='relative'
						>
							<div className='w-full h-full flex justify-around items-center'>
								<span>Sold</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									<CiFilter
										onClick={() =>
											setFilter({
												...filter,
												sold: {
													...filter.sold,
													modal: !filter.sold.modal,
												},
												fake: {
													...filter.fake,
													modal: false,
												},
											})
										}
										className='text-sky-500'
									/>
								</div>
							</div>
							{filter.sold.modal && (
								<select
									id='filter'
									name='sold'
									value={filter.sold.value}
									onChange={handleFilter}
									className='absolute top-16 right-0 p-1 bg-gray-200 text-black border-2 shadow-md shadow-gray-800/30 rounded-sm z-10'
								>
									<option value='all'>All</option>
									<option value='true'>True</option>
									<option value='false'>False</option>
								</select>
							)}
						</th>
						<th
							rowSpan='2'
							className='relative'
						>
							<div className='w-full h-full flex justify-around items-center'>
								<span>Fake</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									<CiFilter
										onClick={() =>
											setFilter({
												...filter,
												fake: {
													...filter.fake,
													modal: !filter.fake.modal,
												},
												sold: {
													...filter.sold,
													modal: false,
												},
											})
										}
										className='text-sky-500 font-bold'
									/>
								</div>
							</div>
							{filter.fake.modal && (
								<select
									id='filter'
									name='fake'
									value={filter.fake.value}
									className='absolute top-16 right-0 p-1 bg-gray-200 text-black border-2 shadow-md shadow-white/30 rounded-sm z-10'
									onChange={handleFilter}
								>
									<option value='all'>All</option>
									<option value='true'>True</option>
									<option value='false'>False</option>
								</select>
							)}
						</th>
						<th rowSpan='2'>
							Donor
							<br />
							Name
						</th>
						<th rowSpan='2'>
							<div className='w-full h-full flex justify-around items-center'>
								<span>
									Date of
									<br />
									purchase
								</span>
								<div className='border border-sky-500 rounded-full hover:bg-gray-100 p-1'>
									{sorts.date === 0 && (
										<TbArrowsSort
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, date: 1 }))
											}
											className='text-sky-500'
										/>
									)}
									{sorts.date === 1 && (
										<FaSortAmountDownAlt
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, date: -1 }))
											}
											className='text-sky-500'
										/>
									)}
									{sorts.date === -1 && (
										<FaSortAmountUp
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, date: 1 }))
											}
											className='text-sky-500'
										/>
									)}
								</div>
							</div>
						</th>

						<th colSpan='3'>Dedication</th>
					</tr>
					<tr>
						<th>Name</th>
						<th>Relationship</th>
						<th>message</th>
					</tr>
				</thead>
				<tbody>
					{data.documents &&
						data.documents.map((item, index) => (
							<tr
								key={index}
								className={classNames(
									"font-raleway text-center cursor-pointer hover:bg-sky-100",
									item.sold && "bg-gray-200"
								)}
							>
								<td>{item.brick_id}</td>
								<td>{item.sold ? "True" : "False"}</td>
								<td>{item.fake ? "True" : "False"}</td>
								<td>
									{item.donor && item.donor.length > 0
										? item.donor[0].fullName
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
			<div className='flex gap-20 p-5 justify-center text-lg'>
				<select
					onChange={(e) => setLimit(e.target.value)}
					className='bg-gray-800 opacity-800 text-white rounded-md'
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

export default BrickTable;
