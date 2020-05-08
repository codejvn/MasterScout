import { CLEAR_DATA } from "./types";
export const clearData = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_DATA,
    });
  };
};
