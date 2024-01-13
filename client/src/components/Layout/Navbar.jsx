import { useState } from "react";
import { NavLink } from "react-router-dom";

import logoImg from "../../assets/img/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const DropdownNavbar = () => (
    <div className="text-center flex flex-col bg-gray-300 shadow-md shadow-gray-500 absolute py-4 top-12 rounded-md opacity-90 text-gray-700">
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
        <NavLink to="/beneficiaries">BENEFICIARIES</NavLink>
      </button>
      <button className="px-8 py-2 text-lg hover:font-medium hover:bg-sky-100">
        <NavLink to="/contact">CONTACT US</NavLink>
      </button>
    </div>
  );

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
          <ul className="hidden lg:flex items-center 2xl:pr-4 lg:text-lg xl:text-xl 2xl:text-xl font-medium">
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
            className="w-36 overflow-hidden text-white text-md bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-4 py-2 text-center"
          >
            WALL OF HOPE
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
