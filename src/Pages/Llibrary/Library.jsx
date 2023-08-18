import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import LibraryNav from "../../Components/LibraryNav/LibraryNav";
import "./Library.css";
import MusicCategory from "../../Components/MusicCategory/MusicCategory";
import Overview from "../../Components/Overview/Overview";
import { useSelector } from "react-redux";
import Login from "../Login/Login";
import { MyContext } from "../../MyContext";
const Library = () => {
  const { setLoginPage, login } = useContext(MyContext);

  if (!login) {
    setLoginPage(true);
    return <Login />;
  }
  return (
    <div className="sound_cloud-library">
      <div className="sound_cloud-library_container">
        <LibraryNav />
        <Outlet />
      </div>
    </div>
  );
};

export default Library;
