import {loginRequest, logoutRequest} from "../api";
import {setCookie} from "../../utils/cookies";
import {RESTORE_FORGOT_PASS} from "./forgot-pass";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function userLogin(user) {
    return function (dispatch) {
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

export function userLogout(user) {
    return function (dispatch) {
        logoutRequest(user)
            .then(res => {
                    dispatch({
                        type: LOGOUT,
                        payload: res
                    })
            })
            .catch((er) => console.log(er));
    }
}

