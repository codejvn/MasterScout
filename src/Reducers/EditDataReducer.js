import { SELECT_DATA_TO_EDIT } from "../Actions/types";
import { EDIT_DATA } from "../Actions/types";
import { CLEAR_EDIT } from "../Actions/types";
import { SET_MODAL } from "../Actions/types";
import { EDIT_TEAM } from "../Actions/types";
const modRawDataInit = {
  originalData: null,
  editedData: null,
  showModal: false,
  team: -1,
};
const editDataReducer = (state = modRawDataInit, action = {}) => {
  switch (action.type) {
    case SET_MODAL:
      if (!action.payload && !action.save) {
        return {
          ...state,
          editedData: state.originalData,
          showModal: action.payload,
        };
      } else {
        return {
          ...state,
          showModal: action.payload,
        };
      }
    case SELECT_DATA_TO_EDIT:
      return {
        ...state,
        originalData: action.payload,
        editedData: action.payload,
      };
    case EDIT_DATA:
      let copy = state.editedData;
      console.log(copy);
      console.log(action);
      switch (action.section) {
        case 0:
          copy.data.auto[action.dataId].value = action.value;
          break;
        case 1:
          copy.data.teleop[action.dataId].value = action.value;
          break;
        case 2:
          copy.data.endgame[action.dataId - 12].value = action.value;
          break;
      }
      return {
        ...state,
        editedData: copy,
      };
    case EDIT_TEAM:
      return {
        ...state,
        team: action.payload,
      };
    case CLEAR_EDIT:
      return {
        ...state,
        originalData: {},
        editedData: {},
      };
    default:
      return state;
  }
};

export default editDataReducer;
