import { SELECT_TEAM } from "../Actions/types";
import { CLEAR_TEAMS } from "../Actions/types";
import { REMOVE_TEAM } from "../Actions/types";
import Team from "./Team";
const searchInit = {
  selectedTeams: [],
};
const compareReducer = (state = searchInit, action = {}) => {
  switch (action.type) {
    case SELECT_TEAM:
      try{
      let current = state.selectedTeams;
      console.log("current state in compare reducer");
      console.log(current);
      current.push(action.payload);
      return {
        ...state,
        selectedTeams: current,
      };
    }
    catch{
      return{...state};
    }
    case CLEAR_TEAMS:
      return {
        ...state,
        selectedTeams: [],
      };
    case REMOVE_TEAM:
      let now = state.selectedTeams;
      now.splice(
        now.findIndex((el) => el == action.payload),
        1
      );
      return {
        ...state,
        selectedTeams: now,
      };
    default:
      return state;
  }
};

export default compareReducer;
