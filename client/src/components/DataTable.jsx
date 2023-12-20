import { useState, useEffect } from "react";
import axios from "axios";

import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";

const DataTable = () => {
	const [data, setData] = useState({});
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [filter, setFilter] = useState({
		sold: { modal: false, value: "all" },
		fake: { modal: false, value: "all" },
	});

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/brick/current_page?page=${currentPage}&limit=${limit}&sold=${filter.sold.value}&fake=${filter.fake.value}`
				);
				setData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [currentPage, limit, filter]);

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
	console.log(filter);
	return (
		<div className="w-full px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64 mt-24">
			<table className="w-full">
				<thead>
					<tr className="font-montserrat font-normal">
						<th rowSpan="2">
							<span className="w-full h-full flex justify-around items-center">
								BrickId
							</span>
						</th>
						<th
							rowSpan="2"
							className="relative"
						>
							<div className="w-full h-full flex justify-around items-center">
								<span>Sold</span>
								<div className="border border-gray-200 rounded-full hover:bg-gray-100 p-1">
									<CiFilter
										onClick={() =>
											setFilter({
												...filter,
												sold: {
													...filter.sold,
													modal: !filter.sold.modal,
												},
											})
										}
									/>
								</div>
							</div>
							{filter.sold.modal && (
								<select
									id="filter"
									name="sold"
									value={filter.sold.value}
									className="absolute top-10 left-0 p-1 border-2 border-gray-300 shadow-md shadow-gray-600/50 rounded-sm z-10"
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
								<div className="border border-gray-200 rounded-full hover:bg-gray-100 p-1">
									<CiFilter
										onClick={() =>
											setFilter({
												...filter,
												fake: {
													...filter.fake,
													modal: !filter.fake.modal,
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
									className="absolute top-10 left-0 p-1 border-2 border-gray-300 shadow-md shadow-gray-600/50 rounded-sm z-10"
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
							Date of
							<br />
							purchase
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
								<td></td>
								<td>{item.date ? String(item.date).substring(0, 10) : ""}</td>
								<td>{item.user ? item.dedication.name : ""}</td>
								<td>{item.user ? item.dedication.relationship : ""}</td>
								<td>{item.user ? item.dedication.message : ""}</td>
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
