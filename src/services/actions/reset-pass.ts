import {RESTORE_FORGOT_PASS} from "./forgot-pass";
import {resetPasswordRequest} from "../api";
export const RESET_PASS = 'RESET_PASS';

export interface IRESET_PASS_ACTION {
    type: typeof RESET_PASS;
    payload: boolean;
}

export function resetPassword() {
    return function (dispatch: any) {
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