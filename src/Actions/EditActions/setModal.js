import { SET_MODAL } from "../types";
export const setModal = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_MODAL,
      payload: data,
    });
  };
};
