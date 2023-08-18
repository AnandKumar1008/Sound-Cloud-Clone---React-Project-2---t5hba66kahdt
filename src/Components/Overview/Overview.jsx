import React from "react";
import MusicCaterogy from "../MusicCategory/MusicCategory";
import "./Overview.css";
import { useSelector } from "react-redux";
import { Footer } from "../Sound/Sound";
const arr = [];
const Overview = () => {
  const select = useSelector((state) => state.playlists.playlists);
  const liked = useSelector((state) => state.likes.likes);
  const albums = useSelector((state) => state.albums.albums);
  return (
    <div className="sound_cloud-overview">
      <MusicCaterogy
        title={"RecentlyPlayed"}
        list={[
          ...select.slice(0, 6),
          ...new Array(Math.max(0, 6 - select.length)).fill({}),
        ]}
      />
      <MusicCaterogy
        title={"Likes"}
        list={[
          ...liked.slice(0, 6),
          ...new Array(Math.max(0, 6 - liked.length)).fill({}),
        ]}
      />
      {/* <Likes /> */}
      <MusicCaterogy
        title={"PlayLists"}
        list={[
          ...arr.slice(0, 6),
          ...new Array(Math.max(0, 6 - arr.length)).fill({}),
        ]}
      />
      <MusicCaterogy
        title={"Albums"}
        list={[
          ...albums.slice(0, 6),
          ...new Array(Math.max(0, 6 - albums.length)).fill({}),
        ]}
      />
      {/* {<Albums />} */}
      <MusicCaterogy
        title={"Liked Stations"}
        list={[
          ...arr.slice(0, 6),
          ...new Array(Math.max(0, 6 - arr.length)).fill({}),
        ]}
      />
      <MusicCaterogy
        title={"Following"}
        list={[
          ...arr.slice(0, 6),
          ...new Array(Math.max(0, 6 - arr.length)).fill({}),
        ]}
      />

      <Footer />
    </div>
  );
};

export default Overview;
