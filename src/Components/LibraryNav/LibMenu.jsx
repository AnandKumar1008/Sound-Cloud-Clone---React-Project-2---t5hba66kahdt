import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
const options = [
  { name: "Overview", path: "" },
  { name: "Likes", path: "likes" },
  { name: "Playlists", path: "playlists" },
  { name: "Albums", path: "albums" },
  { name: "Stations", path: "stations" },
  { name: "Followings", path: "following" },
  { name: "History", path: "history" },
];

const ITEM_HEIGHT = 48;

const LibMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 10.5,
            width: "20ch",
            backgroundColor: "#333333",
            color: "white",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={option.path}
            >
              {option.name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default LibMenu;
