import React, { useContext, useEffect, useRef, useState } from "react";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { BiRepost, BiSolidPlaylist } from "react-icons/bi";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { LuLink2 } from "react-icons/lu";
import { MdReportGmailerrorred } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../../MyContext";
import "./Card.css";
const Card = ({ item, self, isAlbum }) => {
  const {
    setSongPlay,
    songId,
    setSongId,
    isPlaying,
    setIsPlaying,
    login,
    setLoginPage,
    songPlay,
    albumId,
    setAlbumId,
  } = useContext(MyContext);
  const liked = useSelector((state) => state.likes.likes);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef();
  const reposted = useSelector((state) => state.reposts.reposts);
  const handleClick = (e) => {
    e.stopPropagation();
    const position = { x: e.clientX, y: e.clientY };
    setPosition(position);
    setToggle((p) => !p);
  };
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };
    const handleScroll = () => {
      setToggle(false);
    };

    window.addEventListener("scroll", handleScroll);

    window.addEventListener("click", handleOutSideClick);
    return () => {
      window.removeEventListener("click", handleOutSideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (!item._id)
    return (
      <div
        className="sound_cloud-card_content"
        style={{ cursor: "auto", border: "1px solid var(--color-para-text)" }}
      ></div>
    );
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: item?.title,
          text: item?.mood,
          url: item?.audio_url,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Sharing not supported on this browser.");
    }
  };
  return (
    <div className="sound_cloud-card">
      <div className="sound_cloud-card_content">
        <div className="sound_cloud-card_image">
          <img src={item?.thumbnail || item?.image} alt="" />
          <div className="sound_cloud-card_absolute">
            <div className="sound_cloud-card_play_icon">
              {(albumId == item._id || songId === item?._id) && isPlaying ? (
                <>
                  <BsFillPauseCircleFill
                    style={{
                      fontSize: "4rem",
                      color: "orangered",
                      backgroundColor: "white",
                      padding: "0",
                      borderRadius: "50%",
                      border: "none",
                    }}
                    onClick={() => {
                      setIsPlaying(false);
                    }}
                  />
                </>
              ) : (
                <BsFillPlayCircleFill
                  style={{
                    fontSize: "4rem",
                    color: "orangered",
                    backgroundColor: "white",
                    padding: "0",
                    borderRadius: "50%",
                    border: "none",
                  }}
                  onClick={() => {
                    const data = self?.filter((item) => !!item?._id) || [];
                    setSongPlay(data);
                    setSongId(item._id);
                    setIsPlaying(true);
                  }}
                />
              )}
            </div>
            <div className="sound_cloud-card_like_icons">
              {isAlbum ? (
                <>
                  <FavoriteRoundedIcon
                    style={{
                      color: "orangered",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: "REMOVE_ALBUM", payload: item });
                    }}
                  />
                </>
              ) : (
                <>
                  {liked.some((like) => like._id === item._id) ? (
                    <>
                      {
                        <>
                          <FavoriteRoundedIcon
                            style={{
                              color: "orangered",
                              fontSize: "1rem",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch({ type: "DISLIKE", payload: item });
                            }}
                          />
                        </>
                      }
                    </>
                  ) : (
                    <FavoriteRoundedIcon
                      style={{
                        color: "white",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!login) {
                          setLoginPage(true);
                          return;
                        }
                        dispatch({ type: "LIKE", payload: item });
                      }}
                    />
                  )}
                </>
              )}

              <div className="sound_cloud-card_three_dot">
                <MoreHorizRoundedIcon
                  style={{
                    color: "white",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sound_cloud-card_detail">
          <p>{item?.title}</p>
          <p>{item?.mood}</p>
        </div>
      </div>
      {toggle && (
        <div
          id="menuRef"
          className="sound_cloud-card_three_dot_list"
          style={{
            top: `${position.y + 4}px`,
            left: `${position.x + 4}px`,
          }}
          ref={menuRef}
        >
          {reposted.some((repost) => repost._id === item._id) ? (
            <button
              style={{ color: "orangered" }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "REMOVE_REPOST", payload: item });
              }}
            >
              <BiRepost /> Reposted
            </button>
          ) : (
            <>
              {isAlbum || (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!login) {
                      setLoginPage(true);
                      return;
                    }
                    dispatch({ type: "REPOST", payload: item });

                    toast(`${item?.title} 'reposted to your Feed`, {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }}
                >
                  <BiRepost /> Repost
                </button>
              )}
            </>
          )}
          <button onClick={handleShare}>
            <FaShareSquare /> Share
          </button>

          <button
            onClick={() => {
              toast(`Link Copied To ClipBorad`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }}
          >
            <LuLink2 /> Copy Link
          </button>

          {isAlbum || (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const idx = songPlay.findIndex((song) => song._id === item._id);
                if (idx >= 0) return;
                setSongPlay((p) => [item, ...p]);
              }}
            >
              <BiSolidPlaylist /> Add To NextUp
            </button>
          )}
          <button>
            <MdReportGmailerrorred /> Report
          </button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        limit={0}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Card;
