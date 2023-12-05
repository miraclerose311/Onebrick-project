/** @format */

import api from "../utils/api";
import {
	setBricks,
	soldBrick,
	setSoldAmount,
} from "../features/brick/brickSlice";

export const getBricks = () => async (dispatch) => {
	try {
		await api.get("/brick/all").then((res) => {
			dispatch(setBricks(res.data));
		});
	} catch (e) {
		console.log(e);
	}
};

export const initialBricks = () => async (dispatch) => {
	try {
		await api.post("/brick/initial").then((res) => {
			console.log("Success!");
		});
	} catch (e) {
		// if (e.response.data['Error'] == 'This user already exists') {
		console.log(e);
	}
};

export const soldAmout = () => async (dispatch) => {
	try {
		await api.get("/brick/sold_amount").then((res) => {
			dispatch(setSoldAmount(res.data));
		});
	} catch (e) {
		console.log(e);
	}
};

export const buy = (brick_id, user, amount, index) => async (dispatch) => {
	try {
		await api
			.post("/brick/buy", { brick_id, user, amount })
			.then((res) => {
				dispatch(soldBrick({ todo: res.data, index }));
			})
			.catch((err) => {
				console.log(err);
			});
	} catch (e) {
		console.log(e);
	}
};

export const insertDedication = (dedication) => async (dispatch) => {
	try {
		await api.post("/brick/dedication_insert", dedication).then((res) => {
			console.log(res.data);
		});
	} catch (e) {
		console.log(e);
	}
};
