// import types
import Team from "./Team";
import { SET_TEAMS } from "../Actions/types";
import { ADD_DATA } from "../Actions/types";

const dataInitState = {
  teams: [],
};
const dataReducer = (state = dataInitState, action = {}) => {
  switch (action.type) {
    case SET_TEAMS:
      let newTeams = [];
      for (let teamNum in action.payload) {
        newTeams.push(new Team(teamNum, newTeams.length));
      }
      return {
        ...state,
        teams: newTeams,
      };
      break;
    // break up the data into an array with the teams that do not need to be updated and then the teams that do, add the data,
    // create a new final array that mashes these together
    case "addData":
      return {};
    default:
      return state;
  }
};
export default dataReducer;
