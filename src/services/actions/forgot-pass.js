import {forgotPasswordRequest} from "../api";
export const RESTORE_FORGOT_PASS = 'RESTORE_FORGOT_PASS';

export function restoreForgotPass() {
    return function (dispatch) {
        forgotPasswordRequest()
            .then(res => {
                dispatch({
                    type: RESTORE_FORGOT_PASS,
                    payload: res
                })
            })
    }
}
