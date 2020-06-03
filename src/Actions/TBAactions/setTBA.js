import { SET_TBA } from "../types";
export const setTBA = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_TBA,
      payload: data,
    });
  };
};
