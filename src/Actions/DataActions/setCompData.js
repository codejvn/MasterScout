import { SET_COMPDATA } from "../types";
export const setCompData = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_COMPDATA,
      payload: data,
    });
  };
};
