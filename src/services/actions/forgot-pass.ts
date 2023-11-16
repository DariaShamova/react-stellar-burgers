import {forgotPasswordRequest} from "../api";
export const RESTORE_FORGOT_PASS = 'RESTORE_FORGOT_PASS';

export interface IRESTORE_FORGOT_PASS {
    readonly type: typeof RESTORE_FORGOT_PASS;
    readonly payload: boolean;
}

export const RESTORE_FORGOT_PASS_ACTION = (payload: boolean): IRESTORE_FORGOT_PASS => ({
    type: RESTORE_FORGOT_PASS,
    payload: payload,
});

export function restoreForgotPass() {
    return function (dispatch: any) {
        forgotPasswordRequest()
            .then(res => {
                dispatch({
                    type: RESTORE_FORGOT_PASS,
                    payload: res
                })
            })
            .catch((er) => console.log(er));
    }
}
