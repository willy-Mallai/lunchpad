const initialState = {
  name: "",
  email: "",
  username: "",
  bio: "",
  photo: null,
};
function profileReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "UPDATE_PHOTO":
      return {
        ...state,
        photo: action.payload,
      };

    case "SAVE_PROFILE":
      console.log("Saving complete state:", state);
      return state;
    default:
      return state;
  }
}
export { profileReducer, initialState };
