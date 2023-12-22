import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { clearLoading, setLoading } from "../../features/loading/loadingSlice";

const Manage = () => {
	const dispatch = useDispatch();

	const handleConfirmUser = () => {
		confirmAlert({
			title: "Confirm to initilize",
			message: "Are you sure to initilize uers",
			buttons: [
				{
					label: "Yes",
					onClick: () => handleInitializeUser(),
				},
				{
					label: "No",
					onClick: () => alert("Click No"),
				},
			],
		});
	};

	const handleInitializeUser = () => {
		dispatch(setLoading());
		dispatch(initializeUser());
		dispatch(clearLoading());
	};

	return (
		<div className='bg-gray-100 w-full lg:w-4/5 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12'>
			<div>
				<p className='font-raleway font-medium text-4xl py-4'>Our Donors</p>
				<hr className='w-full' />
			</div>
			<div className='flex py-12'>
				<button
					onClick={handleConfirmUser}
					className='px-6 py-2 rounded-md bg-gray-300'
				>
					Initialize Users
				</button>
			</div>
		</div>
	);
};

export default Manage;
