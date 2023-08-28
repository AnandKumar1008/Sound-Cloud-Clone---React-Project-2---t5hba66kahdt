import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { MyContext } from "../../MyContext";
import { allAlbums } from "../Album";
import RightSide from "../RightSide/RightSide";
import "./Discover.css";
const url = `https://academics.newtonschool.co/api/v1/music/song`;

const MusicList = ({ musicTitle, description, musicItem = [] }) => {
  const {
    setSongPlay,
    currentSongIndex,
    setCurrentSongIndex,
    isPlaying,
    setIsPlaying,
    setSongId,
    albumId,
    setAlbumId,
    setAllSongs,
    login,
    setLoginPage,
  } = useContext(MyContext);
  const [perPage, setPerpage] = useState(
    window.innerWidth < 900 ? (window.innerWidth < 600 ? 2.5 : 3.5) : 4.5
  );
  const albums = useSelector((state) => state.albums.albums);
  const dispatch = useDispatch();

  const apiCall = async (item) => {
    if (albumId === item._id) return;
    const albumUrl = "https://academics.newtonschool.co/api/v1/music/album/";

    console.log(albumUrl);
    console.log(albumId);
    const headers = {
      projectId: "yji0muf36wd4",
    };

    try {
      const response = await axios.get(`${albumUrl}${item?._id}`, {
        headers,
      });
      const data = response.data;
      setSongPlay(data.data.songs || []);
      setAllSongs(data.data.songs);
      setCurrentSongIndex(0);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 400) setPerpage(1.5);
      else if (window.innerWidth < 600) setPerpage(2.5);
      else if (window.innerWidth < 900) setPerpage(3.5);
      else setPerpage(4.5);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sound_cloud-discover_music">
      <div className="sound_cloud-discover_music_heading">
        <h2>{musicTitle}</h2>
        <p>{description}</p>
      </div>
      <Splide
        options={{
          drag: "free",
          focus: "center",
          perPage: perPage,
          perMove: 4,
          speed: 1000,
          gap: "1rem",
          height: "14rem",
          pagination: false,
        }}
        className="sound_cloud-discover_music_splide"
        aria-label="My Favorite Images"
      >
        {musicItem.map((item, i) => (
          <SplideSlide key={item._id}>
            <div className="sound_cloud-discover_music_splide_item">
              <div
                className="sound_cloud-discover_music_splide_item_image"
                onClick={() => {
                  setAlbumId(item._id);
                  apiCall(item);
                }}
              >
                <img src={item?.thumbnail || item?.image} alt="" />
                <div className="sound_cloud-discover_music_splide_image_cover">
                  <div className="sound_cloud-discover_music_play_btn">
                    {currentSongIndex === 0 &&
                    albumId === item._id &&
                    isPlaying ? (
                      <>
                        <BsPauseCircleFill
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
                        }}
                        onClick={() => {
                          setSongId(item._id);
                          setIsPlaying(true);
                        }}
                      />
                    )}
                  </div>
                  <div className="sound_sloud-discover_music_like_icon">
                    {albums.some((alb) => alb._id === item._id) ? (
                      <AiFillHeart
                        style={{ fontSize: "1rem", color: "orangered" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({ type: "REMOVE_ALBUM", payload: item });
                        }}
                      />
                    ) : (
                      <AiFillHeart
                        style={{ fontSize: "1rem", color: "white" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!login) {
                            setLoginPage(true);
                            return;
                          }
                          dispatch({ type: "ADD_ALBUM", payload: item });
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="sound_cloud-discover_music_list_song">
                <p>{item.title}</p>
                <p>{musicTitle}</p>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
const Discover = () => {
  const { allSongs, setAllSongs } = useContext(MyContext);
  useEffect(() => {
    try {
      const getSongs = async () => {
        const headers = {
          projectId: "yji0muf36wd4",
        };
        const res = await axios.get(`${url}`, { headers: headers });
        const data = res.data;
        console.log(data);
        setAllSongs(data.data || []);
      };
    } catch (err) {
      console.log(err);
      console.log("Error is of Api Call");
    }
  }, []);
  return (
    <div className="sound_cloud-discover">
      <div className="sound_cloud-discover_all_musics">
        <div className="sound_cloud-discover_music_part">
          <MusicList
            musicTitle={"Charts: Top 50"}
            description={"The most played tracks on SoundCloud this week"}
            musicItem={allAlbums.slice(0, 10)}
          />{" "}
          <MusicList
            musicTitle={"Charts: New & hot"}
            description={"Up-and-coming tracks on SoundCloud"}
            musicItem={allAlbums.slice(10, 20)}
          />{" "}
          <MusicList
            musicTitle={"Chill"}
            description={""}
            musicItem={allAlbums.slice(20, 30)}
          />{" "}
          <MusicList
            musicTitle={"Party"}
            description={""}
            musicItem={allAlbums.slice(30, 40)}
          />{" "}
          <MusicList
            musicTitle={"Workout"}
            description={""}
            musicItem={allAlbums.slice(40, 50)}
          />{" "}
          <MusicList
            musicTitle={"Music Therapy"}
            description={""}
            musicItem={allAlbums.slice(50, 60)}
          />{" "}
          <MusicList
            musicTitle={"Study"}
            description={""}
            musicItem={allAlbums.slice(90, 100)}
          />{" "}
          <MusicList
            musicTitle={"Feel Good"}
            description={""}
            musicItem={allAlbums.slice(60, 70)}
          />{" "}
          <MusicList
            musicTitle={"At Home"}
            description={"The most played tracks on SoundCloud this week"}
            musicItem={allAlbums.slice(70, 80)}
          />{" "}
        </div>
        <div className="sound_cloud-discover_extras">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Discover;
