import { AGGREGATE_ALL } from "../types";
export const aggregateAll = () => {
  return (dispatch) => {
    dispatch({
      type: AGGREGATE_ALL,
    });
  };
};
