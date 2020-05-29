import { SET_SCHEDULE } from "../types";
import requestTBA from "../../TBACode";
export const setSchedule = (eventCode) => {
  return function (dispatch) {
    let request = requestTBA("/event/" + eventCode + "/matches/simple");
    request
      .then((res) => res.json())
      .then((schedule) => {
        console.log("SETTING SCHEDULE");
        let orderedSchedule = schedule.sort(
          (a, b) => a.match_number - b.match_number
        );
        orderedSchedule = orderedSchedule.filter(
          (match) => match.comp_level == "qm"
        );
        return dispatch({
          type: SET_SCHEDULE,
          payload: orderedSchedule,
        });
      });
  };
};
