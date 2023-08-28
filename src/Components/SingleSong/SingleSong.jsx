import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { LuLink2, LuRepeat2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../../MyContext";
import bg from "../Images/bg1.jpg";
import "./SingleSong.css";

const SingleSong = () => {
  const { id } = useParams();
  const {
    played,
    currentSongDetail,
    setCurrentSongDetail,
    isPlaying,
    setSongPlay,
    setIsPlaying,
    setSongId,
    audioRef,
    duration,
    currentDuration,
    login,
    setLoginPage,
    allComment,
    setAllComment,
    songId,
    userPhoto,
  } = useContext(MyContext);
  const navigate = useNavigate();

  const [inp, setInp] = useState("");
  const clickRef = useRef();
  const liked = useSelector((state) => state.likes.likes);
  const repost = useSelector((state) => state.reposts.reposts);
  const dispatch = useDispatch();
  const handleCurrentDuration = (e) => {
    const width = clickRef.current.clientWidth;
    const offSet = e.nativeEvent.offsetX;
    const progress = offSet / width;
    audioRef.current.currentTime = progress * duration;
  };
  useEffect(() => {
    if (!allComment[songId]) {
      // const
      setAllComment({ ...allComment, [songId]: [] });
    }
    const fetchData = async () => {
      const projectId = "yji0muf36wd4";

      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/music/song/${songId}`,
          {
            method: "GET",
            headers: {
              projectId: projectId,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCurrentSongDetail(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (!songId) setSongId(id);
    navigate(`/song/${songId}`);
    fetchData();
  }, [songId]);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: currentSongDetail?.title,
          text: currentSongDetail?.mood,
          url: currentSongDetail?.audio_url,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      console.log("Sharing not supported on this browser.");
    }
  };
  const handleCopy = () => {
    navigator.clipboard
      .writeText(currentSongDetail.audio_url)
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
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      if (!login) {
        setLoginPage(true);
        return;
      }
      if (!inp) return;
      setInp("");

      setAllComment({
        ...allComment,
        [songId]: [
          { time: formatTime(duration), img: userPhoto, text: inp },
          ...allComment[songId],
        ],
      });
      localStorage.setItem(
        "allComment",
        JSON.stringify({
          ...allComment,
          [songId]: [
            { time: formatTime(duration), img: userPhoto, text: inp },
            ...allComment[songId],
          ],
        })
      );
    }
  };
  return (
    <div className="sound_cloud-single_song">
      <div className="sound_cloud-single_song_bg">
        <img src={bg} alt="" />
        <div className="sound_cloud-single_song_track">
          <div className="sound_sloud-single_song_left">
            <div className="sound_cloud-single_song_heading">
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
          {login && (
            <img
              style={{ height: "2rem", width: "2rem" }}
              src={userPhoto}
              alt=""
            />
          )}
          <div className="sound_cloud-single_song_comment">
            <input
              type="text"
              placeholder="write a comment"
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
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
          <button title="Share" onClick={handleShare}>
            {" "}
            <FaShareSquare />
            share
          </button>
          <button title="Copy More" onClick={handleCopy}>
            <LuLink2 style={{ fontSize: "1rem" }} />
            Copy More
          </button>
        </div>
        <>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--color-para-text)",
              margin: "2rem ",
            }}
          >
            {" "}
            {allComment[songId]?.length} comments{" "}
          </p>
          {allComment[songId]?.map((item, i) => (
            <div key={i} className="sound_cloud_single_song_comment">
              <div className="sound_single_song_cloud-comment_img">
                <img src={item?.img} alt="" />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-para-text)",
                  }}
                >
                  You at {item?.time}{" "}
                </p>
                <p style={{ fontSize: "0.8rem" }}>{item.text}</p>
              </div>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default SingleSong;
