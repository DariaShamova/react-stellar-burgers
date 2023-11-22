import {LOGIN, LOGOUT, TLoginActions} from "../actions/login";

type TUserState = {
    login: boolean;
    logout: boolean;
};

export const initialState: TUserState = {
    login: false,
    logout: false,
};


export const loginReducer = (state = initialState, action: TLoginActions) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                login: action.payload,
                logout: !action.payload,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                login: !action.payload,
                logout: action.payload,
            };
        }
        default: {
            return state;
        }
    }
};