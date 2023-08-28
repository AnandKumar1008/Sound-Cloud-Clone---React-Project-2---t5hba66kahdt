import React, { useState, useRef, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import AudioWaveform from "../AudioWaveForm";
import "./AudioPlayer.css";
import { ImNext2, ImPrevious2 } from "react-icons/im";
import { FaPlay, FaShareSquare, FaVolumeMute } from "react-icons/fa";
import {
  BsArrowRepeat,
  BsFillPeopleFill,
  BsFillVolumeUpFill,
  BsVolumeUp,
} from "react-icons/bs";
import { BiRepost, BiShuffle, BiSolidPlaylist } from "react-icons/bi";
import { TfiRulerAlt } from "react-icons/tfi";
import { PiSpeakerHighBold } from "react-icons/pi";
import { GiPauseButton } from "react-icons/gi";
import { duration } from "@mui/material";
import { MyContext } from "../../MyContext";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { audio } from "../Audios";
import { useDispatch, useSelector } from "react-redux";
import BadgeVisibility from "../../assets/MaterialUI";
import VolumeSlider from "../../assets/VolumeSlider";
import Drawer from "../../assets/Drawer/Drawer";
import { Close, PlayArrow } from "@mui/icons-material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import { MdReportGmailerrorred } from "react-icons/md";
import { FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OneSong = ({ item, i }) => {
  const {
    songPlay,
    setSongPlay,
    setCurrentSongIndex,
    songId,
    setIsPlaying,
    currentSongIndex,
    isPlaying,
    setSongId,
  } = useContext(MyContext);
  const clickRef = useRef();
  const [dot, setDot] = useState(false);
  const reposted = useSelector((state) => state.reposts.reposts);
  const liked = useSelector((state) => state.likes.likes);
  const dispatch = useDispatch();
  const handleRemove = (e, i) => {
    if (i < currentSongIndex) {
      setCurrentSongIndex((p) => p - 1);
    }

    const arr = [...songPlay];
    arr.splice(i, 1);
    setSongPlay(arr);
    e.stopPropagation();
  };
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
  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (clickRef && !clickRef.current?.contains(e.target)) {
        setDot(false);
        console.log("hare code reuns");
      }
    };
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);
  const handleLeave = () => {
    setDot(false);
  };
  return (
    <div
      key={item._id}
      className="sound_cloud-current_list_items"
      style={i < currentSongIndex ? { opacity: "0.5" } : {}}
      onClick={() => {
        setCurrentSongIndex(i), setIsPlaying(true);
        setSongId(item._id);
      }}
      onMouseLeave={handleLeave}
    >
      <div className="sound_cloud-current_list_items_title">
        <div className="sound_cloud-current_list_images">
          <img src={item?.thumbnail} alt="" />

          <div
            className="sound_cloud-current_list_icon"
            style={i == currentSongIndex ? { display: "block" } : {}}
          >
            {songId === item._id && isPlaying ? (
              <PauseCircleFilledRoundedIcon
                style={{
                  color: "orangered",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(false);
                }}
              />
            ) : (
              <PlayCircleFilledWhiteIcon
                style={{
                  color: "orangered",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
                onClick={() => {
                  // e.stopPropagation();
                  setIsPlaying(true);
                }}
              />
            )}
          </div>
        </div>
        <div>
          <p>{item?.mood}</p>
          <p>{item?.title}</p>
        </div>
      </div>
      <div
        className="sound_cloud-current_list_last_icons"
        style={i == currentSongIndex ? { display: "block" } : {}}
      >
        <span className="sound_cloud-current_list_hovering">
          {i <= currentSongIndex ? (
            <>
              {liked.some((like) => like._id == item?._id) ? (
                <FavoriteIcon
                  style={{
                    cursor: "pointer",
                    fontSize: "1rem",
                    color: "orangered",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "DISLIKE", payload: item });
                  }}
                />
              ) : (
                <FavoriteIcon
                  style={{
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "LIKE", payload: item });
                  }}
                />
              )}
            </>
          ) : (
            <Close
              style={{ cursor: "pointer", fontSize: "1rem" }}
              onClick={(e) => handleRemove(e, i)}
            />
          )}
        </span>
        <span
          style={{ cursor: "pointer", fontSize: "1rem" }}
          className="sound_cloud-current_list_three_dot"
          onClick={(e) => {
            e.stopPropagation();
            setDot((p) => !p);
          }}
          ref={clickRef}
        >
          <MoreHorizIcon style={{ fontSize: "1rem" }} />
          {dot && (
            <div className="sound_cloud-current_list_dot">
              {liked.some((like) => like._id == item?._id) ? (
                <button
                  onClick={() => dispatch({ type: "DISLIKE", payload: item })}
                  style={{
                    color: "orangered",
                  }}
                >
                  <FavoriteIcon
                    style={{
                      color: "orangered",
                      fontSize: "1rem",
                    }}
                  />{" "}
                  Liked
                </button>
              ) : (
                <button
                  onClick={() => dispatch({ type: "LIKE", payload: item })}
                >
                  {" "}
                  <FavoriteIcon
                    style={{ fontSize: "1rem", color: "black" }}
                  />{" "}
                  Like
                </button>
              )}
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
                    dispatch({ type: "REPOST", payload: item });

                    toast(`${item?.title} reposted to your feed`, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }}
                >
                  <BiRepost style={{ fontSize: "1rem", color: "black" }} />{" "}
                  Repost
                </button>
              )}
              <button onClick={handleShare}>
                <FaShareSquare style={{ fontSize: "1rem", color: "black" }} />{" "}
                Share
              </button>
              <button>
                <BiSolidPlaylist style={{ fontSize: "1rem", color: "black" }} />{" "}
                Add To next Up
              </button>
              <button
                onClick={() => {
                  const arr = [...songPlay];
                  arr.splice(i, 1);
                  setSongPlay(arr || []);
                }}
              >
                {" "}
                <Close style={{ fontSize: "1rem", color: "black" }} />
                Removefrom nextup
              </button>
              <button>
                <MdReportGmailerrorred
                  style={{ fontSize: "1rem", color: "black" }}
                />{" "}
                Report
              </button>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};
const CurrentList = ({ setShowList, currentSong }) => {
  const {
    songPlay,
    setSongPlay,
    setCurrentSongIndex,

    currentSongIndex,
    isPlaying,
  } = useContext(MyContext);
  const liked = useSelector((state) => state.likes.likes);
  const dispatch = useDispatch();
  const handleRemove = (e, i) => {
    if (i < currentSongIndex) {
      setCurrentSongIndex((p) => p - 1);
    }

    const arr = [...songPlay];
    arr.splice(i, 1);
    setSongPlay(arr);
    e.stopPropagation();
  };
  return (
    <div className="sound_cloud-current_list_container">
      <div className="sound_cloud-list_container_heading">
        <p>Next Up</p>
        <span>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (songPlay.length <= 1) return;
              setSongPlay([currentSong]);
            }}
          >
            clear
          </button>
          <Close
            style={{ cursor: "pointer" }}
            onClick={() => setShowList(false)}
          />{" "}
        </span>
      </div>
      {songPlay.map((item, i) => (
        <div key={item._id}>
          <OneSong key={item._id} item={item} i={i} />
        </div>
      ))}
    </div>
  );
};
function AudioPlayer({ songs = [] }) {
  const {
    currentSongIndex,
    setCurrentSongIndex,
    isPlaying,
    setIsPlaying,
    audioRef,
    songId,
    setSongId,
    played,
    setPlayed,
    login,
    setCurrentSongDetail,
    songPlay,
    duration,
    setDuration,
    setActive,
    currentDuration,
    setCurrentDuration,
    setLoginPage,
    setSongPlay,
  } = useContext(MyContext);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const navigate = useNavigate();

  const likes = useSelector((state) => state.likes.likes);

  const clickRef = useRef();
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(1);
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    const idx = songPlay.findIndex((item) => item._id === songId);
    if (idx != -1) setCurrentSongIndex(idx);

    setCurrentSongDetail(songs[currentSongIndex]);
  }, [songId, isPlaying]);

  useEffect(() => {
    if (songs[currentSongIndex] && songs[currentSongIndex].audio_url)
      dispatch({ type: "ADD_PLAYLIST", payload: songs[currentSongIndex] });
  }, [songId]);

  const playPauseHandler = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setIsPlaying(!isPlaying);
      audioRef.current.play();
    }
    console.log(likes);
  };

  const nextSongHandler = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setPlayed(0);
    setIsPlaying(true);
  };

  const prevSongHandler = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    setPlayed(0);
    setIsPlaying(true);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    setCurrentDuration(currentTime);
    setPlayed(currentTime / duration);
  };

  const hanldeDataLoad = () => {
    setDuration(audioRef.current.duration);
    setSongId(songs[currentSongIndex]._id);
    setRepeat(false);
  };
  const handleCurrentDuration = (e) => {
    const width = clickRef.current.clientWidth;
    const offSet = e.nativeEvent.offsetX;
    // console.log(width, offSet);
    const progress = offSet / width;
    audioRef.current.currentTime = progress * duration;
  };
  const handleEnded = () => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      setIsPlaying(true);
      return;
    }
    if (songPlay.length == 1) {
      setIsPlaying(false);
      return;
    }

    nextSongHandler();
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div className="sound_cloud-audio_player">
      <div className="sound_cloud-audio_player_left">
        <div className="sound_cloud-audio_player_icons">
          <button
            onClick={prevSongHandler}
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          >
            <ImPrevious2 />
          </button>
          <button onClick={playPauseHandler} style={{ cursor: "pointer" }}>
            {isPlaying ? <GiPauseButton /> : <FaPlay />}
          </button>
          <button
            onClick={nextSongHandler}
            style={{ fontSize: "1.2rem", cursor: "pointer" }}
          >
            <ImNext2 />
          </button>
          <button style={{ fontSize: "1.2rem", cursor: "pointer" }}>
            <BiShuffle
              onClick={() => setShuffle((p) => !p)}
              style={{ color: shuffle ? "orangered" : "black" }}
            />
          </button>
          <button
            style={{
              fontSize: "1.2rem",
              cursor: "pointer",
            }}
          >
            <BsArrowRepeat
              onClick={() => setRepeat((p) => !p)}
              style={{ color: repeat ? "orangered" : "black" }}
            />
          </button>
        </div>
        <audio
          ref={audioRef}
          src={songs[currentSongIndex]?.audio_url}
          onTimeUpdate={timeUpdateHandler}
          controls={true}
          autoPlay={true}
          loop={repeat}
          onLoadedData={hanldeDataLoad}
          className="sound_cloud-audio_player_audio"
          onEnded={handleEnded}
        />
        <div className="sound_cloud-audio_player_time_progress">
          <span>{formatTime(currentDuration)}</span>
          <div
            className="sound_cloud-audio_player_cover"
            ref={clickRef}
            onClick={handleCurrentDuration}
          >
            <div className="sound_cloud-audio_player_progress">
              <div
                className="sound_cloud-audio_player_progress_fill"
                style={{ width: `${played * 100}%` }}
              ></div>
            </div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
        <button
          className="sound_cloud-audio_player_speaker"
          style={{ cursor: "pointer" }}
        >
          {volume > 0 ? (
            volume > 0.2 ? (
              volume > 0.8 ? (
                <BsVolumeUp style={{ fontSize: "1.2rem" }} />
              ) : (
                <FiVolume2 style={{ fontSize: "1.2rem" }} />
              )
            ) : (
              <FiVolume1
                style={{ fontSize: "1.2rem" }}
                className="sound_cloud-audio_player_speaker_icon"
              />
            )
          ) : (
            <FiVolumeX style={{ fontSize: "1.2rem" }} />
          )}
          <div className="sound_cloud-audio_player_speaker_hover">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              className="sound_cloud-audio_player_rotate_spaker"
              onChange={handleVolumeChange}
            />
          </div>
        </button>
      </div>
      <div className="sound_cloud-audio_player_right">
        <div className="sound_cloud-audio_player_right_images">
          <img
            src={songs[currentSongIndex]?.thumbnail}
            alt=""
            onClick={() => navigate(`/song/${songs[currentSongIndex]._id}`)}
          />
          <div>
            <p
              onClick={() => {
                navigate("/song");
                setActive("all");
              }}
            >
              {songs[currentSongIndex]?.mood}
            </p>
            <p onClick={() => navigate(`/song/${songs[currentSongIndex]._id}`)}>
              {songs[currentSongIndex]?.title}
            </p>
          </div>
        </div>
        <div className="sound_cloud-audio_player_icons">
          <span>
            {likes.some(
              (item) => item?._id === songs[currentSongIndex]?._id
            ) ? (
              <AiFillHeart
                style={{ color: "orangered", cursor: "pointer" }}
                onClick={() =>
                  dispatch({
                    type: "DISLIKE",
                    payload: songs[currentSongIndex],
                  })
                }
              />
            ) : (
              <AiFillHeart
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (!login) {
                    setLoginPage(true);
                    return;
                  }
                  dispatch({
                    type: "LIKE",
                    payload: songs[currentSongIndex],
                  });
                }}
              />
            )}
          </span>
          <span>
            <BiSolidPlaylist
              style={{
                cursor: "pointer",
                color: showList ? "orangered" : "black",
              }}
              onClick={() => setShowList((p) => !p)}
            />
            {showList && (
              <div className="sound_cloud-current_list">
                <CurrentList
                  setShowList={setShowList}
                  currentSong={songs[currentSongIndex]}
                />
              </div>
            )}
          </span>
          <span>
            <BsFillPeopleFill />
          </span>
        </div>
      </div>
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
}

export default AudioPlayer;
