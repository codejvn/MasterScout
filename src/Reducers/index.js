import tbaReducer from "./TBAReducer";
import matchesReducer from "./MatchesReducer";
import importReducer from "./ImportReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  thebluealliance: tbaReducer,
  matches: matchesReducer,
  importer: importReducer,
});

export default rootReducer;
