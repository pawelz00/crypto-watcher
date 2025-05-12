import Box from "@mui/material/Box";
import CardComponent from "./Card";
import { useSelector } from "react-redux";
import { useCallback, useRef, useState } from "react";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import type { RootState } from "@/state/store";

type CarouselProps = {
  withForm?: boolean;
};

export default function Carousel({ withForm = false }: CarouselProps) {
  const { activeIndex, items } = useSelector(
    (state: RootState) => state.carousel
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({
    containerWidth: 0,
    itemWidth: 0,
  });

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

  if (!isLoaded || items.length === 0) {
    return (
      <Box
        ref={carouselRef}
        sx={{
          width: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "2",
        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      ref={carouselRef}
      role="region"
      aria-label="Cryptocurrency carousel"
      overflow={"hidden"}
      alignContent={"center"}
    >
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.3s ease",
          transform: `translateX(${getTransformValue()}px)`,
        }}
      >
        {items.map((item, idx) => {
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
                }}
              >
                <CardComponent {...item} withForm={withForm} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
