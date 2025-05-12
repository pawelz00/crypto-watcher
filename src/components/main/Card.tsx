import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../state/favorites/favoritesSlice";
import type { AppDispatch, RootState } from "../../state/store";
import { formatDateTime, formatMoney } from "@/helpers/formatter";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Form from "./Form";

type CardComponentProps = {
  id: string;
  name: string;
  price: number;
  lastCheck?: string;
  img?: string;
  withForm?: boolean;
};

export default function CardComponent({
  id,
  name,
  price,
  lastCheck,
  img,
  withForm = false,
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
        maxWidth: 500,
        minHeight: 410,
        height: "fit-content",
        margin: "auto",
        backgroundColor: "primary.main",
        color: "#fff",
        borderRadius: "10px",
        border: "1px solid #000",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
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
          padding: "2.5rem",
        }}
      >
        <img
          src={`src/assets/${img}`}
          alt={`${name} logo`}
          style={{
            width: 150,
            height: 150,
            objectFit: "contain",
          }}
        />

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
          Current price: ${formatMoney(price)}
          <br />
          Last check: {formatDateTime(lastCheck)}
        </Typography>
        {withForm && <Form unit={name} />}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          justifyContent: "end",
        }}
      >
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={handleClick}
          aria-label="Add to favorites"
          size="medium"
        >
          {state.value.includes(id) ? (
            <Favorite
              sx={{
                color: "#ff0000",
                stroke: "#ff0000",
                strokeWidth: 2,
                width: 32,
                height: 30,
              }}
            />
          ) : (
            <FavoriteOutlined
              sx={{
                color: "#ff0000",
                fill: "none",
                stroke: "#ff0000",
                strokeWidth: 2,
                width: 32,
                height: 30,
              }}
            />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
