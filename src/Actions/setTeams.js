import { SET_TEAMS } from "./types";
import requestTBA from "./../TBACode";
export const setTeams = (eventCode) => {
  return function (dispatch) {
    let request = requestTBA("/event/" + eventCode + "/teams");
    request
      .then((res) => res.json())
      .then((teams) => {
        console.log("SETTING TEAMS");
        let orderedTeams = teams.sort((a, b) => a.team_number - b.team_number);
        let teamNums = orderedTeams.map((team) => team.team_number);
        return dispatch({
          type: SET_TEAMS,
          payload: teamNums,
        });
      });
  };
};
