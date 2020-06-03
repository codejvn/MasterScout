import { SET_AUTODOWNLOAD } from "../Actions/types";
import { SET_IMPORTFILE } from "../Actions/types";
const settingsInit = {
  autoDownload: true,
  attachedFile: null,
};
const searchReducer = (state = settingsInit, action = {}) => {
  switch (action.type) {
    case SET_AUTODOWNLOAD:
      return {
        ...state,
        autoDownload: action.payload,
      };
    case SET_IMPORTFILE:
      return {
        ...state,
        attachedFile: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
