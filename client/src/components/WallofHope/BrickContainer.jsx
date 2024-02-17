import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import WrapperTransformComponent from "../modals/WrapperTransformComponent";
import PropTypes from "prop-types";

// import GrayImg from "../../assets/img/WallofHope/gray.png";
import bgImg from "../../assets/img/WallofHope/alpha_building_high_res.jpg";
import { useSelector } from "react-redux";

const zoomFactor = 15;

const BrickContainer = ({
  stage,
  clickedIndex,
  dedicatedBrickId,
  hovered,
  filtered,
  setModalPosition,
  isSoldModalOpen,
  setIsPopupOpen,
  handleBrickClick,
  handleRightClick,
  handlePanClick,
  handleMouseOver,
  handleMouseOut,
}) => {
  const containerRef = useRef();

  useEffect(() => {
    console.log("BrickContainer Rerendered!");
  }, []);

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
    getBrickElementPositionById(dedicatedBrickId);
  }, [containerRef, dedicatedBrickId]);

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

  const getBrickElementPositionById = (brickId) => {
    const brickElement = document.getElementById(`brick-${brickId}`);
    if (brickElement) {
      const rect = brickElement.getBoundingClientRect();
      setModalPosition({ x: rect.x, y: rect.y });
    } else {
      return null; // brick element not found
    }
  };

  const renderBricks = () => {
    return Array.from(Array(125).keys()).map((col) => (
      <div key={col} className="flex flex-row w-full">
        {Array.from(Array(320).keys()).map((row) => {
          const index = col * 320 + row;

          return (
            <div
              key={index}
              id={`brick-${bricks[index].brick_id}`}
              className={classNames(
                "border-2 border-white rounded-md w-5 h-5 cursor-pointer relative",
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
                isSoldModalOpen && clickedIndex === index && "bg-white",
                filtered.includes(bricks[index]) &&
                  "bg-transparent custom-shadow"
              )}
              onClick={() => handleBrickClick(index)}
              // onTouchStart={onTouchStart}
              // onTouchMove={onTouchMove}
              // onTouchEnd={onTouchEnd}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            ></div>
          );
        })}
      </div>
    ));
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div
      className="w-full h-[90vh] bg-white flex justify-center items-center relative"
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
                  className={`absolute w-full ${stage} top-0 left-0 bg-transparent z-50`}
                >
                  {/* <img loading="lazy" src={GrayImg} className="w-full h-full" /> */}
                </div>

                <div className="absolute top-0 left-0 w-full h-full flex flex-col">
                  {bricks.length !== 0 && renderBricks()}
                </div>
                <div className="w-full h-full bg-gray-100/20 absolute top-0 left-0"></div>
                <img
                  src={bgImg}
                  loading="lazy"
                  className="absoulte top-0 left-0 max-w-none"
                  // " object-cover xs:w-[2000px] xs:h-[6400px] sm:w-[2500px] sm:h-[5120px] md:w-[2560px] md:h-[5000px] lg:w-[3200px] lg:h-[4000px] xl:w-[4000px] xl:h-[3200px]
                  // className="w-[5000px] h-[2560px]"
                  style={{
                    width: `6400px`, //320
                    height: `2500px`, //125
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
  dedicatedBrickId: PropTypes.string,
  hovered: PropTypes.object,
  filtered: PropTypes.array,
  setModalPosition: PropTypes.func.isRequired,
  isSoldModalOpen: PropTypes.bool.isRequired,
  setIsPopupOpen: PropTypes.func.isRequired,
  handleBrickClick: PropTypes.func.isRequired,
  handleRightClick: PropTypes.func.isRequired,
  handlePanClick: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  hideDedicatedBrickInfoModal: PropTypes.func.isRequired,
  // handleSwipeUp: PropTypes.func.isRequired,
};

const MemorizedBrickContainer = memo(BrickContainer);

export default MemorizedBrickContainer;
