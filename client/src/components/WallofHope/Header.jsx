import { memo, useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

import { setAlertWithTimeout } from "../../features/alertSlice";
import { logout } from "../../features/authSlice";

// import Icons
import { MdOutlineMenu } from "react-icons/md";
import { FaShare } from "react-icons/fa";

// import Images
import SupportWordIcon from "../../assets/img/WallofHope/share_icon.png";
import logoImg from "../../assets/img/logo.png";
import UserImg from "../../assets/img/user.png";

const Header = ({
  clearFilter,
  setIsShareModalOpen,
  onChangeSearchInput,
  setBuybrickModalInCenter,
  setIsWordsofSupportModalOpen,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { avatar } = useSelector((state) => state.auth);
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const userAvatar = avatar ? avatar : UserImg;

  // Initialize userId
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const { role } = jwtDecode(token);
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, [token]);

  const handleLogout = () => {
    // dispatch(clearAmount());
    dispatch(logout());
    clearFilter([]);
    const successAlert = {
      alertType: "success",
      content: "Successfully signed out",
    };
    dispatch(setAlertWithTimeout(successAlert));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleBuyBrickInCenter = () => {
    setBuybrickModalInCenter();
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="w-full flex justify-center md:justify-between px-4 sm:px-12 items-center py-2 border-b border-gray-100">
      {/*Logo*/}
      <div className="gap-4 hidden lg:flex items-center">
        <Link to="/" className="flex items-center w-16 h-12">
          <img
            src={logoImg}
            className="object-cover w-full max-w-none"
            alt="Logo"
          />
        </Link>
        <p className="text-xl lg:text-2xl font-medium font-raleway hidden xl:flex">
          Wall of Hope
        </p>
      </div>

      <div className="md:gap-3 flex flex-wrap justify-around md:px-6 mr-0 itmes-center">
        <div className="items-center mx-4 hidden lg:flex">
          <input
            type="search"
            className="border border-gray-400 rounded-full w-40 md:w-48 xl:w-56 px-4 py-1 lg:py-2 bg-white outline-none focus-visible:border-sky-700"
            placeholder="Search the Wall of Hope"
            onChange={(e) => onChangeSearchInput(e)}
          />
        </div>

        {/*Share*/}
        <span
          className=" rounded-full flex justify-center items-center sm:gap-1 p-2 cursor-pointer  hover:text-sky-700"
          onClick={() => setIsShareModalOpen(true)}
        >
          <FaShare className="w-6 sm:w-8 h-6 sm:h-8 text-gray-600 sm:mr-1" />
          <span className="text-sm sm:text-xl lg:font-simibold font-sans">
            SHARE
          </span>
        </span>

        {/*Words of Supports*/}
        {isAuthenticated && (
          <span
            className="rounded-full flex justify-center items-center sm:gap-1 sm:p-2 cursor-pointer  hover:text-sky-700"
            onClick={() => setIsWordsofSupportModalOpen(true)}
          >
            <img
              src={SupportWordIcon}
              className="w-7 sm:w-8 h-7 sm:h-8 rounded-full flex justify-center items-center cursor-pointer"
            />
            <span className="text-sm sm:text-xl lg:font-simibold font-sans">
              WORDS OF SUPPORT
            </span>
          </span>
        )}

        {/* Donatino Button  */}
        <Link
          onClick={handleBuyBrickInCenter}
          className="w-full sm:w-40 md:w-48 xl:w-56 h-10 sm:mx-0 bg-red-700 rounded-md font-medium text-white hover:bg-red-800  text-center lg:text-lg flex items-center self-center justify-center sm:ml-4 sm:my-1 py-1 order-5 sm:order-3"
        >
          SPONSOR A BRICK
        </Link>

        {/* User Avatar  */}
        <Menu
          as="div"
          className="relative flex justify-center itmes-center sm:order-4"
        >
          <Menu.Button className="btn rounded-full">
            <img
              src={userAvatar}
              className="w-8 h-8 hover:border-2 border-sky-700 rounded-full"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-18 md:right-0 top-12 z-10 mt-2 w-24 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {isAuthenticated ? (
                  <button
                    className={classNames(
                      "bg-gray-100 text-gray-900",
                      "block px-4 py-2 text-sm w-full rounded-md"
                    )}
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    className={classNames(
                      "text-gray-700",
                      "block px-4 py-2 text-sm w-full rounded-md"
                    )}
                    onClick={handleLogin}
                  >
                    Sign In
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>

        {/* Hambuger menu  */}
        <Menu
          as="div"
          className="relative flex justify-center itmes-center sm:order-5"
        >
          <Menu.Button className="w-10 md:w-12 h-10 md:h-12 btn btn-change px-1 rounded-full">
            <MdOutlineMenu className="w-full h-full text-gray-600 hover:text-sky-700 md:mt-0" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute w-44 flex flex-col items-center right-0 top-12 z-10 mt-2 p-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {userRole === 2 && (
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/admin"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full py-2 text-center text-sm"
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full py-2 text-center text-sm"
                    )}
                  >
                    Home
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/about"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full py-2 text-center text-sm"
                    )}
                  >
                    About Us
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/donors"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full py-2 text-center text-sm"
                    )}
                  >
                    Donors
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/beneficiaries"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full py-2 text-center text-sm"
                    )}
                  >
                    Beneficiaries
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/contact"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full py-2 text-center text-sm"
                    )}
                  >
                    Contact Us
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

Header.propTypes = {
  setIsShareModalOpen: PropTypes.func.isRequired,
  onChangeSearchInput: PropTypes.func.isRequired,
  setIsWordsofSupportModalOpen: PropTypes.func.isRequired,
  setBuybrickModalInCenter: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
