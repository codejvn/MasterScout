import {SET_EVENTS} from './types'
import requestTBA from './../TBACode'
export const setEvents = (teamNum) => {   
    return function(dispatch) {
        let request = requestTBA("/team/frc"+teamNum+"/events/2020");
        request.then(res => res.json()).
        then( (event) => {
            return (dispatch({
                type: SET_EVENTS,
                payload: event
            }))
        })
    }
}