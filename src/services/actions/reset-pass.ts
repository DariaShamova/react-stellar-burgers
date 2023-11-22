import {RESTORE_FORGOT_PASS} from "./forgot-pass";
import {resetPasswordRequest} from "../api";
import {ThunkFunc} from "../hooks/hooks";
export const RESET_PASS = 'RESET_PASS';

export interface IRESET_PASS_ACTION {
    type: typeof RESET_PASS;
    payload: boolean;
}

export const resetPassword: ThunkFunc = () => {
    return function (dispatch) {
        resetPasswordRequest()
            .then(res => {
                dispatch({
                    type: RESET_PASS,
                    payload: res
                })
            })
            .catch((er) => console.log(er));
    }
}