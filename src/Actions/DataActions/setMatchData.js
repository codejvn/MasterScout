import { SET_MATCHDATA } from "../types";
export const setMatchData = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_MATCHDATA,
      payload: data,
    });
  };
};
