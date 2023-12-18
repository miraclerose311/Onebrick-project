import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// Import custom page components
import About from "../pages/About";
import Beneficiaries from "../pages/Beneficiaries";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Buybrick from "../pages/Buybrick";
import Donors from "../pages/Donors";
import Landing from "../pages/Landing";
import Contact from "../pages/Contact";
import Loading from "../components/Loading";

// Import React toast for Alert
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const alert = useSelector((state) => state.alert);
	const { loading } = useSelector((state) => state.loading);

	useEffect(() => {
		if (alert.alertType)
			switch (alert.alertType) {
				case "success":
					toast.success(alert.content, {
						position: "top-right",
						autoClose: 2000,
					});
					break;
				case "error":
					toast.warn(alert.content, {
						position: "top-right",
					});
					break;
			}
	}, [alert]);

	return (
		<>
			<Loading loading={loading} />
			<ToastContainer />
			<Router>
				<Routes>
					<Route
						path="/"
						exact
						element={<Landing />}
					/>
					<Route
						path="/about"
						element={<About />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>
					<Route
						path="/beneficiaries"
						element={<Beneficiaries />}
					/>
					<Route
						path="/buybrick"
						element={<Buybrick />}
					/>
					<Route
						path="/donors"
						element={<Donors />}
					/>
					<Route
						path="/contact"
						element={<Contact />}
					/>
				</Routes>
			</Router>
		</>
	);
}
export default App;
