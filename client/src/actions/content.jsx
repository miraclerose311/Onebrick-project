import api from "../utils/api";
import { clearLoading, setLoading } from "../features/loadingSlice";
import { setContents } from "../features/contentSlice";

export const updateContent = (contentData) => async (dispatch) => {
  dispatch(setLoading());
  await api
    .post("/content/update", contentData)
    .then(() => {
      console.log("Updated Content Successfully!");
    })
    .catch((e) => {
      console.log(e);
    });
  dispatch(clearLoading());
};

export const getContents = () => async (dispatch) => {
  dispatch(setLoading());
  await api
    .get("/content/getContents")
    .then((res) => {
      dispatch(setContents(res.data));
    })
    .catch((e) => {
      console.log(e);
    });
  dispatch(clearLoading());
};
