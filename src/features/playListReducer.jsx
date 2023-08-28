const initialState = {
  playlists: JSON.parse(localStorage.getItem("playlists")) || [],
};

const playListReducer = (state = initialState, action) => {
  if (!action.payload) return state;
  let playlists = [];
  switch (action.type) {
    case "ADD_PLAYLIST":
      const newPlaylistItem = action.payload;

      // Check if the new playlists item's ID already exists in the playlists
      if (!newPlaylistItem || !newPlaylistItem._id) return { ...state };
      const existingIndex = state.playlists.findIndex(
        (item) => item?._id === newPlaylistItem?._id
      );

      if (existingIndex !== -1) {
        // If it's a duplicate, remove it from the existing position
        const updatedPlaylist = [...state.playlists];
        updatedPlaylist.splice(existingIndex, 1);
        // Then add it to the beginning
        updatedPlaylist.unshift(newPlaylistItem);
        playlists = updatedPlaylist;
        break;
        // return {
        //   playlists: updatedPlaylist,
        // };
      } else {
        // return {
        //   playlists: [newPlaylistItem, ...state.playlists],
        // };
        playlists = [newPlaylistItem, ...state.playlists];
        break;
      }

    default:
      return state;
  }
  localStorage.setItem("playlists", JSON.stringify(playlists));
  return { playlists };
};

export default playListReducer;
