import {RESTORE_FORGOT_PASS} from "./forgot-pass";
import {resetPasswordRequest} from "../api";
export const RESET_PASS = 'RESET_PASS';

export function resetPassword() {
    return function (dispatch) {
        resetPasswordRequest()
            .then(res => {
                dispatch({
                    type: RESET_PASS,
                    payload: res
                })
            })
    }
}