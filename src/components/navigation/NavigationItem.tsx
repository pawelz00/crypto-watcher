import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation } from "@tanstack/react-router";

type NavigationItemProps = {
  pathname?: string;
  text: string;
  Icon: React.ElementType;
};

export default function NavigationItem({
  pathname,
  text,
  Icon,
}: NavigationItemProps) {
  const isCurrentPath = useLocation().pathname === pathname;

  return (
    <ListItem disablePadding>
      <ListItemButton
        disableRipple
        disableTouchRipple
        selected={isCurrentPath}
        sx={{
          py: 1.5,
          "&.Mui-selected": {
            background: `linear-gradient(90deg, #8A8A8A 0%, #E0E0E0 100%)`,
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            color: isCurrentPath ? "#000" : "primary.contrastText",
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={text}
          slotProps={{
            primary: {
              fontWeight: "bold",
            },
          }}
          sx={{
            textWrap: "nowrap",
            color: isCurrentPath ? "#000" : "primary.contrastText",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
