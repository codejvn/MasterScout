import tbaReducer from "./TBAReducer";
import matchesReducer from "./MatchesReducer";
import importReducer from "./ImportReducer";
import dataReducer from "./DataReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  thebluealliance: tbaReducer,
  matches: matchesReducer,
  importer: importReducer,
  dataReducer: dataReducer,
});

export default rootReducer;
