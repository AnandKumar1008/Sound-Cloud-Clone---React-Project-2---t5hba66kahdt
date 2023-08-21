import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Link } from "react-router-dom";
const options = [
  { path: "", name: "All" },
  { path: "populartracks", name: "Popular Tracks" },
  { path: "tracks", name: "Tracks" },
  { path: "playlists", name: "PlayLists" },
  { path: "albums", name: "Albums" },
  { path: "reposts", name: "Reposts" },
];

const CategoryMenu = () => {
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
            maxHeight: "100vh",
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
              to={option.path}
              style={{ textDecoration: "none", color: "white" }}
            >
              {option.name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default CategoryMenu;
