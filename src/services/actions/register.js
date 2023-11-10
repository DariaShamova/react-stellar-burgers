import {registrationRequest} from "../api";
export const REGISTER = "REGISTER";

export function register(user) {
    return function (dispatch) {
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
