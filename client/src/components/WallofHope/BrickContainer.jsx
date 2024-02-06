import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import WrapperTransformComponent from "../Modals/WrapperTransformComponent";
import PropTypes from "prop-types";

import GrayImg from "../../assets/img/WallofHope/gray.png";
import bgImg from "../../assets/img/WallofHope/alpha_building_high_res.jpg";
import { useSelector } from "react-redux";

const zoomFactor = 10;

const BrickContainer = ({
  stage,
  clickedIndex,
  hovered,
  filtered,
  isSoldModalOpen,
  setIsPopupOpen,
  handleBrickClick,
  handleRightClick,
  handlePanClick,
  handleMouseOver,
  handleMouseOut,
  handleSwipeUp,
}) => {
  const containerRef = useRef();

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const [imageNaturalWidth, setImageNaturalWidth] = useState(0);
  const [imageNaturalHeight, setImageNaturalHeight] = useState(0);

  // Initialize zoom in and out variables
  const scaleUp = true;

  const { bricks } = useSelector((state) => state.brick);

  useEffect(() => {
    if (bricks.length !== 0) {
      const image = new Image();
      image.onload = () => handleImageOnLoad(image);
      image.src = bgImg;
    }
  }, [bgImg, bricks]);

  const handleImageOnLoad = (image) => {
    setImageNaturalWidth(image.naturalWidth);
    setImageNaturalHeight(image.naturalHeight);
  };

  const handleResize = useCallback(() => {
    if (containerRef.current) {
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
    // const scale = Math.max(
    //   containerWidth / imageNaturalWidth,
    //   containerHeight / imageNaturalHeight
    // );
    const scale = containerWidth / imageNaturalWidth;

    return scaleUp ? scale : Math.max(scale, 1);
  }, [
    scaleUp,
    containerWidth,
    containerHeight,
    imageNaturalWidth,
    imageNaturalHeight,
  ]);
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
                    : "bg-gray-100/80 z-10",
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

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);

  // the required distance between start and end touch points to be considered a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    const touch = e.targetTouches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
  };

  const onTouchMove = (e) => {
    const touch = e.targetTouches[0];
    setTouchEndX(touch.clientX);
    setTouchEndY(touch.clientY);
  };

  const onTouchEnd = () => {
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > minSwipeDistance) {
        console.log("Swiped left");
      } else if (deltaX < -minSwipeDistance) {
        console.log("Swiped right");
      }
    } else {
      // Vertical swipe
      if (deltaY > minSwipeDistance) {
        handleSwipeUp();
      } else if (deltaY < -minSwipeDistance) {
        console.log("Swiped down");
      }
    }
  };

  return (
    <div
      className="w-full h-[90vh] bg-white flex justify-center items-center relative"
      ref={containerRef}
      onClick={handlePanClick}
      onContextMenu={handleRightClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {imageScale > 0 && (
        <TransformWrapper
          key={`${imageNaturalWidth}x${imageNaturalHeight}`}
          initialScale={imageScale}
          minScale={imageScale}
          maxScale={zoomFactor * imageScale}
          centerOnInit
          wheel={{ smoothStep: 0.003 }}
        >
          <TransformComponent
            wrapperStyle={{
              width: "100%",
              height: "100%",
            }}
          >
            <WrapperTransformComponent
              imageScale={imageScale}
              setIsPopupOpen={setIsPopupOpen}
            >
              <div className="relative w-full h-full">
                <div
                  id="pan"
                  onMouseOver={handleMouseOver}
                  className={`absolute w-full ${stage} top-0 left-0 bg-gradient-to-b z-50`}
                >
                  <img src={GrayImg} className="w-full h-full" />
                </div>

                <div className="absolute top-0 left-0 w-full h-full flex flex-col">
                  {bricks.length !== 0 && renderBricks()}
                </div>
                <div className="w-full h-full bg-gray-100/20 absolute top-0 left-0"></div>
                <img
                  src={bgImg}
                  className="absoulte top-0 left-0 max-w-none"
                  // " object-cover xs:w-[2000px] xs:h-[6400px] sm:w-[2500px] sm:h-[5120px] md:w-[2560px] md:h-[5000px] lg:w-[3200px] lg:h-[4000px] xl:w-[4000px] xl:h-[3200px]
                  // className="w-[5000px] h-[2560px]"
                  style={{
                    width: `5000px`, //250
                    height: `2560px`, //128
                  }}
                />
              </div>
            </WrapperTransformComponent>
          </TransformComponent>
        </TransformWrapper>
      )}
    </div>
  );
};

BrickContainer.propTypes = {
  stage: PropTypes.string.isRequired,
  clickedIndex: PropTypes.number,
  hovered: PropTypes.string,
  filtered: PropTypes.array,
  isSoldModalOpen: PropTypes.bool.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
  handleBrickClick: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired,
  handlePanClick: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  handleSwipeUp: PropTypes.func.isRequired,
};

const MemorizedBrickContainer = memo(BrickContainer);

export default MemorizedBrickContainer;
