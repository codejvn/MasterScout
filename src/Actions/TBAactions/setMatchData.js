import { SET_MATCH_DATA } from "../types";

export const setMatchData = (match) => {
  return (dispatch) => {
    dispatch({
      type: SET_MATCH_DATA,
      payload: match,
    });
  };
};
