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
import { query } from "express";

const DataTable = () => {
	const [data, setData] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(10);
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
				const query = `page=${currentPage}&limit=${limit}&sold=${filter.sold.value}&fake=${filter.fake.value}&brick_id=${sorts.brick_id}&date=${sorts.date}`;
				const response = await axios.get(
					`http://localhost:5000/api/brick/current_page?${query}`
				);
				setData(response.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [currentPage, limit, filter, sorts]);
	console.log(query);
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

	return (
		<div className="w-full px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 mt-24">
			<table className="w-full">
				<thead>
					<tr className="font-montserrat font-normal">
						<th rowSpan="2">
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
												setSorts((prevSort) => ({ ...prevSort, brick_id: -1 }))
											}
											className="text-sky-500"
										/>
									)}
									{sorts.brick_id === -1 && (
										<FaSortAmountUp
											onClick={() =>
												setSorts((prevSort) => ({ ...prevSort, brick_id: 1 }))
											}
											className="text-sky-500"
										/>
									)}
								</div>
							</div>
						</th>
						<th
							rowSpan="2"
							className="relative"
						>
							<div className="w-full h-full flex justify-around items-center">
								<span>Sold</span>
								<div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
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
										className="text-sky-500"
									/>
								</div>
							</div>
							{filter.sold.modal && (
								<select
									id="filter"
									name="sold"
									value={filter.sold.value}
									className="absolute top-12 right-0 p-1 border-2 border-sky-300 shadow-md shadow-gray-600/50 rounded-sm z-10"
									onChange={handleFilter}
								>
									<option value="all">All</option>
									<option value="true">True</option>
									<option value="false">False</option>
								</select>
							)}
						</th>
						<th
							rowSpan="2"
							className="relative"
						>
							<div className="w-full h-full flex justify-around items-center">
								<span>Fake</span>
								<div className="border border-sky-500 rounded-full hover:bg-gray-100 p-1">
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
									/>
								</div>
							</div>
							{filter.fake.modal && (
								<select
									id="filter"
									name="fake"
									value={filter.fake.value}
									className="absolute top-12 right-0 p-1 border-2 border-sky-500 shadow-md shadow-gray-600/50 rounded-sm z-10"
									onChange={handleFilter}
								>
									<option value="all">All</option>
									<option value="true">True</option>
									<option value="false">False</option>
								</select>
							)}
						</th>
						<th rowSpan="2">
							Donor
							<br />
							Name
						</th>
						<th rowSpan="2">
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
												setSorts((prevSort) => ({ ...prevSort, date: 1 }))
											}
											className="text-sky-500"
										/>
									)}
								</div>
							</div>
						</th>

						<th colSpan="3">Dedication</th>
					</tr>
					<tr>
						<th>Name</th>
						<th>Message</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					{data.documents &&
						data.documents.map((item, index) => (
							<tr
								key={index}
								className={classNames(
									"font-raleway text-center",
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
			<div className="flex gap-20 p-2 justify-center text-lg">
				<select
					onChange={(e) => setLimit(e.target.value)}
					className="bg-white border border-gray-400 rounded-md"
				>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
				</select>
				<div className="flex items-center gap-6">
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
				<div className="flex gap-2">
					Move to
					<input
						name="movePage"
						value={currentPage}
						className="w-12 border border-gray-400 rounded-sm"
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

export default DataTable;
