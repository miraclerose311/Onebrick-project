import { useState } from 'react';
import { Link } from 'react-router-dom';

import logoImg from "../assets/img/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const DropdownNavbar = () => (
    <div className="text-center flex flex-col bg-gray-300 absolute p-8 top-12 rounded-md opacity-90 text-gray-700">
      <button className="py-2 text-lg hover:font-medium">
        <Link to="/">HOME</Link>
      </button>
      <button className="py-2 text-lg hover:font-medium">
        <Link to="/about">ABOUT US</Link>
      </button>
      <button className="py-2 text-lg hover:font-medium">
        <Link to="/donors">DONORS</Link>
      </button>
      <button className="py-2 text-lg hover:font-medium">
        <Link to="/beneficiaries">BENEFICIARIES</Link>
      </button>
      <button className="py-2 text-lg hover:font-medium">
        <Link to="/contact">CONTACT US</Link>
      </button>
    </div>
  );

  return (
    <nav className="bg-transparent z-20 start-0 px-8 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-56 text-left absolute w-full">
      <div className="flex flex-row justify-between items-center py-4">
        <Link to="/" className="flex items-center w-32 h-16 xl:h-20 xl:w-36">
          <img
            src={logoImg}
            className="object-cover w-full max-w-none"
            alt="Logo"
          />
        </Link>
        <div className="flex items-center relative">
          <ul className="hidden lg:flex items-center 2xl:pr-4 lg:text-lg xl:text-xl 2xl:text-xl font-medium">
            <li className="flex mr-6">
              <Link
                to="/"
                className="block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold duration-100 ease-in-out growable-underline"
              >
                Home
              </Link>
            </li>
            <li className="flex mr-6">
              <Link
                to="/about"
                className="block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold duration-100 ease-in-out growable-underline"
                aria-current="page"
              >
                About
              </Link>
            </li>
            <li className="flex mr-6">
              <Link
                to="/donors"
                className="block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold duration-100 ease-in-out growable-underline"
                aria-current="page"
              >
                Donors
              </Link>
            </li>
            <li className="flex mr-6">
              <Link
                to="/beneficiaries"
                className="block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold duration-100 ease-in-out growable-underline"
                aria-current="page"
              >
                Beneficiaries
              </Link>
            </li>
            <li className="flex mr-6">
              <Link
                to="/contact"
                className="block py-2 font-raleway text-gray-700 hover:scale-110 hover:font-bold duration-100 ease-in-out growable-underline"
                aria-current="page"
              >
                Contact
              </Link>
            </li>
          </ul>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative inline-flex items-center  ml-auto p-1 justify-center text text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 mr-6 ml-6 sm:mr-10 md:mr-12 lg:mr-8"
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
          <Link
            to="/buybrick"
            type="button"
            className=" text-white lg:ml-auto text-sm px-4 md:text-md lg:text-md xl:text-lg 2xl:text-xl bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md py-2 lg:px-4 lg:py-2 xl:px-6 xl:py-2 text-center"
          >
            WALL OF HOPE
          </Link>
        </div>
      </div>
    </nav>
  );
}
