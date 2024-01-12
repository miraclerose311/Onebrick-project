import {
	Fragment,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { jwtDecode } from "jwt-decode";

import { buyBrick, getBricks } from "../actions/brick";
import { createOrder } from "../actions/payment";
import { getDonor } from "../actions/donor";
import { setAlertWithTimeout } from "../features/alertSlice";
import { logout } from "../features/authSlice";
import { clearOrder } from "../features/paymentSlice";
import { clearCurrent } from "../features/brickSlice";
import { getBrickSoldAmount } from "../actions/brick";

// Import modal components
import IntroModal from "../components/modals/IntroModal";
import DonorInformationModal from "../components/modals/DonorInformationModal";
import DonorAddressModal from "../components/modals/DonorAddressModal";
import VideoModal from "../components/modals/VideoModal";
import DedicationFormModal from "../components/modals/DedicationFormModal";
import DedicationConfirmModal from "../components/modals/DedicationConfirmModal";
import BuyBrickModal from "../components/modals/BuyBrickModal";
import BrickInformationModal from "../components/modals/BrickInformationModal";
import SoldModal from "../components/modals/SoldModal";
import ProgressBar from "../components/ProgressBar";

// Import assets
import UserImg from "../assets/img/user.png";
import "./Modal.css";
import { TiArrowLeftThick } from "react-icons/ti";
import { MdCancel } from "react-icons/md";
import { FcMenu } from "react-icons/fc";
import { Menu, Transition } from "@headlessui/react";
import ConfirmModal from "../components/modals/ConfirmModal";

const Buybrick = () => {
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

  useEffect(() => {
    if (token) {
      const { id } = jwtDecode(token);
      setUserId(id);
    } else {
      setUserId(null);
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
  const { amount, dedication } = useSelector((state) => state.brick.current);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [filtered, setFiltered] = useState([]);

  //Fetch donor state
  useEffect(() => {
    if (userId) dispatch(getDonor({ userId }));
  }, [dispatch, userId]);

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

  const handleBrickClick = (index) => {
    if (!bricks[index].sold && !isSoldModalOpen && !isBuyBrickModalOpen) {
      setIsBrickInfoModalOpen(false);
      setIsSoldModalOpen(false);
      setClickedIndex(index);
      dispatch(clearCurrent());
    } else {
      if (filtered.includes(bricks[index])) {
        setClickedIndex(index);
        setIsSlideModalOpen(true);
        setModalContent(7);
      }
      setIsBuyBrickModalOpen(false);
    }
  };

  useEffect(() => {
    console.log("modalposition", modalPosition);
  }, [modalPosition]);

  useEffect(() => {
    console.log("isBuyBrickModalOpen", isBuyBrickModalOpen);
  }, [isBuyBrickModalOpen]);

  const handlePanClick = (e) => {
    if (!isSoldModalOpen) {
      // Get the position of the clicked point
      const x = e.clientX;
      const y = e.clientY;

      // Set the position of the modal relative to the clicked point
      setModalPosition({ x, y });
      setIsBuyBrickModalOpen(true);
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
      } else {
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
            amount: amount / 1000000,
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
  }, [order, bricks, clickedIndex, dedication, userId, dispatch]);

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

  // const onChangeSearchInput = (e) => {
  //   if (e.target.value.length > 2) setSearch(e.target.value.toLowerCase());
  //   else if (e.target.value.length == 0) {
  //     if (userId) {
  //       const temp = bricks.filter((item) => {
  //         if (item.user) {
  //           return item.sold && item.user == userId;
  //         }
  //       });
  //       setFiltered(temp);
  //     }
  //   } else {
  //     setSearch("");
  //     setFiltered([]);
  //   }
  // };

  // useEffect(() => {
  //   if (search !== "") {
  //     const temp = bricks.filter((item) => {
  //       if (item.donor) {
  //         // Check if the donor's full name, email, or address includes the search search
  //         return (
  //           item.donor.fullName.toLowerCase().includes(search.toLowerCase()) ||
  //           item.donor.email.toLowerCase().includes(search.toLowerCase()) ||
  //           item.donor.address.toLowerCase().includes(search.toLowerCase()) ||
  //           item.donor.country.toLowerCase().includes(search.toLowerCase()) ||
  //           item.donor.state.toLowerCase().includes(search.toLowerCase()) ||
  //           item.brick_id.includes(search.toUpperCase())
  //         );
  //       } else {
  //         // If there is no donor, match by brick_id
  //         return item.brick_id.includes(search.toUpperCase());
  //       }
  //     });
  //     setFiltered(temp);
  //   }
  // }, [search, bricks]);

  const renderBricks = () => {
    const colBricks = [];
    Array.from(Array(140).keys()).map((col) => {
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
                    ? "bg-yellow-400 z-50"
                    : "bg-gray-100",
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
    <div className="text-center items-center h-screen min-w-[500px] bg-gray-600 w-full flex itmes-center sm:justify-center">
      <div className="fixed gap-3 top-12 sm:right-16 md:right-20 lg:right-24 xl:right-36 flex justify-around p-3 itmes-center z-10">
        <Menu as="div" className="relative flex justify-center itmes-center">
          <Menu.Button className="btn btn-change px-1 rounded-lg hover:border-2 hover:border-sky-700">
            <FcMenu className="text-4xl" />
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
            <Menu.Items className="absolute left-0 top-12 z-10 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-left text-sm"
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
                      "block px-4 py-2 text-left text-sm"
                    )}
                  >
                    About Us
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/beneficiaries"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-left text-sm"
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
                      "block px-4 py-2 text-left text-sm"
                    )}
                  >
                    Contact Us
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        {/* <div className="flex items-center mx-4">
          <input
            type="search"
            className="border-2 border-gray-400 rounded-full w-[240px] h-10 px-4 py-2 bg-gray-200 outline-none focus-visible:border-sky-700"
            placeholder="Search the Wall of Hope"
            onChange={onChangeSearchInput}
          />
        </div> */}
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
            <Menu.Items className="absolute right-0 top-12 z-10 mt-2 w-24 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
      </div>

      <ProgressBar />

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
        />
      )}
      {isSlideModalOpen && modalContent !== 0 && (
        <div className="modal">
          <div className="modal-content flex-col flex justify-center items-center relative">
            <TiArrowLeftThick
              className="modal-previous-button text-2xl hover:cursor-pointer"
              onClick={handlePreviousModal}
            />
            <MdCancel
              className="modal-close-button text-2xl hover:cursor-pointer"
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
        className="w-full h-full bg-gray-400 flex justify-center items-center relative"
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
          >
            <TransformComponent
              wrapperStyle={{
                width: "100%",
                height: "100%",
              }}
            >
              <div className="relative" onClick={handlePanClick}>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col">
                  {bricks.length !== 0 && renderBricks()}
                </div>
                <img
                  src={imgSrc}
                  className="absoulte top-0 left-0 max-w-none"
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
