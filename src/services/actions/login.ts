import {loginRequest, logoutRequest} from "../api";
import {delCookie, getCookie, setCookie} from "../../utils/cookies";
import {RESTORE_FORGOT_PASS} from "./forgot-pass";
import {ThunkFunc} from "../hooks/hooks";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export type TLogin = {
    email: string;
    password: string;
};

export interface ILOGIN_ACTION {
    readonly type: typeof LOGIN;
    readonly payload: boolean;
}

export interface ILOGOUT_ACTION {
    readonly type: typeof LOGOUT;
    readonly payload: boolean;
}

export const LOGIN_ACTION = (payload: boolean): ILOGIN_ACTION => ({
    type: LOGIN,
    payload: payload,
});

export const LOGOUT_ACTION = (payload: boolean): ILOGOUT_ACTION => ({
    type: LOGOUT,
    payload: payload,
});

export type TLoginActions = ILOGIN_ACTION | ILOGOUT_ACTION;

export const userLogin: ThunkFunc = (user: TLogin) => {
    return function (dispatch: ThunkFunc) {
        loginRequest(user)
            .then(res => {
                const { success, refreshToken, accessToken } = res;
                setCookie("access", accessToken.split("Bearer ")[1]);
                setCookie("refresh", refreshToken);
                sessionStorage.setItem("login-data", JSON.stringify(res));
                dispatch({
                    type: LOGIN,
                    payload: success
                })
            })
            .catch((er) => console.log(er));
    }
}

export const userLogout: ThunkFunc = () => {
    return function (dispatch: ThunkFunc) {
        logoutRequest()
            .then(res => {
                dispatch({
                        type: LOGOUT,
                        payload: res
                    })
                sessionStorage.removeItem("login-data");
                delCookie("access");
                delCookie("refresh");
            })
            .catch((er) => console.log(er));
    }
}

