import { SELECT_TEAM } from "../types";
export const selectTeam = (num) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_TEAM,
      payload: num,
    });
  };
};
