import React, { useContext, useRef } from "react";
import "./SingleSong.css";
import bg from "../Images/bg1.jpg";
import { audio } from "../Audios";
import Track from "../Track/Track";
import { MyContext } from "../../MyContext";
import { BiRepost } from "react-icons/bi";
import { FaShareSquare } from "react-icons/fa";
import { LuLink2, LuRepeat2 } from "react-icons/lu";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const SingleSong = () => {
  const { userPhoto } = useContext(MyContext);
  const {
    played,
    setPlayed,
    currentSongDetail,
    setCurrentSongDetail,
    currentSongIndex,
    setCurrentSongIndex,
    allSongs,
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

  return (
    <div className="sound_cloud-single_song">
      <div className="sound_cloud-single_song_bg">
        <img src={bg} alt="" />
        <div className="sound_cloud-single_song_track">
          <div className="sound_sloud-single_song_left">
            <div className="sound_cloud-single_song_heading">
              {/* <span> */}
              <span className="sound_cloud-card_play_icon">
                {isPlaying ? (
                  <>
                    <BsFillPauseCircleFill
                      style={{
                        fontSize: "4rem",
                        color: "orangered",
                        backgroundColor: "white",
                        padding: "0",
                        borderRadius: "50%",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setIsPlaying(false);
                      }}
                    />{" "}
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
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setIsPlaying(true);
                      setSongId(currentSongDetail._id);
                      setSongPlay((p) => [currentSongDetail, ...p]);
                    }}
                  />
                )}
              </span>
              <span>
                <p>{currentSongDetail?.title}</p>
                <p>{currentSongDetail?.mood}</p>
              </span>
            </div>
            <div className="sound_cloud-single_song_graph_cover">
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
          </div>
          <div className="sound_cloud-single_song_img">
            <img src={currentSongDetail?.thumbnail} alt="" />
          </div>
        </div>
      </div>
      <div className="sound_cloud-single_song_detail">
        <div className="sound_cloud-single_song_detail_img">
          <img
            style={{ height: "2rem", width: "2rem" }}
            src={userPhoto}
            alt=""
          />
        </div>
        <div className="sound_cloud-single_song_like">
          {liked.some((like) => like._id === currentSongDetail._id) ? (
            <button
              style={{ color: "orangered" }}
              onClick={() =>
                dispatch({ type: "DISLIKE", payload: currentSongDetail })
              }
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
                dispatch({ type: "LIKE", payload: currentSongDetail });
              }}
            >
              <AiFillHeart /> Like
            </button>
          )}
          {repost.some((item) => item._id === currentSongDetail._id) ? (
            <button
              style={{ color: "orangered" }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "REMOVE_REPOST", payload: currentSongDetail });
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
                dispatch({ type: "REPOST", payload: currentSongDetail });
              }}
            >
              <LuRepeat2 /> Repost
            </button>
          )}
          <button title="Share">
            {" "}
            <FaShareSquare />
            share
          </button>
          <button title="Copy More">
            <LuLink2 style={{ fontSize: "1rem" }} />
            Copy More
          </button>
          <button title="More">
            <MoreHorizRoundedIcon />
            More
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleSong;
