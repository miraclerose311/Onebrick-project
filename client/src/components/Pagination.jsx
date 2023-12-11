
// import Image6 from "../assets/img/Image6.png";
// import Image7 from "../assets/img/Image7.png";
// import Image8 from "../assets/img/Image8.png";
// import Image9 from "../assets/img/Image9.png";
// import Image10 from "../assets/img/Image10.png";
// import Image11 from "../assets/img/Image11.png";
// import Image12 from "../assets/img/Image12.png";
// import Image15 from "../assets/img/Image15.png";

const Pagination = () => {
	return (
		<div className="flex border w-full border-gray-400 rounded-lg justify-evenly items-center px-12 py-1">
			<a
				href="#"
				className="cursor-pointer"
			>
				<svg
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
						clipRule="evenodd"
					/>
				</svg>
			</a>
			<a className="px-3 py-1 cursor-pointer rounded-md text-gray-600">1</a>
			<a className="px-3 py-1 cursor-pointer bg-sky-500 rounded-md text-white">
				2
			</a>
			<a className="px-3 py-1 cursor-pointer rounded-md text-gray-600">3</a>
			<a className="px-3 py-1 cursor-pointer rounded-md text-gray-600">...</a>
			<a className="px-3 py-1 cursor-pointer rounded-md">12</a>
			<a
				href="#"
				className="cursor-pointer p-2 rounded-sm"
			>
				<span className="sr-only">Next</span>
				<svg
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
						clipRule="evenodd"
					/>
				</svg>
			</a>
		</div>
	);
};

export default Pagination;
