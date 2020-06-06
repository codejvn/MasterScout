import { EDIT_TEAM } from "../types";
export const editTeam = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_TEAM,
      payload: data,
    });
  };
};
