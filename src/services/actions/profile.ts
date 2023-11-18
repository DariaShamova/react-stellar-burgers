import {getProfileRequest, sendProfileRequest} from "../api";
export const GET_PROFILE_INFO = "GET_PROFILE_INFO";
export const SEND_PROFILE_INFO = "SEND_PROFILE_INFO";

type TProfile = {
    email: string;
    name: string;
};

export type TPayloadProfile = {
    success: boolean;
    user: TProfile;
};
export interface IGET_PROFILE_INFO_ACTION {
    readonly type: typeof GET_PROFILE_INFO;
    readonly payload: TPayloadProfile;
}

export interface ISEND_PROFILE_INFO_ACTION {
    readonly type: typeof SEND_PROFILE_INFO;
    readonly payload: TPayloadProfile;
}

export type TProfileActions = IGET_PROFILE_INFO_ACTION | ISEND_PROFILE_INFO_ACTION;

export function getProfileInfo() {
    return function (dispatch: any) {
        getProfileRequest()
            .then(res => {
                dispatch({
                    type: GET_PROFILE_INFO,
                    payload: res
                })
            })
    }
}

export function sendProfileInfo(name: string, email: string, password: string) {
    return function (dispatch: any) {
        sendProfileRequest(name, email, password)
            .then(res => {
                dispatch({
                    type: SEND_PROFILE_INFO,
                    payload: res
                })
            })
            .catch((er) => console.log(er));
    }
}



