import {getProfileRequest, sendProfileRequest} from "../api";
export const GET_PROFILE_INFO = "GET_PROFILE_INFO";
export const SEND_PROFILE_INFO = "SEND_PROFILE_INFO";

export function getProfileInfo() {
    return function (dispatch) {
        getProfileRequest()
            .then(res => {
                dispatch({
                    type: GET_PROFILE_INFO,
                    payload: res
                })
            })
    }
}

export function sendProfileInfo() {
    return function (dispatch) {
        sendProfileRequest()
            .then(res => {
                dispatch({
                    type: SEND_PROFILE_INFO,
                    payload: res
                })
            })
    }
}



