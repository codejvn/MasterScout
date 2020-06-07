import { REMOVE_FROM_PICKLIST } from "./types";
export const removeFromPicklist = (teamNum) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_PICKLIST,
      payload: teamNum,
    });
  };
};
