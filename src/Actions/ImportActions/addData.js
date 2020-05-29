import { ADD_DATA } from "../types";
export const addData = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_DATA,
      payload: data,
    });
  };
};
