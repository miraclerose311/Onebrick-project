import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Menu, Transition } from '@headlessui/react';
import { logout } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import brickImage from '../assets/img/background.jpg';
import { brickIds } from '../utils';

const Buybrick = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Create bricks states
  const [bricks, setBricks] = useState([]);

  // Initialize bircks states
  useEffect(() => {
    const bricksStates = [];
    brickIds.forEach((id) => {
      const randomIndex = Math.floor(Math.random() * 3 + 1) * 100;
      bricksStates.push({
        id: id,
        sold: false,
        owner: false,
        color: randomIndex,
      });
    });
    setBricks(bricksStates);
  }, []);

  const containerRef = useRef();
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [imageNaturalWidth, setImageNaturalWidth] = useState(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState(0);

  const scaleUp = true;
  const src = brickImage;
  const zoomFactor = 8;

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

  const handleResize = useCallback(() => {
    if (containerRef !== null) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setContainerWidth(width);
      setContainerHeight(height);
    } else {
      setContainerWidth(0);
      setContainerHeight(0);
    }
  }, [containerRef]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const imageScale = useMemo(() => {
    if (
      containerWidth === 0 ||
      containerHeight === 0 ||
      imageNaturalWidth === 0 ||
      imageNaturalHeight === 0
    )
      return 0;
    const scale = Math.min(
      containerWidth / imageNaturalWidth,
      containerHeight / imageNaturalHeight
    );
    return scaleUp ? scale : Math.max(scale, 1);
  }, [
    scaleUp,
    containerWidth,
    containerHeight,
    imageNaturalWidth,
    imageNaturalHeight,
  ]);

  const handleImageOnLoad = (image) => {
    console.log('Natural Width => ', image.naturalWidth);
    setImageNaturalWidth(image.naturalWidth);
    setImageNaturalHeight(image.naturalHeight);
  };

  useEffect(() => {
    const image = new Image();
    image.onload = () => handleImageOnLoad(image);
    image.src = src;
  }, [src]);

  console.log(bricks);

  const renderBricks = () => {
    const colBricks = [];

    Array.from(Array(140).keys()).map((col) => {
      const colBrick = (
        <div key={col} className='flex flex-row w-full'>
          {Array.from(Array(250).keys()).map((row) => {
            const index = col * 250 + row;
            const id = brickIds[index];
            return (
              <button
                key={index}
                id={id}
                value={bricks[index]}
                className={
                  'border rounded-md w-5 h-5 ' +
                  (!bricks[index].sold && `bg-gray-${bricks[index].color}`)
                }
                onClick={(e) => handleBrickClicked(e)}
              />
            );
          })}
        </div>
      );
      colBricks.push(colBrick);
    });

    return colBricks;
  };

  const handleBrickClicked = (e) => {
    const id = e.target.id;
    console.log(id);
    setBricks((prev) => {
      const new_state = [...prev];
      return new_state.map((item) =>
        item.id === id ? { ...item, sold: true } : { ...item }
      );
    });
  };

  console.log(imageScale);
  console.log(containerWidth, containerHeight);
  console.log(imageNaturalWidth, imageNaturalHeight);

  return (
    <div className='text-center items-center h-screen min-w-[500px] bg-gary-500 w-full flex justify-center itmes-center'>
      <div className='fixed top-24 md:right-24 lg:right-48 xl:right-64 flex justify-around p-3 itmes-center min-w-[400px] z-10'>
        <Menu as='div' className='relative flex justify-center itmes-center'>
          <Menu.Button className='btn btn-change px-3 rounded-lg hover:border-2 hover:border-gray-500'>
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
      <div className='fixed bottom-48 w-full flex justify-center flex-col items-center z-10'>
        <div className='font-montserrat text-sky-500 font-bold'>
          17000 / 35000
        </div>
        <div className='w-1/2 md:w-1/3 lg:w-1/5 bg-gray-300 rounded-full h-2.5'>
          <div
            className='bg-sky-400 h-2.5 rounded-full'
            style={{ width: '45%' }}
          ></div>
        </div>
      </div>
      <div
        className='w-full h-full bg-gray-400 flex justify-center items-center'
        ref={containerRef}
      >
        {imageScale > 0 && (
          <TransformWrapper
            key={`${imageNaturalWidth}x${imageNaturalHeight}`}
            initialScale={imageScale}
            minScale={imageScale}
            maxScale={zoomFactor * imageScale}
            centerOnInit
            // onTransformed={(value) => console.log(value)}
            wheel={{ smoothStep: 0.004 }}
          >
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
            >
              <div className='relative'>
                <div className='absolute top-0 left-0 w-full h-full flex flex-col'>
                  {renderBricks()}
                </div>
                <img
                  src={src}
                  className='absoulte top-0 left-0 max-w-none'
                  style={{
                    width: `5000px`,
                    height: `2800px`,
                  }}
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>
    </div>
  );
};

export default Buybrick;
