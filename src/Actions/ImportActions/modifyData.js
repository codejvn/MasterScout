import { MODIFY_DATA } from "../types";
export const modifyData = (data) => {
  return (dispatch) => {
    dispatch({
      type: MODIFY_DATA,
      section: data.section,
      dataId: data.dataId,
      data: data.data,
      num: data.num,
    });
  };
};
