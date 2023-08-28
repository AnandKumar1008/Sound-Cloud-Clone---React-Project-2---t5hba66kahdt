import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../../MyContext";

const LongMenu = () => {
  const { userPhoto, userName, login, setLogin, setLoginPage } =
    React.useContext(MyContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = [
    { path: "/", name: "Create Account" },
    { path: "/home", name: "Home" },
    { path: "/feed", name: "Feed" },
    { path: "/library", name: "Library" },
    { path: "/nextpro", name: "Try Next Pro" },
    { path: "/song", name: "For Artist" },
    { path: "/upload", name: "Upload" },
    { path: "/notification", name: "notification" },
    { path: "/message", name: "Message" },
    { path: "/", name: login ? "Sign Out" : "Sign In" },
  ];
  const handleNav = (option) => {
    if (option.name === "Sign Out") {
      localStorage.setItem("sound_cloud_google", JSON.stringify({}));
      setLogin(false);
    }
    if (option.name === "Sign In" || option.name === "Create Account") {
      setLoginPage(true);
    }
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
        <MenuIcon style={{ fontSize: "2.4rem" }} />
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
        {options.map((option, i) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {i == 0 && login ? (
              <img
                style={{ width: "2rem", height: "2rem" }}
                src={userPhoto}
                alt={userName}
              />
            ) : (
              <NavLink
                to={option.path}
                onClick={() => handleNav(option)}
                style={{ textDecoration: "none", color: "white" }}
              >
                {option.name}
              </NavLink>
            )}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default LongMenu;
