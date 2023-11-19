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

export type TLoginActions = ILOGIN_ACTION | ILOGOUT_ACTION;

export const userLogin: ThunkFunc = (user: TLogin) => {
    return function (dispatch: any) {
        loginRequest(user)
            .then(res => {
                const { refreshToken, accessToken } = res;
                setCookie("access", accessToken.split("Bearer ")[1]);
                setCookie("refresh", refreshToken);
                dispatch({
                    type: LOGIN,
                    payload: res
                })
            })
            .catch((er) => console.log(er));
    }
}

export function userLogout() {
    return function (dispatch: any) {
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

