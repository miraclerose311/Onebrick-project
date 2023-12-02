import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import brickImage from '../assets/img/alpha_building_high_res.jpg';
import { brickIds } from '../utils';

import UserImg from '../assets/img/user.png';
import './Modal.css';
import First from '../components/modals/First';
import DonorInformation from '../components/modals/Donor_info';
import DonorAddress from '../components/modals/Donor_address';
import Video from '../components/modals/Video';
import DedicationForm from '../components/modals/Dedication_form';
import DedicationConfirm from '../components/modals/Dedication_confirm';
import { set } from 'mongoose';

const Buybrick = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log('isAuthenticated => ', isAuthenticated);

  // Create bricks states
  const [bricks, setBricks] = useState([]);
  const [clickedId, setClickedId] = useState(null);

  // Initialize bircks states
  useEffect(() => {
    const bricksStates = [];
    brickIds.forEach((id) => {
      bricksStates.push({
        id: id,
        sold: false,
        owner: false,
        clicked: false,
      });
    });
    setBricks(bricksStates);
    useCallback;
  }, []);

  // Initialize container and image states
  const containerRef = useRef();

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [imageNaturalWidth, setImageNaturalWidth] = useState(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState(0);

  // Initialize zoom in and out variables
  const scaleUp = true;
  const src = brickImage;
  const zoomFactor = 8;

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

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
    setImageNaturalWidth(image.naturalWidth);
    setImageNaturalHeight(image.naturalHeight);
  };

  useEffect(() => {
    const image = new Image();
    image.onload = () => handleImageOnLoad(image);
    image.src = src;
  }, [src]);

  const handleBrickDown = (e) => {
    const id = e.target.id;
    setClickedId(id);
  };

  useEffect(() => {
    setBricks((prev) => {
      const new_state = [...prev];
      return new_state.map((item) =>
        item.id === clickedId
          ? { ...item, clicked: true }
          : { ...item, clicked: false }
      );
    });

  }, [clickedId]);

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
                className={classNames(
                  'border rounded-md w-5 h-5',
                  bricks[index].clicked ? 'bg-yellow-500' : 'bg-gray-100',
                  bricks[index].sold && 'opacity-0'
                )}
                onMouseDown={handleBrickDown}
              />
            );
          })}
        </div>
      );
      colBricks.push(colBrick);
    });

    return colBricks;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(0);

  const modalRef = useRef(null);

  const handleClick = (e) => {

    // Get the position of the clicked point
    const x = e.clientX;
    const y = e.clientY;

    // Set the position of the modal relative to the clicked point
    setModalPosition({ x: x + 10, y: y + 10 });
    if (x > 1000) setModalPosition({ x: x - 220, y: y });
    if (y > 600) setModalPosition({ x: x, y: y - 300 });

    // Open the modal
    setIsModalOpen(true);
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    //Close modal when right clicked
    setIsModalOpen(false)
    setClickedId(null)
  }

  const handleMouseDown = () => {
    setIsModalOpen(false);
  };

  const handleBuyButtonClicked = () => {
    setIsSlideModalOpen(true);
    setModalContent(1);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsSlideModalOpen(false);
    setAmount(1);
  };

  const handlePreviousModal = () => {
    setModalContent(modalContent - 1)
  }

  const handleNextModal = () => {
    setModalContent(modalContent + 1);
  };

  const handlePaymentModal = () => {
    setIsSlideModalOpen(false);
    setBricks((prev) => {
      const new_state = [...prev];
      return new_state.map((item) =>
        item.id === clickedId ? { ...item, sold: true } : { ...item }
      );
    });
    setIsModalOpen(false);
    setAmount(1);
  };

  return (
    <div className='text-center items-center h-screen min-w-[500px] bg-gray-600 w-full flex itmes-center sm:justify-center'>
      <div className='fixed top-12 right-32 sm:right-8 md:right-12 lg:right-18 xl:right-24 flex justify-around p-3 itmes-center min-w-[400px] z-10'>
        <Menu as='div' className='relative flex justify-center itmes-center'>
          <Menu.Button className='btn btn-change px-3 rounded-lg hover:border-2 hover:border-sky-400'>
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
            className='border-2 border-gray-400 rounded-full w-[240px] h-10 px-4 py-2 bg-gray-200 outline-none focus-visible:border-sky-400'
            placeholder='Search the Wall of Hope'
          />
        </div>
        {/* <Menu as='div' className='relative flex justify-center itmes-center'>
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
        </Menu> */}
        <Link className='ml-2' to='#'>
          <img
            src={UserImg}
            className='h-10 hover:border-2 border-sky-400 rounded-full'
          />
        </Link>
      </div>
      <div className='fixed left-32 bottom-16 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 flex flex-col items-center z-10'>
        <div className='font-montserrat text-sky-500 font-bold'>
          17000 / 35000
        </div>
        <div className='w-full bg-gray-300 rounded-full h-2.5'>
          <div
            className='bg-sky-400 h-2.5 rounded-full'
            style={{ width: '45%' }}
          ></div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className='border border-gray-600 bg-gray-200 opacity-80 absolute px-4 py-8 w-52 h-72 flex flex-col justify-center items-center z-30'
          ref={modalRef}
          style={{
            left: modalPosition.x,
            top: modalPosition.y,
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.7)',
          }}
        >
          <p className='font-lg py-2 font-bold font-montserrat'>{clickedId}</p>
          <p className='font-raleway pb-2'>
            Buy this Brick and Save a Life. Click on this box to dedicate your
            support and help us build a sanctuary of care for those in need.
          </p>
          <button
            className='text-gray-100 bg-red-700 px-4 py-2 rounded-md'
            onClick={handleBuyButtonClicked}
          >
            BUY THIS BRICK
          </button>
        </div>
      )}
      {isSlideModalOpen && modalContent !== 0 && (
        <div className='modal'>
          <div className='modal-content flex-col flex justify-center items-center relative'>
            <button
              className='modal-previous-button text-4xl'
              onClick={handlePreviousModal}
            >
              &#8592;
            </button>
            <button
              className='modal-close-button text-4xl'
              onClick={handleCloseModal}
            >
              &times;
            </button>
            {modalContent === 1 && <First handleNextModal={handleNextModal} />}
            {modalContent === 2 && <DonorInformation handleNextModal={handleNextModal} />}
            {modalContent === 3 && <DonorAddress handleNextModal={handleNextModal} />}
            {modalContent === 4 && <Video handleNextModal={handleNextModal} />}
            {modalContent === 5 && <DedicationForm handleNextModal={handleNextModal} />}
            {modalContent === 6 && <DedicationConfirm handleNextModal={handleNextModal} />}

          </div>
        </div>
      )}
      <div
        className='w-full h-full bg-gray-400 flex justify-center items-center relative'
        ref={containerRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
      >
        {imageScale > 0 && (
          <TransformWrapper
            key={`${imageNaturalWidth}x${imageNaturalHeight}`}
            initialScale={1}
            minScale={imageScale}
            maxScale={zoomFactor * imageScale}
            centerOnInit
            wheel={{ smoothStep: 0.004 }}
          >
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%',
              }}
            >
              <div className='relative' onClick={handleClick}>
                <div className='absolute top-0 left-0 w-full h-full flex flex-col'>
                  {renderBricks()}
                </div>
                <img
                  src={brickImage}
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
    </div >
  );
};

export default Buybrick;
