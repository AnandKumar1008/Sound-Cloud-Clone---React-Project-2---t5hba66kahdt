import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Track from "../../Components/Track/Track";
import { MyContext } from "../../MyContext";
import "./SearchResult.css";
const SearchResult = () => {
  const { searchedItems, setSongPlay, setIsPlaying, search, setSearch } =
    useContext(MyContext);
  const recent = useSelector((state) => state.playlists.playlists);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    setSongPlay(searchedItems || []);
    setIsPlaying(false);
    console.log(recent);
    return () => {
      setSearch("");
    };
  }, [searchedItems]);
  return (
    <div className="sound_cloud-search_result">
      <div className="sound_cloud-search_result_heading">
        <h1>Searched Result for "{search}"</h1>
      </div>
      {searchedItems.map((item, i) => (
        <div key={item._id} className="sound_cloud-search_result_each_track">
          <Track key={item._id} index={i} song={item} />
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
