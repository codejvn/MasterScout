import { REMOVE_TEAM } from "../types";
export const removeTeam = (num) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_TEAM,
      payload: num,
    });
  };
};
