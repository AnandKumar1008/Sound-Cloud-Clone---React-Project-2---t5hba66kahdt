import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import LibraryNav from "../../Components/LibraryNav/LibraryNav";
import { MyContext } from "../../MyContext";
import "./Library.css";
const Library = () => {
  const { setLoginPage, login } = useContext(MyContext);

  if (!login) {
    setLoginPage(true);
    return <></>;
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
