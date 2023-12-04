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
import { useDispatch, useSelector } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import brickImage from '../assets/img/alpha_building_high_res.jpg';
import { brickIds } from '../utils';

import CircularProgress from '@mui/material/CircularProgress';
import { Oval } from 'react-loader-spinner'

import { logout } from '../features/auth/authSlice'

//modal components and css, icons
import Enter from '../components/modals/Enter';
import DonorInformation from '../components/modals/Donorinfo';
import DonorAddress from '../components/modals/Donoraddress';
import Video from '../components/modals/Video';
import DedicationForm from '../components/modals/Dedicationform';
import DedicationConfirm from '../components/modals/Dedicationconfirm';
import UserImg from '../assets/img/user.png';
import './Modal.css';
import '../index.css'

//icons
import { TiArrowLeftThick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { FcMenu } from "react-icons/fc";
import { getBricks, buy } from '../actions/brick';
import BuyBrick from '../components/modals/BuyBrick';
import BrickInfo from '../components/modals/BrickInfor';
import ProgressBar from '../components/ProgressBar'

const Buybrick = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem('user')
  // Initialize bircks states
  useEffect(() => {
    dispatch(getBricks());
    useCallback;
  }, []);
  // Create bricks states
  const { bricks, loading, donor } = useSelector(state => state.brick)
  const {amount} = useSelector(state => state.brick.brick)
  const [clickedIndex, setClickedIndex] = useState(null);

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




  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrickInfoModalOpen, setIsBrickInfoModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(0);
  const [hovered, setHovered] = useState("");

  const handleBrickClick = (index) => {
    if (!bricks[index].sold) {
      setIsBrickInfoModalOpen(false);
      setClickedIndex(index);
      setIsModalOpen(true);
    }
  };

  const handlePanClick = (e) => {
    // Get the position of the clicked point
    const x = e.clientX;
    const y = e.clientY;

    // Set the position of the modal relative to the clicked point
    setModalPosition({ x: x + 10, y: y + 10 });
    if (x > 1000) setModalPosition({ x: x - 220, y: y });
    if (y > 600) setModalPosition({ x: x, y: y - 300 });
    // Open the modal
    // setIsModalOpen(true);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    //Close modal when right clicked
    setIsModalOpen(false)
    setClickedIndex(null)
  }

  const handleMouseOver = (e) => {
    if (bricks[e.target.id].sold && !isModalOpen) {
      // Get the position of the clicked point
      const x = e.clientX;
      const y = e.clientY;

      // Set the position of the modal relative to the clicked point
      setModalPosition({ x: x + 10, y: y + 10 });
      if (x > 1000) setModalPosition({ x: x - 300, y: y });
      if (y > 600) setModalPosition({ x: x, y: y - 220 });
      setHovered(bricks[e.target.id]);
      setIsBrickInfoModalOpen(true);
    } else {
      setHovered(bricks[e.target.id]);
      setIsBrickInfoModalOpen(false)
    }
  }

  const handleBuyButtonClicked = () => {
    if (user) {
      setIsSlideModalOpen(true);
      setModalContent(1);
      setIsModalOpen(false);
    } else {
      navigate('/login')
    }
  };

  const handleCloseModal = () => {
    setIsSlideModalOpen(false);
  };

  const handlePreviousModal = () => {
    setModalContent(modalContent - 1)
  }

  const handleNextModal = () => {
    setModalContent(modalContent + 1);
  };

  const handleSkipModal = (count) => {
    setModalContent(modalContent + count)
  }

  const handleSold = () => {
      dispatch(buy(bricks[clickedIndex].brick_id, user, amount, clickedIndex))
      setIsSlideModalOpen(false)
  }

  const renderBricks = () => {
    const colBricks = [];
    Array.from(Array(140).keys()).map((col) => {
      const colBrick = (
        <div key={col} className='flex flex-row w-full'>
          {Array.from(Array(250).keys()).map((row) => {
            const index = col * 250 + row;
            return (
              <button
                key={index}
                id={index}
                className={classNames(
                  'border-2 border-white rounded-md w-5 h-5',
                  index === clickedIndex ? 'bg-yellow-500' : 'bg-gray-100',
                  bricks[index].sold && 'opacity-0'
                )}
                onClick={e => handleBrickClick(index)}
                onMouseOver={handleMouseOver}
              />
            );
          })}
        </div>
      );
      colBricks.push(colBrick);
    });
    return colBricks;
  };

  return (
    <div className='text-center items-center h-screen min-w-[500px] bg-gray-600 w-full flex itmes-center sm:justify-center'>
      <div className='fixed top-12 sm:right-16 md:right-20 lg:right-24 xl:right-36 flex justify-around p-3 itmes-center min-w-[400px] z-10'>
        <Menu as='div' className='relative flex justify-center itmes-center'>
          <Menu.Button className='btn btn-change px-3 rounded-lg hover:border-2 hover:border-sky-700'>
            <FcMenu className='text-4xl' />
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
            className='border-2 border-gray-400 rounded-full w-[240px] h-10 px-4 py-2 bg-gray-200 outline-none focus-visible:border-sky-700'
            placeholder='Search the Wall of Hope'
          />
        </div>
        <img
          src={UserImg}
          className='h-10 hover:border-2 border-sky-700 rounded-full'
          onClick={e => dispatch(logout())}
        />
      </div>
      <ProgressBar />
      {isModalOpen && <BuyBrick modalPosition={modalPosition} clickedIndex={bricks[clickedIndex].brick_id} handleBuyButtonClicked={handleBuyButtonClicked} />}
      {isBrickInfoModalOpen && <BrickInfo brickInfo={hovered} modalPosition={modalPosition} />}
      {isSlideModalOpen && modalContent !== 0 && (
        <div className='modal'>
          <div className='modal-content flex-col flex justify-center items-center relative'>
            <TiArrowLeftThick
              className='modal-previous-button text-2xl'
              onClick={handlePreviousModal}
            />

            <MdCancel
              className='modal-close-button text-2xl'
              onClick={handleCloseModal}
            />
            {modalContent === 1 && <Enter handleNextModal={handleSkipModal} />}
            {modalContent === 2 && <DonorInformation handleNextModal={handleNextModal} />}
            {modalContent === 3 && <DonorAddress handleNextModal={handleNextModal} />}
            {modalContent === 4 && <Video handleNextModal={handleNextModal} />}
            {modalContent === 5 && <DedicationForm handleNextModal={handleNextModal} brick_id={bricks[clickedIndex].brick_id} />}
            {modalContent === 6 && <DedicationConfirm handleSold={handleSold} />}

          </div>
        </div>
      )
      }
      <div
        className='w-full h-full bg-gray-400 flex justify-center items-center relative'
        ref={containerRef}
        onClick={handlePanClick}
        onContextMenu={handleRightClick}
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
              <div className='relative' onClick={handlePanClick}>
                <div className='absolute top-0 left-0 w-full h-full flex flex-col'>
                  {
                    loading ? (<div className='flex left-0 top-0 w-full h-full bg-gray-300 opacity-95 justify-center items-center absolute z-1000'>
                    <Oval
                      height={80}
                      width={80}
                      color="#0369a1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel='oval-loading'
                      secondaryColor="#0369a1"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  </div>) : renderBricks()
                  }
                  {/* {<CircularProgress disableShrink />} */}
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
