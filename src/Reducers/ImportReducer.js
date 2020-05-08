// import all types
import { ADD_DATA } from "../Actions/types";
import { MODIFY_DATA } from "../Actions/types";
import { CLEAR_DATA } from "../Actions/types";

const matchesInitState = {
  data: [],
};
const importReducer = (state = matchesInitState, action = {}) => {
  switch (action.type) {
    case ADD_DATA:
      let newData = state.data;
      let parsedData = JSON.parse(action.payload);
      newData.unshift(parsedData);
      console.log("ADDING THAT DATA!");
      return {
        data: newData,
      };
      break;
    case MODIFY_DATA:
      let newDataSet = state.data;
      newDataSet[action.payload.num] = action.payload.data;
      return {
        data: newDataSet,
      };
      break;
    case CLEAR_DATA:
      return {
        data: [],
      };
      break;
    default:
      return state;
  }
};
export default importReducer;
