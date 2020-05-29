import { SELECT_TEAM } from "../Actions/types";
import { CLEAR_TEAMS } from "../Actions/types";
import { REMOVE_TEAM } from "../Actions/types";
const searchInit = {
  selectedTeams: [],
};
const compareReducer = (state = searchInit, action = {}) => {
  switch (action.type) {
    case SELECT_TEAM:
      let current = state.selectedTeams;
      current.push(action.payload);
      return {
        ...state,
        selectedTeams: current,
      };
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
        selectedTeams: current,
      };
    default:
      return state;
  }
};

export default compareReducer;
