import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "../Layout/Navbar";

const AdminLayout = () => {
	return (
    <div className="w-full h-[100vh] flex flex-wrap">
      <div className="hidden lg:flex lg:flex-col lg:w-1/5 bg-[#32363f] shadow-xl shadow-gray-900 text-white items-center">
        <Sidebar />
      </div>
      <div className="w-full bg-gray-100 lg:w-4/5 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12">    
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
