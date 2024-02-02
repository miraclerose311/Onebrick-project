import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { useTransformEffect } from "react-zoom-pan-pinch";

const WrapperTransformComponent = ({
  children,
  imageScale,
  setIsPopupOpen,
}) => {
  const [scrollDown, setScrollDown] = useState(false);
  const [isMinScale, setIsMimScale] = useState(true);

  const BrickPan = document.getElementById("brickpan");
  const SCROLL_TIMEOUT = 200;
  let lastScrollTime = 0;

  const handleScroll = (e) => {
    let currentTime = new Date().getTime();
    if (e.deltaY > 0 && currentTime - lastScrollTime < SCROLL_TIMEOUT) {
      setScrollDown(true);
    } else if (e.deltaY > 0) {
      lastScrollTime = currentTime;
      setScrollDown(false);
    } else {
      setScrollDown(false);
    }
  };

  useEffect(() => {
    if (scrollDown && isMinScale) {
      setIsPopupOpen(true);
    }
  }, [scrollDown, isMinScale]);

  useTransformEffect(({ state }) => {
    if (state.scale === imageScale) {
      setIsMimScale(true);
    } else {
      setIsMimScale(false);
    }
  }, []);

  if (BrickPan) {
    BrickPan.addEventListener("wheel", handleScroll);
  }

  return (
    <div
      id="brickpan"
      className="w-full h-full flex justify-center items-center"
    >
      {children}
    </div>
  );
};

WrapperTransformComponent.propTypes = {
  children: PropTypes.object.isRequired,
  imageScale: PropTypes.number.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
};

export default WrapperTransformComponent;
