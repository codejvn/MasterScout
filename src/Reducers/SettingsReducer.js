import { SET_AUTODOWNLOAD } from "../Actions/types";
const settingsInit = {
  autoDownload: true,
};
const searchReducer = (state = settingsInit, action = {}) => {
  switch (action.type) {
    case SET_AUTODOWNLOAD:
      return {
        ...state,
        autoDownload: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
