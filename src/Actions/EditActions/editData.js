import { EDIT_DATA } from "../types";
export const editData = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_DATA,
      value: data.value,
      section: data.section,
      dataId: data.dataId,
    });
  };
};
