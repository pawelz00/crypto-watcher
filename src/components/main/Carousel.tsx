import Box from "@mui/material/Box";
import CardComponent from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import Arrows from "./Arrows";
import {
  nextSlide,
  prevSlide,
  resetActiveIndex,
} from "@/state/carousel/carouselSlice";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import type { AppDispatch, RootState } from "@/state/store";

type CarouselProps = {
  withForm?: boolean;
  onlyFavorites?: boolean;
};

export default function Carousel({
  withForm = false,
  onlyFavorites = false,
}: CarouselProps) {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.crypto);
  const { activeIndex } = useSelector((state: RootState) => state.carousel);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [dimensions, setDimensions] = useState({
    containerWidth: 0,
    itemWidth: 0,
  });
  const minSwipeDistance = 40;

  useEffect(() => {
    dispatch(resetActiveIndex());
  }, [onlyFavorites, dispatch]);

  const resizeCallback = useCallback(
    (entry: ResizeObserverEntry) => {
      const containerWidth = entry.contentRect.width;
      const isMobile = window.innerWidth < 768;
      const itemsPerView = isMobile ? 1.25 : 2;
      const itemWidth = containerWidth / itemsPerView;

      setDimensions({ containerWidth, itemWidth });

      if (!isLoaded) setIsLoaded(true);
    },
    [isLoaded]
  );

  useResizeObserver(carouselRef, resizeCallback);

  const getTransformValue = () => {
    const { containerWidth, itemWidth } = dimensions;
    const centerPosition = containerWidth / 2;
    const activeItemCenter = activeIndex * itemWidth + itemWidth / 2;
    return centerPosition - activeItemCenter;
  };

  const finalData = useMemo(() => {
    if (onlyFavorites) {
      return items.filter((item) => item.isFavorite);
    }
    return items;
  }, [items, onlyFavorites]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && activeIndex < finalData.length - 1) {
      dispatch(nextSlide(finalData.length));
    } else if (isRightSwipe && activeIndex > 0) {
      dispatch(prevSlide(finalData.length));
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (finalData.length === 0) {
    return (
      <Box
        ref={carouselRef}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "primary.contrastText",
            fontSize: "2rem",
          }}
        >
          No items found
        </Typography>
      </Box>
    );
  }

  if (!isLoaded) {
    return (
      <Box
        ref={carouselRef}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        position="relative"
        width="100%"
        height="100%"
        ref={carouselRef}
        role="region"
        aria-label="Cryptocurrency carousel"
        alignContent={"center"}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        overflow={"hidden"}
        sx={{
          overflowY: "auto",
          touchAction: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.3s ease",
            transform: `translateX(${getTransformValue()}px)`,
            flex: 1,
          }}
        >
          {finalData.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <Box
                key={item.id}
                sx={{
                  flex: `0 0 ${dimensions.itemWidth}px`,
                  padding: "0 8px",
                  boxSizing: "border-box",
                }}
                aria-hidden={!isActive}
              >
                <Box
                  sx={{
                    transition: "all 0.3s ease",
                    transform: isActive ? "scale(1)" : "scale(0.9)",
                    opacity: isActive ? 1 : 0.7,
                    height: "100%",
                  }}
                >
                  <CardComponent {...item} withForm={withForm} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Arrows
        isFirstSlide={activeIndex === 0}
        isLastSlide={activeIndex === finalData.length - 1}
        numberOfSlides={finalData.length}
      />
    </>
  );
}
