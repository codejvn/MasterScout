import { SEARCH_TEAM } from "./types";
export const searchTeam = (teamNum) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_TEAM,
      payload: teamNum,
    });
  };
};
