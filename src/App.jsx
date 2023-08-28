import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

import Albums from "./Components/Albums/Albums";
import AudioPlayer from "./Components/AudioPlayer/AudioPlayer";
import Following from "./Components/Following/Following";
import History from "./Components/History/History";
import Likes from "./Components/Likes/Likes";
import Nav from "./Components/Nav/Nav";
import Overview from "./Components/Overview/Overview";
import PlayLists from "./Components/PlayLists/PlayLists";
import Sound from "./Components/Sound/Sound";
import Stations from "./Components/Stations/Stations";
import Feed from "./Pages/Feed/Feed";
import Home from "./Pages/Home/Home";
import Library from "./Pages/Llibrary/Library";
import SingleSong from "./Components/SingleSong/SingleSong";
import Upload from "./Components/Upload/Upload";
import { MyContext } from "./MyContext";
import CreateAccount from "./Pages/CreateAccount/CreateAccount";
import Login from "./Pages/Login/Login";
import All from "./Pages/Songs/All/All";
import PopularTrack from "./Pages/Songs/PopularTrack/PopularTrack";
import Reports from "./Pages/Songs/Reposts/Reports";
import Songs from "./Pages/Songs/Songs";
import TrackAlbum from "./Pages/Songs/TrackAlbum/TrackAlbum";
import TrackList from "./Pages/Songs/TrackLIst/TrackList";
import Tracks from "./Pages/Songs/Tracks/Tracks";
import TryNextPro from "./Pages/TryNextPro/TryNextPro";
import SearchResult from "./cover/SearchResult/SearchResult";
import Notification from "./Components/Notification/Notification";
import Messages from "./Components/Messages/Messages";

const App = () => {
  const {
    songPlay,
    setLogin,
    setUserName,
    loginPage,
    setUserPhoto,
    createAccount,
  } = useContext(MyContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const root = document.getElementById("root");
    const user = JSON.parse(localStorage.getItem("sound_cloud_google")) || "";
    const token = JSON.parse(localStorage.getItem("sound_cloud_token")) || "";
    if (user.userPhoto || token) {
      setLogin(true);
      setUserName(user?.userName);
      setUserPhoto(user?.userPhoto);
      if (location.pathname === "/") navigate("/home");
    }

    root.classList.add("light-theme");
  }, []);

  return (
    <div className="sound_cloud-app">
      {location.pathname === "/" ? "" : <Nav />}

      <div className="sound_cloud-routes">
        <Routes>
          <Route path="/" element={<Sound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/library" element={<Library />}>
            <Route path="" element={<Overview />} />
            <Route path="likes" element={<Likes />} />
            <Route path="playlists" element={<PlayLists />} />
            <Route path="albums" element={<Albums />} />
            <Route path="stations" element={<Stations />} />
            <Route path="following" element={<Following />} />
            <Route path="history" element={<History />} />
          </Route>
          <Route path="/upload" element={<Upload />} />
          <Route path="/song" element={<Songs />}>
            <Route path="" element={<All />} />
            <Route path="populartracks" element={<PopularTrack />} />
            <Route path="tracks" element={<Tracks />} />
            <Route path="albums" element={<TrackAlbum />} />
            <Route path="playlists" element={<TrackList />} />
            <Route path="reposts" element={<Reports />} />
          </Route>
          <Route path="/song/:id" element={<SingleSong />} />

          <Route path="/search" element={<SearchResult />} />
          <Route path="/track" element={<SingleSong />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/message" element={<Messages />} />
        </Routes>
      </div>

      <Routes>
        <Route path="/nextpro" element={<TryNextPro />} />
      </Routes>

      {createAccount ? <CreateAccount /> : <Login />}
      {songPlay.length != 0 && (
        <div className="sound_cloud-app_audio_player">
          <AudioPlayer songs={songPlay} />
        </div>
      )}
    </div>
  );
};

export default App;
