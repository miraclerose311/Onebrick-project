import axios from "axios";

// Create an instance of axios

const api = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

export default api;
