import { SET_AUTODOWNLOAD } from "../types";
export const setAutoDownload = (data) => {
  return (dispatch) => {
    dispatch({
      type: SET_AUTODOWNLOAD,
      payload: data,
    });
  };
};
