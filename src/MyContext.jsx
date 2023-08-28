import { createContext, useState, useRef } from "react";

export const MyContext = createContext();
const MyProvider = ({ children }) => {
  const [songPlay, setSongPlay] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [songId, setSongId] = useState(0);
  const [played, setPlayed] = useState(0);
  const [currentSongDetail, setCurrentSongDetail] = useState({});
  const [allSongs, setAllSongs] = useState([]);
  const audioRef = useRef(null);
  const [currentAlbum, setCurrentAlbum] = useState();
  const [searchedItems, setSearchedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState(0);
  const [loginPage, setLoginPage] = useState(false);
  const [albumId, setAlbumId] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState(
    JSON.parse(localStorage.getItem("sound_cloud_google"))?.userPhoto || ""
  );
  const [login, setLogin] = useState(false);
  const [active, setActive] = useState("all");
  const [hover, setHover] = useState("overview");
  const [createAccount, setCreateAccount] = useState(false);
  const [allComment, setAllComment] = useState(
    JSON.parse(localStorage.getItem("allComment")) || {}
  );
  // const [search, setSearch] = useState("");
  const [currentDuration, setCurrentDuration] = useState(0);
  return (
    <MyContext.Provider
      value={{
        songPlay,
        setSongPlay,
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying,
        songId,
        setSongId,
        audioRef,
        played,
        setPlayed,
        currentSongDetail,
        setCurrentSongDetail,
        allSongs,
        setAllSongs,
        currentAlbum,
        setCurrentAlbum,
        searchedItems,
        setSearchedItems,
        search,
        setSearch,
        duration,
        setDuration,
        loginPage,
        setLoginPage,
        albumId,
        setAlbumId,
        userName,
        setUserName,
        userPhoto,
        setUserPhoto,
        login,
        setLogin,
        active,
        setActive,
        hover,
        setHover,
        currentDuration,
        setCurrentDuration,
        createAccount,
        setCreateAccount,
        allComment,
        setAllComment,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
