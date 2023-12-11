import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logoImg from "../assets/img/logo1.png";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { isAuthenticated } = useSelector((state) => state.auth);

	console.log("isAuthenticated => ", isAuthenticated);

	const DropdownNavbar = () => (
		<div className="text-center flex flex-col bg-gray-100 absolute p-8 top-12 rounded-md opacity-90">
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
		<nav className="bg-transparent z-20 start-0  px-12 sm:px-16 md:px-24 lg:px-24 xl:px-48 2xl:px-64  text-left absolute w-full">
			<div className="flex flex-row justify-between items-center py-4">
				<Link
					to="/"
					className="items-center w-32 h-16 xl:h-20 xl:w-36"
				>
					<img
						src={logoImg}
						className="object-cover w-full max-w-none"
						alt="Logo"
					/>
				</Link>
				<div className="flex items-center relative">
					<ul className="hidden lg:flex items-center 2xl:pr-4">
						<li className="flex mr-6">
							<Link
								to="/"
								className="block py-2 text-gray-700 hover:decoration-2 hover:underline lg:text-lg xl:text-xl 2xl:text-2xl font-medium"
							>
								HOME
							</Link>
						</li>
						<li className="flex mr-6">
							<Link
								to="/about"
								className="block py-2 text-gray-700 hover:decoration-2 hover:underline lg:text-lg xl:text-xl 2xl:text-2xl font-medium"
								aria-current="page"
							>
								ABOUT
							</Link>
						</li>
						<li className="flex mr-6">
							<Link
								to="/donors"
								className="block py-2 text-gray-700 hover:decoration-2 hover:underline lg:text-lg xl:text-xl 2xl:text-2xl font-medium"
								aria-current="page"
							>
								DONORS
							</Link>
						</li>
						<li className="flex mr-6">
							<Link
								to="/beneficiaries"
								className="block py-2 text-gray-700 hover:decoration-2 hover:underline lg:text-lg xl:text-xl 2xl:text-2xl font-medium"
								aria-current="page"
							>
								BENEFICIARIES
							</Link>
						</li>
						<li className="flex mr-6">
							<Link
								to="/contact"
								className="block py-2 text-gray-700 hover:decoration-2 hover:underline lg:text-lg xl:text-xl 2xl:text-2xl font-medium"
								aria-current="page"
							>
								CONTACT
							</Link>
						</li>
					</ul>
					<button
						data-collapse-toggle="navbar-sticky"
						type="button"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="relative inline-flex items-center  ml-auto p-1 justify-center text text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 mr-6 sm:mr-10 md:mr-12 lg:mr-8"
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
						className=" text-white lg:ml-auto  text-xl md:text-md lg:text-md xl:text-lg 2xl:text-xl bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-6 py-3 lg:px-3 lg:py-1 xl:px-6 xl:py-3 text-center"
					>
						WALL OF HOPE
					</Link>
				</div>

				{/* {!isAuthenticated ? (
            <Link className='ml-4' to='/register'>
              <img
                src={UserImg}
                className='h-8 hover:border-2 border-gray-400 rounded-full'
              />
            </Link>
          ) : (
            <Menu as='div' className='relative inline-block text-left'>
              <Menu.Button className='mx-4 btn btn-change border-gray-800'>
                <span className='w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-gray-100 text-lg shadow-lg shadow-gray-400 focus:border-2 hover:border-3 hover:border-gray-700 border-gray-800'>
                  P
                </span>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm text-left'
                          )}
                        >
                          Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block w-full px-4 py-2 text-left text-sm'
                          )}
                          onClick={onLogout}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )} */}
			</div>
		</nav>
	);
}
