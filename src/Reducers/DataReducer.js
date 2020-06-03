// import types
import Team from "./Team";
import { SET_TEAMS } from "../Actions/types";
import { ADDPEND_MATCHDATA } from "../Actions/types";
import { SET_MATCHDATA } from "../Actions/types";

const dataInitState = {
  teams: [new Team(2590, 0)],
};
const dataReducer = (state = dataInitState, action = {}) => {
  switch (action.type) {
    case SET_TEAMS:
      let newTeams = [];
      for (const teamNum of action.payload) {
        newTeams.push(new Team(teamNum, newTeams.length));
      }
      return {
        ...state,
        teams: newTeams,
      };
      break;
    // break up the data into an array with the teams that do not need to be updated and then the teams that do, add the data,
    // create a new final array that mashes these together
    case ADDPEND_MATCHDATA:
      let teams = state.teams;
      for (const matchDataObj of action.payload) {
        let index = teams.findIndex(
          (team) => team.teamNumber == matchDataObj.teamNum
        );
        teams[index].appendData(matchDataObj);
        teams[index].aggregate();
      }
      return {
        ...state,
        teams: teams,
      };
    case SET_MATCHDATA:
      return {
        ...state,
        teams: action.payload,
      };
    default:
      return state;
  }
};
export default dataReducer;
