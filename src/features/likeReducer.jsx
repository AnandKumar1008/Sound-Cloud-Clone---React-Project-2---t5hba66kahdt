const initialState = {
  likes: JSON.parse(localStorage.getItem("likes")) || [],
};
const likeReducer = (state = initialState, action) => {
  let likes = [];
  switch (action.type) {
    case "LIKE":
      likes = state.likes;
      if (!state.likes.some((item) => item._id == action.payload._id)) {
        likes = [action.payload, ...state.likes];
      }
      // return state;
      break;
    case "DISLIKE":
      const arr = [...state.likes];
      const index = arr.findIndex((item) => item._id === action.payload._id);
      if (index != -1) arr.splice(index, 1);
      likes = arr;
      break;
    // return {
    //   likes: arr,
    // };
    default:
      return state;
  }
  localStorage.setItem("likes", JSON.stringify(likes));
  return { likes };
};
export default likeReducer;
