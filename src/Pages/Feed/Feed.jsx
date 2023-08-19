import React, { useContext } from "react";
import FeedComp from "../../Components/FeedComp/FeedComp";
import "./Feed.css";
import { MyContext } from "../../MyContext";
import Login from "../Login/Login";
const Feed = () => {
  const { setLoginPage, login } = useContext(MyContext);

  if (!login) {
    setLoginPage(true);
    return <></>;
  }
  return (
    <div className="sound_cloud-feed">
      <FeedComp />
    </div>
  );
};

export default Feed;
