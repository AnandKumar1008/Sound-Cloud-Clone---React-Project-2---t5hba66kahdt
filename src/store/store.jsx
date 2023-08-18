import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "../features/likeReducer";
import playListReducer from "../features/playListReducer";
import albumReducer from "../features/albumReducer";
import repostReducer from "../features/repostReducer";
import uploadReducer from "../features/uploadReducer";
const rootReducer = {
  likes: likeReducer,
  playlists: playListReducer,
  albums: albumReducer,
  reposts: repostReducer,
  uploads: uploadReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
