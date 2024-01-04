import api from "../utils/api";
import { setDonorInfo } from "../features/donorSlice";
import { clearLoading, setLoading } from "../features/loadingSlice";
import { setDonorAmount } from "../features/adminSlice";

export const initialDonors = (count) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await api.post("/donor/initial", { count }).then(() => {
      dispatch(clearLoading());
      dispatch(getDonorAmount());
    });
  } catch (e) {
    console.log(e);
  }
};

export const insertDonor = (donorData) => async (dispatch) => {
  dispatch(setLoading());

  try {
    // Make the API call and await for the resolved promise
    const res = await api.post("/donor/insert", donorData);

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
