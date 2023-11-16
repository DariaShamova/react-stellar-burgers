import {loginRequest, logoutRequest} from "../api";
import {delCookie, getCookie, setCookie} from "../../utils/cookies";
import {RESTORE_FORGOT_PASS} from "./forgot-pass";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

type TLogin = {
    email: string;
    password: string;
};

interface ILOGIN_ACTION {
    readonly type: typeof LOGIN;
    readonly payload: boolean;
}

interface ILOGOUT_ACTION {
    readonly type: typeof LOGOUT;
    readonly payload: boolean;
}

export type TLoginActions = ILOGIN_ACTION | ILOGOUT_ACTION;

export function userLogin(user: TLogin) {
    return function (dispatch: any) {
        loginRequest(user)
            .then(res => {
                const { success, refreshToken, accessToken } = res;
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
                const { success } = res;
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

