import { SELECT_DATA_TO_EDIT } from "../types";
export const selectEditData = (data) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_DATA_TO_EDIT,
      payload: data,
    });
  };
};
