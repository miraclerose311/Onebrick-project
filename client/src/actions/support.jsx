import api from "../utils/api";
// import { clearLoading, setLoading } from "../features/loadingSlice";
import { setSupportWords, setSupportWord } from "../features/supportSlice";
import { setAlert } from "../features/alertSlice";

export const insertWord = (data) => async (dispatch) => {
	// dispatch(setLoading());
	try {
		const res = await api.post("/supportWord/insert", data);
		dispatch(setSupportWord(res.data));
		dispatch(
			setAlert({
				alertType: "success",
				content: "Support word inserted successfuly.",
			})
		);
	} catch (e) {
		dispatch(
			setAlert({
				alertType: "error",
				content: "Failed to insert support word.", // Display an error message
			})
		);
	}
	// dispatch(clearLoading());
};

export const getWords = () => async (dispatch) => {
  // dispatch(setLoading());
  try {
    // Make the API call and await for the resolved promise
    const res = await api.get("/supportWord/get");
    dispatch(setSupportWords(res.data));
    // If the API call is successful, log the response and clear the loading state
  } catch (error) {
    // If there is an error, alert the user
    alert(error);
  } finally {
    // Clear the loading state whether the API call was successful or not
    // dispatch(clearLoading());
  }
};
