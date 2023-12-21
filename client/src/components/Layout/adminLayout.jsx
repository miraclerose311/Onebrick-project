import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
	return (
		<div className='w-full h-[100vh] flex flex-wrap'>
			<Sidebar />
			<Outlet />
		</div>
	);
};

export default AdminLayout;
