import { SET_MODAL } from "../types";
export const setModal = (data, save) => {
  return (dispatch) => {
    dispatch({
      type: SET_MODAL,
      payload: data,
      save: save,
    });
  };
};
