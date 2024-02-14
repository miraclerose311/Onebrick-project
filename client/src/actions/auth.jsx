import api from "../utils/api";
import { login } from "../features/authSlice";
import { clearLoading, setLoading } from "../features/loadingSlice";
import { setAlertWithTimeout, setAlert } from "../features/alertSlice";
import { setUser } from "../features/userSlice";

export const googleRegister = (access_token) => async (dispatch) => {
	dispatch(setLoading());
	await api
		.post("/auth/google-register", JSON.stringify({ access_token }))
		.then((res) => {
			dispatch(login(res.data));
		})
		.catch((e) => {
			if (e.response.data["Error"] == "This user already exists") {
				const newAlert = {
					alertType: "error",
					content: "This user already exists",
				};
				dispatch(setAlert(newAlert));
			} else {
				// window.alert("Some error ocurred");
				const newAlert = {
					alertType: "error",
					content: "This user already exists",
				};
				dispatch(setAlert(newAlert));
			}
		});
	dispatch(clearLoading());
};

export const googleLogin = (access_token) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const res = await api.post(
			"/auth/google-login",
			JSON.stringify({ access_token })
		);
		dispatch(login(res.data));
	} catch (e) {
		if (e.response.data["Error"] == "This user does not exists") {
			const newAlert = {
				alertType: "error",
				content: "This user does not exists",
			};
			dispatch(setAlertWithTimeout(newAlert));
		} else {
			const newAlert = {
				alertType: "error",
				content: "An error is ocurred",
			};
			dispatch(setAlertWithTimeout(newAlert));
		}
	}
	dispatch(clearLoading());
};

export const getUser = (userId) => async (dispatch) => {
	await api
		.post("/users/byId", { userId })
		.then((res) => {
			// return res.data;
			dispatch(setUser(res.data));
		})
		.catch((e) => console.log(e));
};
