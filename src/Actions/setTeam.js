import {SET_TEAM} from './types'
export const setTeam = (num) => {           
    return function(dispatch) {
        dispatch({
            type: SET_TEAM,
            payload: num
        })
    }
}