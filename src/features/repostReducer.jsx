const initialState = {
  reposts: JSON.parse(localStorage.getItem("reposts")) || [],
};
const repostReducer = (state = initialState, action) => {
  if (!action.payload) return state;
  let reposts = [];
  switch (action.type) {
    case "REPOST":
      if (!state.reposts.some((item) => item._id == action.payload._id)) {
        reposts = [action.payload, ...state.reposts];
        break;
      }
      reposts = [...state.reposts];
      break;
    case "REMOVE_REPOST":
      const arr = [...state.reposts];
      const index = arr.findIndex((item) => item._id === action.payload._id);
      arr.splice(index, 1);
      reposts = arr;
      break;
    default:
      return state;
  }
  localStorage.setItem("reposts", JSON.stringify(reposts));
  return { reposts };
};
export default repostReducer;
