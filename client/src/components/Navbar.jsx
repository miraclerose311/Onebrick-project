import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { logout } from '../features/auth/authSlice';

// import Dropdown from './Dropdown';
import logoImg from '../assets/img/logo.png';
import UserImg from '../assets/img/user.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log('isAuthenticated => ', isAuthenticated);

  // const onBuybrick = () => {
  //   if (isAuthenticated) {
  //     navigate('/buybrick');
  //   } else {
  //     navigate('/login');
  //   }
  // };

  const onLogout = () => {
    dispatch(logout());
  };

  const DropdownNavbar = () => (
    <div className='text-center flex flex-col md:hidden '>
      <button className='py-2 text-lg hover:font-bold'>
        <Link to='/'>HOME</Link>
      </button>
      <button className='py-2 text-lg hover:font-bold'>
        <Link to='/about'>ABOUT ALPHA</Link>
      </button>
      <button className='py-2 text-lg hover:font-bold'>
        <Link to='/donors'>DONORS</Link>
      </button>
      <button className='py-2 text-lg hover:font-bold'>
        <Link to='/beneficiaries'>BENEFICIARIES</Link>
      </button>
      <button className='py-2 text-lg hover:font-bold'>
        <Link to='/contact'>CONTACT US</Link>
      </button>
    </div>
  );

  return (
    <nav className='bg-transparent z-20 start-0 border-b border-gray-200 px-2 xl:px-10 text-left'>
      <div className='flex flex-row items-center justify-around mx-auto p-4'>
        <Link to='/' className='items-center h-20 w-44'>
          <img src={logoImg} className='h-20 w-40 max-w-none' alt='Logo' />
        </Link>
        <div className='flex flex-row items-center md:right justify-center'>
          <ul className='hidden lg:flex lg:flex-row lg:justify-center p-2 mr-2 xl:mr-8 rounded-lg md:p-0 items-center'>
            <li>
              <Link
                to='/'
                className='block py-2 text-gray-700 hover:decoration-2 hover:underline rounded text-lg mx-2 lg:mx-4'
                aria-current='page'
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='block py-2 text-gray-700 hover:decoration-2 hover:underline rounded text-lg mx-2 lg:mx-4'
                aria-current='page'
              >
                ABOUT ALPHA
              </Link>
            </li>
            <li>
              <Link
                to='/donors'
                className='block py-2 text-gray-700 hover:decoration-2 hover:underline rounded text-lg mx-2 lg:mx-4'
                aria-current='page'
              >
                DONORS
              </Link>
            </li>
            <li>
              <Link
                to='/beneficiaries'
                className='block py-2 text-gray-700 hover:decoration-2 hover:underline rounded text-lg mx-2 lg:mx-4'
                aria-current='page'
              >
                BENEFICIARIES
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='block py-2 text-gray-700 hover:decoration-2 hover:underline rounded text-lg mx-2 lg:mx-4'
                aria-current='page'
              >
                CONTACT US
              </Link>
            </li>
          </ul>
          <button
            data-collapse-toggle='navbar-sticky'
            type='button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='inline-flex items-center p-1 w-10 h-10 justify-center text text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 mr-8'
            aria-controls='navbar-sticky'
            aria-expanded='false'
          >
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
          <Link
            to='/buybrick'
            type='button'
            className='text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 text-center'
          >
            WALL OF HOPE
          </Link>

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
      </div>
      {isMenuOpen && DropdownNavbar()}
    </nav>
  );
}
