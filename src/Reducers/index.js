import tbaReducer from "./TBAReducer";
import matchesReducer from "./MatchesReducer";
import importReducer from "./ImportReducer";
import dataReducer from "./DataReducer";
import searchReducer from "./SearchReducer";
import compareReducer from "./CompareReducer";
import settingsReducer from "./SettingsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  thebluealliance: tbaReducer,
  matches: matchesReducer,
  importer: importReducer,
  dataReducer: dataReducer,
  search: searchReducer,
  compare: compareReducer,
  settings: settingsReducer,
});

export default rootReducer;
