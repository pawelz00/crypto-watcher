import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";

export default function CardComponent() {
  return (
    <Card
      sx={{
        maxWidth: 500,
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
          flex: "1 1 auto",
          display: "flex",
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
          Ethereum (ETH)
        </Typography>
        <Typography
          sx={{
            fontSize: "1.25rem",
          }}
        >
          Current price: $93,200.00
          <br />
          Last check: 12/31/2024 8:20 p.m.
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          justifyContent: "end",
        }}
      >
        <IconButton
          aria-label="Add to favorites"
          size="small"
          sx={{
            color: "#fff",
          }}
        >
          {/* <FavoriteOutlined /> */}
          <Favorite
            sx={{
              color: "#ff0000",
              fill: "none",
              stroke: "#ff0000",
              strokeWidth: 2,
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
