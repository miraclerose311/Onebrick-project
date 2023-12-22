import api from "../utils/api";
import { setDonorInfo } from "../features/donor/donorSlice";
import { clearLoading, setLoading } from "../features/loading/loadingSlice";

export const initialDonors = (count) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await api.post("/donor/initial", { count }).then(() => {
			dispatch(clearLoading());
			console.log("Successfully initialized");
		});
	} catch (e) {
		console.log(e);
	}
};

export const insertDonor = (donoData) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await api.post("/donor/insert", donoData).then(() => {
			dispatch(clearLoading());
		});
	} catch (e) {
		console.log(e);
	}
};

export const getDonor = (user) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await api
			.post("/donor/get-donor", user)
			.then((res) => {
				dispatch(setDonorInfo(res.data));
				dispatch(clearLoading());
			})
			.catch((e) => console.log(e));
	} catch (e) {
		console.log(e);
	}
};
