import { SEARCH_TEAM } from "../Actions/types";
const searchInit = {
  teamSearched: "",
};
const tbaReducer = (state = searchInit, action = {}) => {
  switch (action.type) {
    case SEARCH_TEAM:
      return {
        ...state,
        teamSearched: action.payload,
      };
    default:
      return state;
  }
};

export default tbaReducer;
