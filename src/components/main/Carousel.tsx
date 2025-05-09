import Box from "@mui/material/Box";
import data from "../../../crypto.json";
import CardComponent from "./Card";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../state/store";
import { setItems } from "../../state/carousel/carouselSlice";
import { useEffect, useRef, useState } from "react";

export default function Carousel() {
  const dispatch = useDispatch();
  const { activeIndex, items } = useSelector(
    (state: RootState) => state.carousel
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    dispatch(setItems(data));
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth;
        setContainerWidth(containerWidth);
        setItemWidth(containerWidth * 0.5);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const getTransformValue = () => {
    const centerPosition = containerWidth / 2;
    console.log("Center Width:", centerPosition);
    const activeItemCenter = activeIndex * itemWidth + itemWidth / 2;
    const transform = centerPosition - activeItemCenter;
    console.log("Transform Value:", transform);
    return transform;
  };

  console.log(itemWidth);

  return (
    <Box position={"relative"} width={"100%"} ref={carouselRef}>
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(${getTransformValue()}px)`,
        }}
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <Box
              key={item.label}
              sx={{
                flex: `0 0 ${itemWidth}px`,
                transition: "all 0.3s ease",
              }}
            >
              <Box
                sx={{
                  transition: "all 0.3s ease",
                  transform: isActive ? "scale(1)" : "scale(0.9)",
                  opacity: isActive ? 1 : 0.75,
                }}
              >
                <CardComponent
                  id={item.id}
                  name={item.name}
                  price={String(item.price)}
                  lastCheck={String(item.lastCheck)}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
