import { SET_IMPORTFILE } from "../types";
export const setImportFile = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_IMPORTFILE,
      payload: data,
    });
  };
};
