import { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { logout } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Buybrick = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='text-center flex justify-center items-center h-screen'>
      <div className='fixed top-24 md:right-24 lg:right-48 xl:right-64 flex justify-around p-3 itmes-center'>
        <Menu as='div' className='relative flex justify-center itmes-center'>
          <Menu.Button className='btn btn-change border-2 border-white px-3 rounded-lg hover:border-gray-500'>
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
            <Menu.Items className='absolute left-0 top-12 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/'
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-left text-sm'
                      )}
                    >
                      Home
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/about'
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-left text-sm'
                      )}
                    >
                      About Us
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/beneficiaries'
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-left text-sm'
                      )}
                    >
                      Beneficiaries
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/contact'
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-left text-sm'
                      )}
                    >
                      Contact Us
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <div className='flex items-center mx-4'>
          <input
            type='search'
            className='border-2 border-gray-400 rounded-full w-[240px] h-10 px-4 py-2 bg-gray-200 outline-none focus-visible:border-gray-500'
            placeholder='Search the Wall of Hope'
          />
        </div>

        <Menu as='div' className='relative flex justify-center itmes-center'>
          <Menu.Button className='btn btn-change border-gray-500'>
            <span className='w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-gray-100 text-lg shadow-lg shadow-gray-400 hover:border-2 hover:border-gray-700 border-gray-800'>
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
            <Menu.Items className='absolute right-0 top-12 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href='#'
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
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
      </div>
      <div className='text-3xl font-montserrat font-bold'>Buybrick Page</div>
    </div>
  );
};

export default Buybrick;
