import api from "../utils/api";
import { setDonorInfo } from "../features/donor/donorSlice";
import { clearLoading, setLoading } from "../features/loading/loadingSlice";
import { setDonorAmount } from "../features/admin/adminSlice";

export const initialDonors = (count) => async (dispatch) => {
	try {
		dispatch(setLoading());
		await api.post("/donor/initial", { count }).then(() => {
			dispatch(clearLoading());
			dispatch(getDonorAmount());
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

export const getDonorAmount = () => async (dispatch) => {
	try {
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
	} catch (e) {
		console.log(e);
	}
};
