import { CLEAR_TEAMS } from "../types";
export const clearTeams = (data) => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_TEAMS,
    });
  };
};
