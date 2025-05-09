import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type NavigationItemProps = {
  index?: number;
  selectedIndex?: number;
  handleListItemClick?: (x: number) => void;
  text: string;
  Icon: React.ElementType;
};

export default function NavigationItem({
  index,
  selectedIndex,
  handleListItemClick,
  text,
  Icon,
}: NavigationItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        disableRipple
        disableTouchRipple
        selected={selectedIndex === index}
        onClick={() => handleListItemClick && handleListItemClick(index || 0)}
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
            color: selectedIndex === index ? "#000" : "primary.contrastText",
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{
            textWrap: "nowrap",
            color: selectedIndex === index ? "#000" : "primary.contrastText",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
