import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import Track from "../../Components/Track/Track";
import { MyContext } from "../../MyContext";
import "./SearchResult.css";
const SearchResult = () => {
  const { searchedItems, setSongPlay, setIsPlaying, search, setSearch } =
    useContext(MyContext);
  useEffect(() => {
    setSongPlay(searchedItems || []);
    setIsPlaying(false);
    return () => {
      setSearch("");
    };
  }, [searchedItems]);
  return (
    <div className="sound_cloud-search_result">
      <div className="sound_cloud-search_result_heading">
        <h1>Searched Result for "{search}"</h1>
      </div>
      {searchedItems.map((item, i, self) => (
        <div key={item._id} className="sound_cloud-search_result_each_track">
          <Track key={item._id} index={i} song={item} self={self} />
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
