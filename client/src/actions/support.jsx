import api from "../utils/api";
import { setCurrentDonors, setDonorInfo } from "../features/donorSlice";
import { clearLoading, setLoading } from "../features/loadingSlice";
import { setDonorAmount } from "../features/adminSlice";
import { setSupportWords } from "../features/supportSlice";

export const insertWord = (data) => async (dispatch) => {
	dispatch(setLoading());
	try {
		await api.post("/supportWord/insert", data);
	} catch (e) {
		console.log(e);
	}
	dispatch(clearLoading());
};

export const getWords = () => async (dispatch) => {
	dispatch(setLoading());
	try {
		// Make the API call and await for the resolved promise
		const res = await api.get("/supportWord/get");
		dispatch(setSupportWords(res.data));
		// If the API call is successful, log the response and clear the loading state
		console.log(res);
	} catch (error) {
		// If there is an error, alert the user
		alert(error);
	} finally {
		// Clear the loading state whether the API call was successful or not
		dispatch(clearLoading());
	}
};

export const getDonor = (user) => async (dispatch) => {
	dispatch(setLoading());
	await api
		.post("/donor/get-donor", user)
		.then((res) => {
			dispatch(setDonorInfo(res.data));
			dispatch(clearLoading());
		})
		.catch((e) => console.log(e));
};

export const getCurrentDonors = () => async (dispatch) => {
	dispatch(setLoading());
	await api
		.get("/donor/current-donors")
		.then((res) => {
			dispatch(setCurrentDonors(res.data));
		})
		.catch((e) => console.log(e));
	dispatch(clearLoading());
};

export const getDonorAmount = () => async (dispatch) => {
	dispatch(setLoading());
	await api
		.get("/donor/donorcount")
		.then((res) => {
			dispatch(setDonorAmount(res.data));
			dispatch(clearLoading());
		})
		.catch((err) => {
			console.log(err);
		});
};
