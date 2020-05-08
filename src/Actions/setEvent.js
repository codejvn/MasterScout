import {SET_EVENT} from './types'
export const setEvent = (event) => {
    return function(dispatch) {
        console.log("SETTING EVENT");
        dispatch({
            type: SET_EVENT,
            payload: event
        })
    }
}