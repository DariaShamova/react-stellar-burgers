import {LOGIN, LOGOUT, TLoginActions} from "../actions/login";

const initialState = {
    login: null,
    logout: false,
    //user: {},
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