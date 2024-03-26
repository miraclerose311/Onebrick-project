import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import logoImg from "../../assets/img/logo.png";
import { FaShare } from "react-icons/fa";
import SharingModal from "../modals/SharingModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const [userRole, setUserRole] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      const { role } = jwtDecode(token);
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, [token]);

  const DropdownNavbar = () => (
    <div
      className="text-center flex flex-col bg-gray-300 shadow-md shadow-gray-500 absolute py-4 top-12 rounded-md opacity-90 text-gray-700"
      style={{ zIndex: 999 }}
    >
      {userRole === 2 && (
        <button className="px-8 py-2 text-lg hover:font-medium hover:bg-sky-100">
          <NavLink to="/admin">Dashboard</NavLink>
        </button>
      )}
      <button className="px-8 py-2 text-lg hover:font-medium hover:bg-sky-100">
        <NavLink to="/">HOME</NavLink>
      </button>
      <button className="px-8 py-2 text-lg hover:font-medium hover:bg-sky-100">
        <NavLink to="/about">ABOUT US</NavLink>
      </button>
      <button className="px-8 py-2 text-lg hover:font-medium hover:bg-sky-100">
        <NavLink to="/donors">DONORS</NavLink>
      </button>
      <button className="px-8 py-2 text-lg hover:font-medium hover:bg-sky-100">
        <NavLink to="/contact">CONTACT US</NavLink>
      </button>
    </div>
  );

  // const [isShareMOdalOpen, setIsShareModalOpen] = useState(false);

  return (
    <nav className="bg-transparent z-20 start-0 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 2xl:px-64 text-left absolute w-full">
      <div className="flex flex-row justify-between items-center py-4">
        <NavLink to="/" className="flex items-center w-32 h-16 xl:h-20 xl:w-36">
          <img
            src={logoImg}
            className="object-cover w-full max-w-none"
            alt="Logo"
          />
        </NavLink>
        <div className="flex items-center relative">
          <ul className="hidden lg:flex items-center 2xl:pr-4 lg:text-md xl:text-lg 2xl:text-xl font-medium">
            <li className="px-8">
              <span
                className=" rounded-full flex justify-center items-center cursor-pointer  hover:text-sky-700"
                onClick={() => setIsShareModalOpen(true)}
              >
                <FaShare className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 sm:mr-1" />
                <span className="text-xs sm:text-sm md:text-md xl:text-lg lg:font-simibold font-sans">
                  SHARE
                </span>
              </span>
            </li>

            {userRole === 2 && (
              <li className="flex mr-6">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    "block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold growable-underline" +
                    (isActive ? " active-underline" : "")
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            <li className="flex mr-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold growable-underline" +
                  (isActive ? " active-underline" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="flex mr-6">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  "block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold growable-underline" +
                  (isActive ? " active-underline" : "")
                }
              >
                About
              </NavLink>
            </li>
            <li className="flex mr-6">
              <NavLink
                to="/donors"
                className={({ isActive }) =>
                  "block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold growable-underline" +
                  (isActive ? " active-underline" : "")
                }
              >
                Donors
              </NavLink>
            </li>
            <li className="flex mr-6">
              <NavLink
                to="/beneficiaries"
                className={({ isActive }) =>
                  "block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold growable-underline" +
                  (isActive ? " active-underline" : "")
                }
              >
                Beneficiaries
              </NavLink>
            </li>
            <li className="flex mr-6">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  "block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold growable-underline" +
                  (isActive ? " active-underline" : "")
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative inline-flex items-center p-1 justify-center text text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 mr-6 ml-6 sm:mr-10 md:mr-12 lg:mr-8"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <svg
              className="w-8 h-8"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
            {isMenuOpen && DropdownNavbar()}
          </button>
          <NavLink
            to="/buybrick"
            type="button"
            className="w-36 lg:w-44 overflow-hidden text-white text-md xl:text-lg 2xl:text-xl bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-4 py-2 text-center"
          >
            WALL OF HOPE
          </NavLink>
          {isShareModalOpen && (
            <SharingModal hideModal={() => setIsShareModalOpen(false)} />
          )}
        </div>
      </div>
    </nav>
  );
}
