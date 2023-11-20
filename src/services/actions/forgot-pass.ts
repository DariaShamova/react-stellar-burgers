import {forgotPasswordRequest} from "../api";
import {ThunkFunc} from "../hooks/hooks";
export const RESTORE_FORGOT_PASS = 'RESTORE_FORGOT_PASS';

export interface IRESTORE_FORGOT_PASS {
    readonly type: typeof RESTORE_FORGOT_PASS;
    readonly payload: boolean;
}

export const RESTORE_FORGOT_PASS_ACTION = (payload: boolean): IRESTORE_FORGOT_PASS => ({
    type: RESTORE_FORGOT_PASS,
    payload: payload,
});

export const restoreForgotPass: ThunkFunc = () => {
    return function (dispatch: ThunkFunc) {
        forgotPasswordRequest()
            .then(res => {
                dispatch({
                    payload: res,
                    type: RESTORE_FORGOT_PASS
                })
            })
            .catch((er) => console.log(er));
    }
}
