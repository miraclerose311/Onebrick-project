import api from "../utils/api";
import {
	setBricks,
	setBrick,
	setSoldAmount,
	setDedication,
} from "../features/brick/brickSlice";
import { clearLoading, setLoading } from "../features/loading/loadingSlice";
import { setSoldBrickAmount } from "../features/admin/adminSlice";

// getBricks is a Redux Thunk action creator. It returns a function that accepts `dispatch` as its argument.
export const getBricks = () => (dispatch) => {
	// Dispatch an action to set the loading state to true at the beginning of the operation.
	dispatch(setLoading());

	// Create promises for fetching data from two different API endpoints.
	const getBrickPromise = api.get("/brick/all");
	const getSoldAmountPromise = api.get("/brick/sold-amount");

	// Use Promise.all to process both promises concurrently.
	Promise.all([getBrickPromise, getSoldAmountPromise])
		.then((results) => {
			// Once both promises resolve, destructure their respective data.
			const bricksData = results[0].data;
			const soldAmountData = results[1].data;

			// Dispatch actions to update the Redux state with the fetched data.
			return Promise.all([
				dispatch(setSoldAmount(soldAmountData)),
				dispatch(setBricks(bricksData)),
			]);
		})
		.then(() => {
			// After the data has been successfully dispatched to the state, clear the loading state.
			dispatch(clearLoading());
		})
		.catch((error) => {
			// If any promise rejects, log the error and clear the loading state.
			console.error(error.message);
			dispatch(clearLoading());
		});
};

export const initialBricks = (count) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await api.post("/brick/initial", { count }).then(() => {
			dispatch(clearLoading());
			console.log("Successfully initialized");
		});
	} catch (e) {
		console.log(e);
	}
};

export const buyBrick = (brickData) => async (dispatch) => {
	dispatch(setLoading());
	await api
		.post("/brick/buy", brickData)
		.then((res) => {
			dispatch(setBrick(res.data));
			dispatch(clearLoading());
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getBrickSoldAmount = () => async (dispatch) => {
	try {
		dispatch(setLoading());
		await api
			.get("/brick/bricksoldamount")
			.then((res) => {
				dispatch(setSoldBrickAmount(res.data));
				dispatch(getBrickSoldAmount());
				dispatch(clearLoading());
			})
			.catch((err) => {
				console.log(err);
			});
	} catch (e) {
		console.log(e);
	}
};

export const addDedication = (dedicationData) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await api.post("/brick/add-dedication", dedicationData).then((res) => {
			dispatch(setDedication(res.data));
			dispatch(clearLoading());
		});
	} catch (e) {
		console.log(e);
	}
};
