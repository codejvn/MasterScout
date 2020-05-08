import { setTeam } from "../Actions/setTeam";
import { SET_TEAM } from "../Actions/types";
import { SET_EVENTS } from "../Actions/types";
import { SET_EVENT } from "../Actions/types";
import { SET_SCHEDULE } from "../Actions/types";

const tbaInitState = {
  currentTeam: "",
  schedule: [],
  teams: "",
  events: ["", "", "", "", ""],
  event: "",
};
const tbaReducer = (state = tbaInitState, action = {}) => {
  switch (action.type) {
    case SET_EVENT:
      return {
        ...state,
        event: action.payload,
      };
      // return new event
      break;
    case SET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
      break;
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
      break;
    case SET_TEAM:
      return {
        ...state,
        currentTeam: action.payload,
      };
    default:
      return state;
  }
};
export default tbaReducer;
