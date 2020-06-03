import { SET_TEAM } from "../Actions/types";
import { SET_EVENTS } from "../Actions/types";
import { SET_EVENT } from "../Actions/types";
import { SET_SCHEDULE } from "../Actions/types";
import { SET_TEAMS } from "../Actions/types";
import { SET_TBA } from "../Actions/types";
const tbaInitState = {
  currentTeam: "",
  schedule: [],
  teams: "",
  events: ["", "", "", "", ""],
  event: "",
};
const tbaReducer = (state = tbaInitState, action = {}) => {
  switch (action.type) {
    case SET_TEAMS:
      return {
        ...state,
        teams: action.payload,
      };
    case SET_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    // return new event
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case SET_TEAM:
      return {
        ...state,
        currentTeam: action.payload,
      };
    case SET_TBA:
      return action.payload;
    default:
      return state;
  }
};
export default tbaReducer;
