import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../state/favorites/favoritesSlice";
import type { AppDispatch, RootState } from "../../state/store";

type CardComponentProps = {
  id: string;
  name: string;
  price: string;
  lastCheck?: string;
};

export default function CardComponent({
  id,
  name,
  price,
  lastCheck,
}: CardComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.favorites);

  const handleClick = () => {
    const isFavorite = state.value.includes(id);

    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  return (
    <Card
      sx={{
        width: 500,
        minHeight: 410,
        margin: "auto",
        backgroundColor: "primary.main",
        color: "#fff",
        borderRadius: "10px",
        border: "1px solid #000",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Typography>Photo</Typography>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            fontSize: "1.25rem",
          }}
        >
          Current price: ${price}
          <br />
          Last check: {lastCheck}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          justifyContent: "end",
        }}
      >
        <IconButton
          onClick={handleClick}
          aria-label="Add to favorites"
          size="small"
          sx={{
            color: "#fff",
          }}
        >
          {state.value.includes(id) ? (
            <Favorite
              sx={{
                color: "#ff0000",
                stroke: "#ff0000",
                strokeWidth: 2,
              }}
            />
          ) : (
            <FavoriteOutlined
              sx={{
                color: "#ff0000",
                fill: "none",
                stroke: "#ff0000",
                strokeWidth: 2,
              }}
            />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
