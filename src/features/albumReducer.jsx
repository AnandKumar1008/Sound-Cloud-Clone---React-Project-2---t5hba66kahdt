const initialState = {
  albums: JSON.parse(localStorage.getItem("albums")) || [],
};
const albumReducer = (state = initialState, action) => {
  let albums = [];
  switch (action.type) {
    case "ADD_ALBUM":
      const items = [...state.albums];
      if (items.some((item) => item._id == action.payload._id)) {
        return state;
      }
      albums = [action.payload, ...state.albums];
      break;

    case "REMOVE_ALBUM":
      const currentAlbum = [...state.albums];
      const index = currentAlbum.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index != -1) currentAlbum.splice(index, 1);
      albums = currentAlbum;
      break;
    default:
      return state;
  }
  localStorage.setItem("albums", JSON.stringify(albums));
  return { albums };
};
export default albumReducer;
