import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";
import Form from "./Form";
import { useDispatch } from "react-redux";

import { formatDateTime, formatMoney } from "@/helpers/formatter";
import type { AppDispatch } from "@/state/store";
import { changeFavoriteState } from "@/state/crypto/cryptoSlice";

type CardComponentProps = {
  id: string;
  name: string;
  price: number;
  lastCheck?: string;
  img?: string;
  isFavorite: boolean;
  withForm?: boolean;
};

export default function CardComponent({
  id,
  name,
  price,
  lastCheck,
  img,
  isFavorite,
  withForm = false,
}: CardComponentProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(changeFavoriteState({ id }));
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
            fontWeight: "regular",
            fontSize: "1.25rem",
          }}
        >
          Current price: ${formatMoney(price)}
          <br />
          {withForm
            ? `Value in USD: $${formatMoney(price)}`
            : `Last check: ${formatDateTime(lastCheck)}`}
        </Typography>
        {withForm && <Form id={id} unit={name} />}
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
          {isFavorite ? (
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
