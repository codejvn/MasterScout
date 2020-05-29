import { ADDPEND_MATCHDATA } from "../types";
export const appendMatchData = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADDPEND_MATCHDATA,
      payload: data,
    });
  };
};
