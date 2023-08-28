import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { BiStation, BiUser } from "react-icons/bi";
import {
  BsFillEnvelopeFill,
  BsPeopleFill,
  BsSearch,
  BsThreeDots,
} from "react-icons/bs";
import { IoMdContact } from "react-icons/io";
import { MdAudiotrack } from "react-icons/md";
import { RiNotification4Fill, RiSoundcloudLine } from "react-icons/ri";
import { TbArrowRampRight } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MyContext } from "../../MyContext";
import { soundCloudData } from "../SoundCloudSongs";
import LongMenu from "./LongMenu";
import "./Nav.css";
const Options = () => {
  const { hover, setHover, setActive } = useContext(MyContext);
  return (
    <>
      <div className="sound_cloud-nav_links_user_menu">
        <ul>
          <li onClick={() => setActive("popular")}>
            <Link to="/song">
              {" "}
              <IoMdContact /> Profiles
            </Link>
          </li>
          <li onClick={() => setHover("likes")}>
            <Link to="/library/likes">
              {" "}
              <AiFillHeart /> Likes
            </Link>
          </li>
          <li onClick={() => setHover("stations")}>
            <Link to="/library/stations">
              {" "}
              <BiStation /> Stations
            </Link>
          </li>
          <li onClick={() => setHover("following")}>
            <Link to="/library/following">
              <BsPeopleFill /> Who to follow
            </Link>
          </li>
          <li>
            <Link to="/nextpro">
              <AiFillStar /> Try Next Pro
            </Link>
          </li>
          <li onClick={() => setActive("tracks")}>
            <Link to="/song/tracks">
              <MdAudiotrack /> Tracks
            </Link>
          </li>
          <li>
            <Link to="/nextpro">
              <TbArrowRampRight /> Distribute
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

const ThreeDot = () => {
  const { setLogin, setUserName, setUserPhoto, setLoginPage, login } =
    useContext(MyContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    setLogin(false);
    setUserName("");
    setUserPhoto("");

    localStorage.setItem("sound_cloud_google", JSON.stringify({}));
    localStorage.setItem("sound_cloud_token", JSON.stringify(""));
    navigate("/");
  };

  return (
    <>
      <ul className="sound_cloud-nav_three_dot_ul">
        {login ? (
          <li onClick={handleSignOut}>Sign Out</li>
        ) : (
          <li onClick={() => setLoginPage(true)}>Sign In</li>
        )}
      </ul>
    </>
  );
};
const Nav = () => {
  const [option, setOption] = useState(false);
  const [threeDot, setThreeDot] = useState(false);
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState(false);
  const notificationRef = useRef();
  const messageRef = useRef();
  const threeDotRef = useRef();
  const optionsRef = useRef();
  const {
    setLoginPage,
    setSearchedItems,
    search,
    setSearch,
    userPhoto,
    login,
    setCreateAccount,
  } = useContext(MyContext);
  const navigate = useNavigate();
  const handleSearch = () => {
    if (!search) {
      return;
    }

    const filteredItems = soundCloudData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedItems(filteredItems);
    navigate("/search");
  };
  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (optionsRef && !optionsRef.current?.contains(e.target)) {
        setOption(false);
      }
      if (threeDotRef && !threeDotRef.current.contains(e.target)) {
        setThreeDot(false);
      }
      if (notificationRef && !notificationRef.current?.contains(e.target))
        setNotification(false);
      if (messageRef && !messageRef.current?.contains(e.target))
        setMessage(false);
    };
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      if (!search) {
        return;
      }

      const filteredItems = soundCloudData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedItems(filteredItems);
      navigate("/search");
    }
  };
  return (
    <div className="sound_cloud-nav">
      <nav className="sound_cloud-nav_links">
        <div className="sound_cloud-nav_links_left">
          <span className="sound_cloud-nav_long_menu">
            <LongMenu />
          </span>
          <div className="sound_cloud-nav_links_sound_icon">
            <Link to={login ? "/home" : "/"}>
              <RiSoundcloudLine />
            </Link>
          </div>
          <div className="sound_cloud-nav_links_home_feed_library">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/feed">Feed</NavLink>
            <NavLink to="/library">Library</NavLink>
          </div>
        </div>
        <div className="sound_cloud-nav_links_search">
          <div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />{" "}
            <button onClick={handleSearch}>
              <BsSearch />{" "}
            </button>
          </div>
          {login ? (
            <NavLink to="/nextpro" className="sound_cloud-nav_try_next_pro">
              Try Next Pro
            </NavLink>
          ) : (
            <></>
          )}
        </div>
        <div className="sound_cloud-nav_links_last">
          <div
            className="sound_cloud-nav_link_artist_upload"
            style={
              !login
                ? {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }
                : {}
            }
          >
            {login ? (
              <NavLink to="/song" className="sound_cloud-nav_artist">
                For Artists
              </NavLink>
            ) : (
              <>
                <div
                  className="sound_cloud-nav_sign_up"
                  style={!login ? { flex: "2" } : {}}
                  onClick={() => setLoginPage(true)}
                >
                  <button style={{ cursor: "pointer" }}>Sign In</button>
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => setCreateAccount(true)}
                  >
                    Create Account
                  </button>
                </div>
              </>
            )}
            <NavLink to="/upload" s>
              Upload
            </NavLink>
          </div>
          <ul
            className="sound_cloud-nav_links_user"
            style={!login ? { flex: "0.2" } : {}}
          >
            {login && (
              <ul
                onClick={() => {
                  setOption((p) => !p);
                }}
              >
                <li
                  className="sound_cloud-nav_links_first_list"
                  ref={optionsRef}
                >
                  {userPhoto ? (
                    <div className="sound_cloud-nav_link_first_list_image">
                      <img src={userPhoto} alt="" />
                    </div>
                  ) : (
                    <>
                      <BiUser />
                    </>
                  )}

                  <div className="sound_cloud-nav_links_option">
                    {option && <Options />}
                  </div>
                </li>
              </ul>
            )}

            {login ? (
              <>
                <li
                  className="sound_cloud-nav_notification"
                  ref={notificationRef}
                  onClick={() => setNotification((p) => !p)}
                >
                  <RiNotification4Fill />
                  {notification && (
                    <div className="sound_cloud-nav_notification_absolute">
                      <p>Notification</p>
                      {/* <div className="sound_cloud-nav_notification_middle"> */}
                      <p>No Notification</p>
                      {/* </div> */}
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/notification")}
                      >
                        View all notification
                      </p>
                    </div>
                  )}
                </li>
                <li
                  className="sound_cloud-nav_message"
                  onClick={() => setMessage((p) => !p)}
                  ref={messageRef}
                >
                  <BsFillEnvelopeFill />
                  {message && (
                    <div className="sound_cloud-nav_message_absolute">
                      <p>Messages</p>
                      {/* <div className="sound_cloud-nav_message_middle"> */}
                      <p>No Messages</p>
                      {/* </div> */}
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/message")}
                      >
                        View all messages
                      </p>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <></>
            )}
            <ul
              onClick={() => {
                // if (option) setOption(false);

                setThreeDot((p) => !p);
              }}
              ref={threeDotRef}
            >
              <li className="sound_cloud-nav_three_dot">
                <BsThreeDots />
                <div className="sound_cloud-nav_three_dot_absolute">
                  {threeDot && <ThreeDot />}
                </div>
              </li>
            </ul>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
