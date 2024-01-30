import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { jwtDecode } from "jwt-decode";

//import actions and reducers
import { buyBrick, getBricks, resetBricks } from "../actions/brick";
import { getBrickSoldAmount } from "../actions/brick";
import { createOrder } from "../actions/payment";
import { getDonor } from "../actions/donor";
import { setAlertWithTimeout } from "../features/alertSlice";
import { clearOrder } from "../features/paymentSlice";
import { clearCurrent } from "../features/brickSlice";
import { logout } from "../features/authSlice";

//import react icons
import { HiMiniArrowLeft } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { FiExternalLink } from "react-icons/fi";
import { MdOutlineMenu } from "react-icons/md";

// Import modal components
import IntroModal from "../components/Modals/IntroModal";
import DonorInformationModal from "../components/Modals/DonorInformationModal";
import DonorAddressModal from "../components/Modals/DonorAddressModal";
import VideoModal from "../components/Modals/VideoModal";
import DedicationFormModal from "../components/Modals/DedicationFormModal";
import DedicationConfirmModal from "../components/Modals/DedicationConfirmModal";
import BuyBrickModal from "../components/Modals/BuyBrickModal";
import BrickInformationModal from "../components/Modals/BrickInformationModal";
import SoldModal from "../components/Modals/SoldModal";
import SharingModal from "../components/Modals/SharingModal";
import ConfirmModal from "../components/Modals/ConfirmModal";
import Popup from "../components/Modals/Popup";
import "../Modal.css";

import UserImg from "../assets/img/user.png";
import SupportWordIcon from "../assets/img/WallofHope/share_icon.png";
import WordsofSupportsModal from "../components/Modals/WordsofSupportsModal";

const Buybrick = () => {
  const TransformWrapperRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const { avatar } = useSelector((state) => state.auth);
  const userAvatar = avatar ? avatar : UserImg;

  // Initialize bircks states
  useEffect(() => {
    dispatch(getBricks());
    dispatch(getBrickSoldAmount());
  }, [dispatch]);

  // Initialize userId
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const { id, role } = jwtDecode(token);
      setUserId(id);
      setUserRole(role);
    } else {
      setUserId(null);
      setUserRole(null);
    }
  }, [token, dispatch]);

  //------------Background Image Fetch-------------
  const [imgSrc, setImageSrc] = useState("");

  const loadImage = () => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/upload/BackgroundOfWallofHope.txt`
    )
      .then((response) => response.text())
      .then((base64Text) => {
        setImageSrc(base64Text);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadImage();
  }, []);

  // Fetch brick states
  const { bricks } = useSelector((state) => state.brick);
  const { amount } = useSelector((state) => state.brick.current);
  const { sold } = useSelector((state) => state.admin);
  const [stage, setStage] = useState("h-3/4");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(null);

  //Fetch donor state
  useEffect(() => {
    if (userId) dispatch(getDonor({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    let soldblas = sold + 1;
    if (Math.ceil(soldblas / 8000) === 1) {
      setStage("h-3/4");
    } else if (Math.ceil(soldblas / 8000) === 2) {
      setStage("h-1/2");
    } else if (Math.ceil(soldblas / 8000) === 3) {
      setStage("h-1/4");
    } else if (Math.ceil(soldblas / 8000) === 4) setStage("hidden");
  }, [sold]);

  // Fetch payment states
  const { order } = useSelector((state) => state.payment);

  // Initialize container and image states
  const containerRef = useRef();

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [imageNaturalWidth, setImageNaturalWidth] = useState(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState(0);

  // Initialize zoom in and out variables
  const scaleUp = true;
  const src = imgSrc;
  const zoomFactor = 8;

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // ----------------------- Handle resize operations : Start ------------------------------------
  const handleResize = useCallback(() => {
    if (containerRef !== null) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      setContainerWidth(width);
      setContainerHeight(height);
      // const rect = containerRef.current.getBoundingClientRect();
      // setBrickContentPosition({
      //   top: rect.top,
      //   bottom: rect.bottom,
      // });
    } else {
      setContainerWidth(0);
      setContainerHeight(0);
    }
  }, [containerRef]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
    const scale = Math.max(
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
    if (bricks.length !== 0) {
      const image = new Image();
      image.onload = () => handleImageOnLoad(image);
      image.src = src;
    }
  }, [src, bricks]);

  // ----------------------- Handle resize operations : End ------------------------------------

  // Initialize modal variables
  const [isBuyBrickModalOpen, setIsBuyBrickModalOpen] = useState(false);
  const [isBrickInfoModalOpen, setIsBrickInfoModalOpen] = useState(false);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [isSoldModalOpen, setIsSoldModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWordsofSupportModalOpen, setIsWordsofSupportModalOpen] =
    useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [modalContent, setModalContent] = useState(0);
  const [hovered, setHovered] = useState("");

  //set Filtered array
  useEffect(() => {
    if (userId) {
      const temp = bricks.filter((item) => {
        if (item.user) {
          return item.sold && item.user == userId;
        }
      });
      setFiltered(temp);
    }
  }, [userId, bricks, isSoldModalOpen]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsWordsofSupportModalOpen(true);
    } else {
      setIsPopupOpen(true);
    }
  }, []);

  const handleBrickClick = (index) => {
    if (!bricks[index].sold && !isSoldModalOpen && !isBuyBrickModalOpen) {
      setIsBrickInfoModalOpen(false);
      setIsSoldModalOpen(false);
      setClickedIndex(index);
      dispatch(clearCurrent());
      setIsBuyBrickModalOpen(true);
    } else {
      if (filtered.includes(bricks[index])) {
        setClickedIndex(index);
        setIsSlideModalOpen(true);
        setIsBrickInfoModalOpen(false);
        setModalContent(7);
      }
      setIsBuyBrickModalOpen(false);
    }
  };

  const handlePanClick = (e) => {
    if (!isSoldModalOpen) {
      // Get the position of the clicked point
      const x = e.clientX;
      const y = e.clientY;
      // Set the position of the modal relative to the clicked point
      setModalPosition({ x, y });
    } else {
      setIsSoldModalOpen(false);
      dispatch(clearCurrent());
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    //Close modal when right clicked
    setIsBuyBrickModalOpen(false);
    setIsSoldModalOpen(false);
    dispatch(clearCurrent());
    setClickedIndex(null);
  };

  let hoverTimer;

  const handleMouseOver = (e) => {
    hoverTimer = setTimeout(() => {
      if (e.target.id == "pan") {
        setIsBrickInfoModalOpen(false);
      }
      if (
        bricks[e.target.id].sold &&
        !isBuyBrickModalOpen &&
        !isSoldModalOpen
      ) {
        // Get the position of the clicked point
        const x = e.clientX;
        const y = e.clientY;

        // Set the position of the modal relative to the clicked point
        setModalPosition({ x, y });
        if (bricks[e.target.id].sold) {
          setClickedIndex(e.target.id);
        }
        setHovered(bricks[e.target.id]);
        setIsBrickInfoModalOpen(true);
        // setClickedIndex(null);
      } else if (
        !bricks[e.target.id].sold &&
        !isBuyBrickModalOpen &&
        !isSoldModalOpen
      ) {
        setHovered(bricks[e.target.id]);
        setIsBrickInfoModalOpen(false);
      }
    }, 500);
  };

  const handleMouseOut = () => {
    clearTimeout(hoverTimer);
  };

  const handleBuyBrickButtonClick = () => {
    if (isAuthenticated) {
      setIsSlideModalOpen(true);
      setModalContent(1);
      setIsBuyBrickModalOpen(false);
    } else {
      navigate("/login");
    }
  };

  const handleCloseModal = () => {
    setIsSlideModalOpen(false);
  };

  const handlePreviousModal = () => {
    setModalContent(modalContent - 1);
  };

  const handleNextModal = () => {
    setModalContent(modalContent + 1);
  };

  const handleSkipDedication = () => {
    dispatch(getBrickSoldAmount());
    setIsSlideModalOpen(false);
    setIsSoldModalOpen(true);
  };

  const handleDedicate = () => {
    setIsSoldModalOpen(false);
    setIsSlideModalOpen(true);
    setIsBrickInfoModalOpen(false);
    setModalContent(5);
  };

  const handleBuyBrick = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    dispatch(createOrder(amount));

    setIsSlideModalOpen(false);
  };

  const handleConfirm = () => {
    setIsSlideModalOpen(false);
    dispatch(getBrickSoldAmount());
  };

  useEffect(() => {
    if (order.order_id !== "") {
      const { amount, order_id, currency } = order;
      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
        amount: amount,
        currency: currency,
        name: "Soumya Corp.",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/payment/success`,
            data
          );

          dispatch(
            setAlertWithTimeout({
              alertType: "success",
              content: result.data.msg,
            })
          );

          const brickData = {
            brick_id: bricks[clickedIndex].brick_id,
            user: userId,
            amount: amount / 100000,
            stage: Math.ceil((sold + 1) / 8000),
          };

          dispatch(buyBrick(brickData));
          dispatch(getBrickSoldAmount());
          dispatch(clearOrder());
          setIsSlideModalOpen(true);
          setModalContent(4);
        },
        modal: {
          ondismiss: function () {
            dispatch(clearOrder());
          },
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Alpha Hospice",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }, [order]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      script.ondismiss = () => {};
      document.body.appendChild(script);
    });
  };

  const handleLogout = () => {
    // dispatch(clearAmount());
    dispatch(logout());
    setFiltered([]);
    const successAlert = {
      alertType: "success",
      content: "Successfully signed out",
    };
    dispatch(setAlertWithTimeout(successAlert));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const onChangeSearchInput = (e) => {
    if (e.target.value.length > 2) setSearch(e.target.value.toLowerCase());
    else if (e.target.value.length == 0) {
      if (userId) {
        const temp = bricks.filter((item) => {
          if (item.user) {
            return item.sold && item.user == userId;
          }
        });
        setFiltered(temp);
      }
    } else {
      setSearch("");
      setFiltered([]);
    }
  };

  useEffect(() => {
    if (search) {
      const temp = bricks.filter((item) => {
        if (item.donor) {
          // Check if the donor's full name, email, or address includes the search search
          return (
            item.donor.fullName.toLowerCase().includes(search.toLowerCase()) ||
            item.donor.email.toLowerCase().includes(search.toLowerCase()) ||
            item.donor.address.toLowerCase().includes(search.toLowerCase()) ||
            item.donor.country.toLowerCase().includes(search.toLowerCase()) ||
            item.donor.state.toLowerCase().includes(search.toLowerCase()) ||
            item.brick_id.includes(search.toUpperCase())
          );
        } else {
          // If there is no donor, match by brick_id
          return item.brick_id.includes(search.toUpperCase());
        }
      });
      setFiltered(temp);
    }
  }, [search, bricks]);

  // const breakpoints = {
  //   sm: 576,
  //   md: 768,
  //   lg: 992,
  //   xl: 1200,
  //   "2xl": 1536,
  // };

  // const CountOfWH = {
  //   xs: { x: 100, y: 320 },
  //   sm: { x: 125, y: 256 },
  //   md: { x: 128, y: 250 },
  //   lg: { x: 160, y: 200 },
  //   xl: { x: 200, y: 160 },
  //   "2xl": { x: 256, y: 125 },
  // };

  // // Function to determine the screen width category
  // const getScreenWidthCategory = (width) => {
  //   if (width < breakpoints.sm) return "xs";
  //   else if (width >= breakpoints.sm && width < breakpoints.md) return "sm";
  //   else if (width >= breakpoints.md && width < breakpoints.lg) return "md";
  //   else if (width >= breakpoints.lg && width < breakpoints.xl) return "lg";
  //   else if (width >= breakpoints.xl && width < breakpoints["2xl"]) return "xl";
  //   else return "2xl";
  // };

  // const [screenWidthCategory, setScreenWidthCategory] = useState(
  //   getScreenWidthCategory(window.innerWidth)
  // );

  // // Handle screen resize
  // useEffect(() => {
  //   function handleResize() {
  //     setScreenWidthCategory(getScreenWidthCategory(window.innerWidth));
  //   }

  //   window.addEventListener("resize", handleResize);

  //   // Clean up the event listener on component unmount
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const renderBricks = () => {
    const colBricks = [];
    Array.from(Array(128).keys()).map((col) => {
      const colBrick = (
        <div key={col} className="flex flex-row w-full">
          {Array.from(Array(250).keys()).map((row) => {
            const index = col * 250 + row;
            return (
              <button
                key={index}
                id={index}
                className={classNames(
                  "border-2 border-white rounded-md w-5 h-5",
                  index === clickedIndex && !bricks[index].sold
                    ? "bg-yellow-400 z-40"
                    : "bg-gray-100 z-10",
                  !filtered.includes(bricks[index]) &&
                    bricks[index].sold &&
                    bricks[index].brick_id !== hovered.brick_id &&
                    "opacity-0",
                  !filtered.includes(bricks[index]) &&
                    bricks[index].sold &&
                    bricks[index].brick_id === hovered.brick_id &&
                    "bg-transparent border-red-600",
                  isSoldModalOpen && clickedIndex == index && "bg-white",
                  filtered.includes(bricks[index]) &&
                    "bg-transparent custom-shadow"
                )}
                onClick={() => handleBrickClick(index)}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
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
    <div className="text-center items-center h-screen min-w-[500px] bg-white w-full flex itmes-center sm:justify-center">
      <div className="fixed top-12 left-0 w-full flex justify-center md:justify-end z-50">
        <div className="gap-3 flex flex-wrap justify-around px-6 md:mr-12 itmes-center">
          {userRole === 3 && (
            <span
              className="w-12 h-12 hover:border hover:border-red-700 rounded-full flex justify-center items-center p-2"
              onClick={() => dispatch(resetBricks())}
            >
              <GrPowerReset className="w-full h-full text-gray-600 mr-1 cursor-pointer" />
            </span>
          )}

          <span
            className="w-12 h-12 rounded-full flex justify-center items-center p-2 cursor-pointer"
            onClick={() => setIsPopupOpen(true)}
          >
            <img
              src={SupportWordIcon}
              className="rounded-full flex justify-center items-center cursor-pointer"
            />
          </span>
          <span
            className="w-12 h-12 rounded-full flex justify-center items-center p-2 cursor-pointer"
            onClick={() => setIsShareModalOpen(true)}
          >
            <FiExternalLink className="w-full h-full text-gray-600 hover:text-sky-700 mr-1" />
          </span>

          <Menu as="div" className="relative flex justify-center itmes-center">
            <Menu.Button className="w-12 h-12 btn btn-change px-1 rounded-full">
              <MdOutlineMenu className="w-full h-full text-gray-600 hover:text-sky-700 mr-1" />
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
              <Menu.Items className="absolute w-44 flex flex-col items-center left-16 sm:-left-16 top-12 z-10 mt-2 p-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userRole === 2 && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/admin"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
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
                      to="/donor"
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

          <Menu as="div" className="relative flex justify-center itmes-center">
            <Menu.Button className="btn rounded-full">
              <img
                src={userAvatar}
                className="h-10 hover:border-2 border-sky-700 rounded-full"
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
          <div className="flex items-center mx-4">
            <input
              type="search"
              className="border border-gray-400 rounded-full w-[240px] h-10 px-4 py-2 bg-white outline-none focus-visible:border-sky-700"
              placeholder="Search the Wall of Hope"
              onChange={onChangeSearchInput}
            />
          </div>
        </div>
      </div>
      {isBuyBrickModalOpen && (
        <BuyBrickModal
          modalPosition={modalPosition}
          clickedIndex={bricks[clickedIndex].brick_id}
          handleBuyBrickButtonClick={handleBuyBrickButtonClick}
          hideModal={() => setIsBuyBrickModalOpen(false)}
        />
      )}
      {isBrickInfoModalOpen && (
        <BrickInformationModal
          userId={userId}
          brickInfo={hovered}
          modalPosition={modalPosition}
          handleDedicate={handleDedicate}
        />
      )}
      {isSoldModalOpen && (
        <SoldModal
          // brick_id={bricks[clickedIndex].brick_id}
          clickedIndex={parseInt(clickedIndex)}
          modalPosition={modalPosition}
          filtered={filtered}
          hideModal={() => setIsSoldModalOpen(false)}
        />
      )}
      {isSlideModalOpen && modalContent !== 0 && (
        <div
          id="slide-modal"
          className="modal"
          onClick={(e) => {
            if (e.target.id == "slide-modal") setIsSlideModalOpen(false);
          }}
        >
          <div className="modal-content absolute flex-col flex justify-center items-center rounded-md left-24 top-12">
            <HiMiniArrowLeft
              className="modal-previous-button text-xl hover:cursor-pointer"
              onClick={handlePreviousModal}
            />
            <IoClose
              className="modal-close-button text-xl font-bold hover:cursor-pointer"
              onClick={handleCloseModal}
            />
            {modalContent === 1 && (
              <IntroModal handleNextModal={handleNextModal} />
            )}
            {modalContent === 2 && (
              <DonorInformationModal handleNextModal={handleNextModal} />
            )}
            {modalContent === 3 && (
              <DonorAddressModal handleBuyBrick={handleBuyBrick} />
            )}
            {modalContent === 4 && (
              <VideoModal
                handleNextModal={handleNextModal}
                handleSkipDedication={handleSkipDedication}
              />
            )}
            {modalContent === 5 && (
              <DedicationFormModal
                handleNextModal={handleNextModal}
                brick_id={bricks[clickedIndex].brick_id}
              />
            )}
            {modalContent === 6 && (
              <DedicationConfirmModal
                handleConfirm={handleConfirm}
                clickedIndex={clickedIndex}
              />
            )}
            {modalContent === 7 && <ConfirmModal filtered={filtered} />}
          </div>
        </div>
      )}
      <div
        className="w-full h-full bg-white flex justify-center items-center relative"
        ref={containerRef}
        onClick={handlePanClick}
        onContextMenu={handleRightClick}
      >
        {imageScale > 0 && (
          <TransformWrapper
            key={`${imageNaturalWidth}x${imageNaturalHeight}`}
            initialScale={imageScale}
            minScale={imageScale}
            maxScale={zoomFactor * imageScale}
            centerOnInit
            wheel={{ smoothStep: 0.004 }}
            ref={TransformWrapperRef}
          >
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
              }}
            >
              <div className="relative w-full h-full" onClick={handlePanClick}>
                <div
                  id="pan"
                  onMouseOver={handleMouseOver}
                  className={`absolute w-full ${stage} top-0 left-0 bg-gradient-to-b bg-gray-300 z-50`}
                ></div>

                <div className="absolute top-0 left-0 w-full h-full flex flex-col">
                  {bricks.length !== 0 && renderBricks()}
                </div>
                <img
                  src={imgSrc}
                  className="absoulte top-0 left-0 max-w-none"
                  // " object-cover xs:w-[2000px] xs:h-[6400px] sm:w-[2500px] sm:h-[5120px] md:w-[2560px] md:h-[5000px] lg:w-[3200px] lg:h-[4000px] xl:w-[4000px] xl:h-[3200px]
                  // className="w-[5000px] h-[2560px]"
                  style={{
                    width: `5000px`, //250
                    height: `2560px`, //128
                  }}
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>
      {isPopupOpen && (
        <Popup
          hideModal={() => setIsPopupOpen(false)}
          setDonorName={(donorname) => setSearch(donorname)}
        />
      )}
      {isWordsofSupportModalOpen && (
        <WordsofSupportsModal
          hideModal={() => setIsWordsofSupportModalOpen(false)}
        />
      )}
      {isShareModalOpen && (
        <SharingModal hideModal={() => setIsShareModalOpen(false)} />
      )}
    </div>
  );
};

export default Buybrick;
