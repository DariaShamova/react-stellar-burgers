import {IREGISTER_ACTION, REGISTER, TRegister} from "../actions/register";

export type TRegisterState = {
    success: boolean;
    user: TRegister | {};
};

export const initialState: TRegisterState = {
    success: false,
    user: {},
};

export const registrationReducer = (state = initialState, action: IREGISTER_ACTION) => {
    switch (action.type) {
        case REGISTER: {
            return {
                ...state,
                success: action.payload.success,
                user: action.payload.user,
            };
        }
        default: {
            return state;
        }
    }
};