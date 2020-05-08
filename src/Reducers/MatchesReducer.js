// import all types
import { SET_MATCH } from "../Actions/types";
import { SET_MATCH_DATA } from "../Actions/types";
const matchesInitState = {
  currentMatch: 1,
  matchData: {},
  matchCodes: [],
};
const matchesReducer = (state = matchesInitState, action = {}) => {
  switch (action.type) {
    case SET_MATCH:
      return {
        ...state,
        currentMatch: action.payload,
      };
    case SET_MATCH_DATA:
      let newMatchCodes = [];
      for (let i = 0; i < 3; i++) {
        // 6 teams
        let code = JSON.stringify({
          matchNum: state.currentMatch,
          teamNum: action.payload.alliances.blue.team_keys[i].slice(3),
        });
        newMatchCodes.push(code);
      }
      for (let i = 0; i < 3; i++) {
        // 6 teams
        let code = JSON.stringify({
          matchNum: state.currentMatch,
          teamNum: action.payload.alliances.red.team_keys[i].slice(3),
        });
        newMatchCodes.push(code);
      }
      return {
        ...state,
        matchData: action.payload,
        matchCodes: newMatchCodes,
      };
    default:
      return state;
  }
};
export default matchesReducer;
