import { SET_MATCH } from "../types";
export const setMatch = (matchNum) => {
  return (dispatch) => {
    dispatch({
      type: SET_MATCH,
      payload: matchNum,
    });
  };
};
