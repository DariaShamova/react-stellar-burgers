import {registrationRequest} from "../api";
export const REGISTER = "REGISTER";

export type TRegister = {
    email: string;
    password: string;
    name: string;
};

export type TPayloadRegister = {
    success: boolean;
    user: TRegister | {};
};
export interface IREGISTER_ACTION {
    readonly type: typeof REGISTER;
    readonly payload: TPayloadRegister;
}

export function register(user: TRegister) {
    return function (dispatch: any) {
        registrationRequest(user)
            .then(res => {
                dispatch({
                    type: REGISTER,
                    payload: res
                })
            })
            .catch((er) => console.log(er));
    }
}
