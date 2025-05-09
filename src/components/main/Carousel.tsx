import Box from "@mui/material/Box";
import data from "../../../crypto.json";
import CardComponent from "./Card";

export default function Carousel() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={4}
      mt={4}
      width="100%"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {data.map((item, idx) => (
        <Box
          key={item.id}
          sx={{
            transition: "transform 0.3s",
            position: idx === 0 ? "relative" : "absolute",
            left: idx === 0 ? "0" : "50%",
            transform: idx === 0 ? "none" : "translateX(100%)",
            opacity: idx === 0 ? 1 : 0,
            pointerEvents: idx === 0 ? "auto" : "none",
          }}
        >
          <CardComponent
            id={item.id}
            name={item.name}
            price={String(item.price)}
            lastCheck={String(item.lastCheck)}
          />
        </Box>
      ))}
    </Box>
  );
}
