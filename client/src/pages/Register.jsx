import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { googleRegister } from "../actions/auth";
import { setAlertWithTimeout } from "../features/alertSlice";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated } = useSelector((state) => state.auth);

	const onRegister = useGoogleLogin({
		onSuccess: (codeResponse) => {
			const { access_token } = codeResponse;
			dispatch(googleRegister(access_token));
		},
		onError: (error) => {
			const errorAlert = {
				alertType: "error",
				content: error,
			};
			dispatch(setAlertWithTimeout(errorAlert));
		},
	});

	useEffect(() => {
		if (isAuthenticated) {
			const successAlert = {
				alertType: "success",
				content: "Successfully signed in",
			};
			dispatch(setAlertWithTimeout(successAlert));
			navigate("/buybrick");
		}
	}, [isAuthenticated, navigate, dispatch]);

	return (
		<div className="h-screen items-center flex flex-col lg:flex-row justify-around px-10 font-raleway">
			<div className="grow-0 w-2/3 lg:w-1/2 lg:px-0 justify-around">
				<img
					src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
					className="w-full"
					alt="Register image"
				/>
			</div>

			<div className="w-2/3 lg:w-1/3 justify-center">
				{/* <form> */}
				<div className="flex flex-col items-center justify-center">
					<p className="text-4xl font-montserrat mb-4">Sign Up</p>
					<p className="text-lg">
						Create an account to unlock exclusive features.
					</p>
				</div>
				<button
					className="flex justify-center w-full border border-gray-500 rounded-lg py-2 my-4"
					onClick={() => onRegister()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="24"
						height="24"
						viewBox="0 0 48 48"
					>
						<path
							fill="#fbc02d"
							d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
						></path>
						<path
							fill="#e53935"
							d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
						></path>
						<path
							fill="#4caf50"
							d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
						></path>
						<path
							fill="#1565c0"
							d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
						></path>
					</svg>
					&nbsp;Sign Up with Google
				</button>
				<div className="flex justify-center">
					<div className="my-4 flex justify-center items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 w-1/2">
						<p className="mx-4 mb-0 text-center font-semibold">or</p>
					</div>
				</div>
				<div>
					<input
						type="name"
						className="block min-h-[auto] w-full bg-transparent px-3 border border-gray-500 rounded-lg py-2 my-4 text-gray-700 outline-none"
						id="name"
						placeholder="Full name"
					/>
					<input
						type="email"
						className="block min-h-[auto] w-full bg-transparent px-3 border border-gray-500 rounded-lg py-2 my-4 text-gray-700 outline-none"
						id="email"
						placeholder="Email address"
					/>
					<input
						type="password"
						className="block min-h-[auto] w-full bg-transparent px-3 border border-gray-500 rounded-lg py-2 my-4 text-gray-700 outline-none"
						id="password"
						placeholder="Password"
					/>
				</div>

				<div className="w-full">
					<button
						type="button"
						className="rounded-lg bg-sky-500 w-full py-2 my-4 text-gray-50"
					>
						Sign Up
					</button>

					<p className="mb-0 mt-2 pt-1 text-md font-semibold text-center">
						Already have an account?&nbsp;
						<Link
							to="/login"
							className="text-danger text-sky-500 hover:underline"
						>
							Sign In
						</Link>
					</p>
				</div>
				{/* </form> */}
			</div>
		</div>
	);
};

export default Register;
