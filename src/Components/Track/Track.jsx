import React, { useContext, useEffect, useRef, useState } from "react";

import { AiFillHeart } from "react-icons/ai";
import { BiRepost, BiSolidPlaylist } from "react-icons/bi";
import {
  BsFillPauseCircleFill,
  BsFillPlayCircleFill,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegShareSquare, FaShareSquare } from "react-icons/fa";
import { LuLink2, LuRepeat2 } from "react-icons/lu";
import { MdReportGmailerrorred } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { MyContext } from "../../MyContext";
import "./Track.css";
import "./TrackCard.css";
import stringToColour from "./utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const More = ({ item }) => {
  const dispatch = useDispatch();
  const reposted = useSelector((state) => state.reposts.reposts);
  const menuRef = useRef();
  const { setSongPlay, setLoginPage, songPlay, login } = useContext(MyContext);
  const handleShare = () => {
    // Implement the sharing functionality here
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
  const handleCopy = () => {
    navigator.clipboard
      .writeText(item.audio_url)
      .then(() => {
        toast(`Link Copied to ClipBorad`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => console.error("Error copying:", error));
  };
  return (
    <div
      id="menuRef"
      className="sound_cloud-track_more_card_three_dot_list"
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
      <button onClick={handleShare}>
        <FaShareSquare /> Share
      </button>

      <button onClick={handleCopy}>
        <LuLink2 /> Copy Link
      </button>

      <button
        onClick={() => {
          const idx = songPlay.findIndex((song) => song._id == item._id);
          if (idx >= 0) return;
          toast(`Song Added to NextUp`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setSongPlay((p) => [item, ...p]);
        }}
      >
        <BiSolidPlaylist /> Add To NextUp
      </button>
      <button>
        <MdReportGmailerrorred /> Report
      </button>
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
const Track = ({ song, index, self }) => {
  const {
    played,

    setCurrentSongIndex,
    isPlaying,
    setSongPlay,
    setIsPlaying,
    songId,
    setSongId,
    audioRef,
    duration,
    currentDuration,
    login,
    setLoginPage,
  } = useContext(MyContext);
  const menuRef = useRef();
  const [more, setMore] = useState(false);
  const clickRef = useRef();
  const liked = useSelector((state) => state.likes.likes);
  const repost = useSelector((state) => state.reposts.reposts);
  const dispatch = useDispatch();
  const handleCurrentDuration = (e) => {
    const width = clickRef.current.clientWidth;
    const offSet = e.nativeEvent.offsetX;
    console.log(offSet, width);
    const progress = offSet / width;
    audioRef.current.currentTime = progress * duration;
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleClick = (e) => {
    e.stopPropagation();
    setMore((p) => !p);
  };
  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (menuRef && !menuRef.current?.contains(e.target)) setMore(false);
    };
    window.addEventListener("click", handleOutSideClick);
    return () => {
      window.removeEventListener("click", handleOutSideClick);
    };
  }, []);
  const handleShare = () => {
    // Implement the sharing functionality here
    if (navigator.share) {
      navigator
        .share({
          title: song?.title,
          text: song?.mood,
          url: song?.audio_url,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Sharing not supported on this browser.");
    }
  };
  return (
    <div className="sound_cloud-track">
      <div className="sound_cloud-track_image">
        <img src={song?.thumbnail || song?.image} alt="" />
      </div>
      <div className="sound_cloud-track_audio_section">
        <div className="sound_cloud-track_audio_section_play">
          <div>
            {songId === song?._id && isPlaying ? (
              <BsFillPauseCircleFill
                style={{
                  fontSize: "3rem",
                  color: "orangered",
                  cursor: "pointer",
                }}
                onClick={() => setIsPlaying(false)}
              />
            ) : (
              <BsFillPlayCircleFill
                style={{
                  fontSize: "3rem",
                  color: "orangered",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSongId(song?._id);
                  setCurrentSongIndex(index);
                  setSongPlay([...self]);
                  setIsPlaying(true);
                }}
              />
            )}
          </div>

          <span className="sound_cloud-track_song_heading" style={{}}>
            <h6
              style={{
                backgroundColor: stringToColour(song?.mood),
                borderRadius: "1rem",
                padding: "0.5rem",
                maxWidth: "6rem",
                textAlign: "center",
                color: "black",
              }}
            >
              {song?.mood}
            </h6>
            <p>{song?.title}</p>
          </span>
        </div>
        <div className="sound_cloud-track_audio_graph">
          {songId === song?._id ? (
            <div className="sound_cloud-track_duration">
              <span>{formatTime(currentDuration)}</span>
              <div
                className="sound_cloud-track_audio_section_line_space"
                onClick={handleCurrentDuration}
                ref={clickRef}
                style={{ cursor: "pointer" }}
              >
                <div className="sound_cloud-track_audio_section_line">
                  <div
                    className="sound_cloud-track_audio_section_inner"
                    style={{
                      width: `${played * 100}%`,
                      backgroundColor: "orangered",
                      height: "2px",
                    }}
                  ></div>
                </div>
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          ) : (
            <div className="sound_cloud-track_audio_section_line_space">
              <div className="sound_cloud-track_audio_section_line">
                <div
                  className="sound_cloud-track_audio_section_inner"
                  style={{
                    height: "2px",
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <div
          className="sound_cloud-track_audio_section_buttons"
          onClick={(e) => e.stopPropagation()}
        >
          {liked.some((like) => like._id === song._id) ? (
            <button
              style={{ color: "orangered" }}
              onClick={() => dispatch({ type: "DISLIKE", payload: song })}
            >
              <AiFillHeart /> Liked
            </button>
          ) : (
            <button
              onClick={() => {
                if (!login) {
                  setLoginPage(true);
                  return;
                }
                dispatch({ type: "LIKE", payload: song });
              }}
            >
              <AiFillHeart /> Like
            </button>
          )}
          {repost.some((item) => item._id === song._id) ? (
            <button
              style={{ color: "orangered" }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "REMOVE_REPOST", payload: song });
              }}
            >
              <LuRepeat2 />
              Reposted
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!login) {
                  setLoginPage(true);
                  return;
                }
                toast(`${song?.title} 'reposted to your Feed`, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                dispatch({ type: "REPOST", payload: song });
              }}
            >
              <LuRepeat2 /> Repost
            </button>
          )}
          <button onClick={handleShare}>
            <FaRegShareSquare /> Share
          </button>
          <button onClick={handleClick} className="sound_cloud-track_more_btn">
            <BsThreeDots /> More
            <div className="sound_cloud-track_more" ref={menuRef}>
              {more && <More key={song?._id} item={song} />}
            </div>
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1}
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

export default Track;
