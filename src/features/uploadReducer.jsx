const initialState = {
  uploads: [],
};
const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD":
      return {
        uploads: [action.payload, ...state.uploads],
      };
    default:
      return state;
  }
};
export default uploadReducer;
