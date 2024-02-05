import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

//import actions and reducers
import { getDonor } from "../actions/donor";
import { createOrder } from "../actions/payment";
import { buyBrick, getBricks } from "../actions/brick";
import { getBrickSoldAmount } from "../actions/brick";
import { setAlertWithTimeout } from "../features/alertSlice";
import { clearOrder } from "../features/paymentSlice";
import { clearCurrent } from "../features/brickSlice";

// Import modal components
import BrickInformationModal from "../components/Modals/BrickInformationModal";
import SoldModal from "../components/Modals/SoldModal";
import SharingModal from "../components/Modals/SharingModal";
import Popup from "../components/Modals/Popup";
import "../Modal.css";

import WordsofSupportsModal from "../components/Modals/WordsofSupportsModal";
import SlideModalContainer from "../components/Modals/SlideModalContainer";
import MemoizedHeader from "../components/WallofHope/Header";
import MemorizedBrickContainer from "../components/WallofHope/BrickContainer";
import MemorizedBuybrickModal from "../components/Modals/BuyBrickModal";
// import MemoTestModal from "../components/Modals/TestModal";

const Buybrick = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, token } = useSelector((state) => state.auth);

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

  // Initialize bircks states
  useEffect(() => {
    dispatch(getBricks());
    dispatch(getBrickSoldAmount());
  }, [dispatch]);

  // Fetch brick states
  const { bricks } = useSelector((state) => state.brick);
  const { amount } = useSelector((state) => state.brick.current);
  const { sold } = useSelector((state) => state.admin);

  // Fetch payment states
  const { order } = useSelector((state) => state.payment);

  const [hiddenHeight, setHiddenHeight] = useState("h-3/4");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [hovered, setHovered] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState(null);

  const handleSetFiltered = useCallback((value) => {
    setFiltered(value);
  }, []);

  const handleSetHovered = useCallback((value) => {
    setHovered(value);
  }, []);

  const handleSetSearch = useCallback((value) => {
    setSearch(value);
  }, []);

  useEffect(() => {
    if (userId) dispatch(getDonor({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    let soldblas = sold + 1;
    if (Math.ceil(soldblas / 8000) === 1) {
      setHiddenHeight("h-3/4");
    } else if (Math.ceil(soldblas / 8000) === 2) {
      setHiddenHeight("h-1/2");
    } else if (Math.ceil(soldblas / 8000) === 3) {
      setHiddenHeight("h-1/4");
    } else if (Math.ceil(soldblas / 8000) === 4) setHiddenHeight("hidden");
  }, [sold]);

  // Initialize modal variables
  const [isBuyBrickModalOpen, setIsBuyBrickModalOpen] = useState(false);
  const [isBrickInfoModalOpen, setIsBrickInfoModalOpen] = useState(false);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [isSoldModalOpen, setIsSoldModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWordsofSupportModalOpen, setIsWordsofSupportModalOpen] =
    useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [modalContent, setModalContent] = useState(0);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const handleSetIsBuyBrickModalOpen = useCallback((value) => {
    setIsBuyBrickModalOpen(value);
  }, []);
  // console.log(isBuyBrickModalOpen)
  const handleSetIsBrickInfoModalOpen = useCallback((value) => {
    setIsBrickInfoModalOpen(value);
  }, []);

  const handleSetIsSoldModalOpen = useCallback((value) => {
    setIsSoldModalOpen(value);
  }, []);

  const handleSetSlideModalOpen = useCallback((value) => {
    setIsSlideModalOpen(value);
  }, []);

  const handleSetShareModalOpen = useCallback((value) => {
    setIsShareModalOpen(value);
  }, []);

  const handleSetWordsofSupportModalOpen = useCallback((value) => {
    setIsWordsofSupportModalOpen(value);
  }, []);

  const handleSetIsPopupOpen = useCallback((value) => {
    setIsPopupOpen(value);
  }, []);

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

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
      handleSetIsPopupOpen(true);
    }
  }, []);

  const handleBrickClick = (index) => {
    if (!bricks[index].sold && !isSoldModalOpen && !isBuyBrickModalOpen) {
      handleSetIsBrickInfoModalOpen(false);
      handleSetIsSoldModalOpen(false);
      setClickedIndex(index);
      dispatch(clearCurrent());
      handleSetIsBuyBrickModalOpen(true);
    } else {
      if (filtered.includes(bricks[index])) {
        setClickedIndex(index);
        handleSetSlideModalOpen(true);
        handleSetIsBrickInfoModalOpen(false);
        setModalContent(7);
      }
      handleSetIsBuyBrickModalOpen(false);
    }
  };

  const handlePanClick = useCallback((e) => {
    if (!isSoldModalOpen) {
      // Get the position of the clicked point
      const x = e.clientX;
      const y = e.clientY;
      // Set the position of the modal relative to the clicked point
      setModalPosition({ x, y });
    } else {
      handleSetIsSoldModalOpen(false);
      dispatch(clearCurrent());
    }
  }, []);

  const handleRightClick = useCallback((e) => {
    e.preventDefault();
    //Close modal when right clicked
    handleSetIsBuyBrickModalOpen(false);
    handleSetIsSoldModalOpen(false);
    dispatch(clearCurrent());
    setClickedIndex(null);
  }, []);

  let hoverTimer;

  const handleMouseOver = useCallback(
    (e) => {
      // hoverTimer = setTimeout(() => {
      if (e.target.id == "pan") {
        handleSetIsBrickInfoModalOpen(false);
      } else if (
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
        handleSetHovered(bricks[e.target.id]);
        handleSetIsBrickInfoModalOpen(true);
        // setClickedIndex(null);
      } else if (
        !bricks[e.target.id].sold &&
        !isBuyBrickModalOpen &&
        !isSoldModalOpen
      ) {
        handleSetIsBrickInfoModalOpen(false);
      }
    },
    [
      bricks,
      handleSetHovered,
      handleSetIsBrickInfoModalOpen,
      isSoldModalOpen,
      isBuyBrickModalOpen,
    ]
  );

  const handleMouseOut = useCallback(() => {
    clearTimeout(hoverTimer);
  }, []);

  const handleBuyBrickButtonClick = useCallback(() => {
    if (isAuthenticated) {
      handleSetSlideModalOpen(true);
      setModalContent(1);
      handleSetIsBuyBrickModalOpen(false);
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleCloseModal = () => {
    handleSetSlideModalOpen(false);
  };

  const handlePreviousModal = () => {
    setModalContent(modalContent - 1);
  };

  const handleNextModal = () => {
    setModalContent(modalContent + 1);
  };

  const handleSkipDedication = () => {
    dispatch(getBrickSoldAmount());
    handleSetSlideModalOpen(false);
    handleSetIsSoldModalOpen(true);
  };

  const handleDedicate = () => {
    handleSetIsSoldModalOpen(false);
    handleSetSlideModalOpen(true);
    handleSetIsBrickInfoModalOpen(false);
    setModalContent(5);
  };

  const handleConfirm = () => {
    handleSetSlideModalOpen(false);
    dispatch(getBrickSoldAmount());
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
    handleSetSlideModalOpen(false);
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
          handleSetSlideModalOpen(true);
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

  const onChangeSearchInput = useCallback(
    (e) => {
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
    },
    [bricks, userId]
  );

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

  return (
		<div className='text-center items-center h-screen bg-white w-full flex flex-col itmes-center sm:justify-center'>
			<MemoizedHeader
				clearFilter={handleSetFiltered}
				onChangeSearchInput={onChangeSearchInput}
				setIsShareModalOpen={handleSetShareModalOpen}
				setIsWordsofSupportModalOpen={handleSetWordsofSupportModalOpen}
			/>
			<MemorizedBrickContainer
				stage={hiddenHeight}
				clickedIndex={clickedIndex}
				filtered={filtered}
				hovered={hovered}
				isSoldModalOpen={isSoldModalOpen}
				setIsPopupOpen={handleSetIsPopupOpen}
				handleBrickClick={handleBrickClick}
				handleRightClick={handleRightClick}
				handlePanClick={handlePanClick}
				handleMouseOver={handleMouseOver}
				handleMouseOut={handleMouseOut}
			/>
			{isSlideModalOpen && (
				<SlideModalContainer
					isSlideModalOpen={isSlideModalOpen}
					modalContent={modalContent}
					setIsSlideModalOpen={handleSetSlideModalOpen}
					handleCloseModal={handleCloseModal}
					handlePreviousModal={handlePreviousModal}
					handleNextModal={handleNextModal}
					handleBuyBrick={handleBuyBrick}
					dedicationBrickId={clickedIndex ? bricks[clickedIndex].brick_id : ""}
					handleConfirm={handleConfirm}
					handleSkipDedication={handleSkipDedication}
					clickedIndex={clickedIndex}
					filtered={filtered}
				/>
			)}
			{isBuyBrickModalOpen && (
				<MemorizedBuybrickModal
					modalPosition={modalPosition}
					clickedIndex={bricks[clickedIndex].brick_id}
					handleBuyBrickButtonClick={handleBuyBrickButtonClick}
					hideModal={() => handleSetIsBuyBrickModalOpen(false)}
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
					hideModal={() => handleSetIsSoldModalOpen(false)}
				/>
			)}
			{isPopupOpen && (
				<Popup
					hideModal={handleClosePopup}
					setDonorName={handleSetSearch}
					setIsWordsofSupportModalOpen={() =>
						setIsWordsofSupportModalOpen(true)
					}
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
