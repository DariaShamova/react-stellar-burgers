import { LOGIN, LOGOUT } from "../actions/login";

const initialState = {
    login: null,
    logout: false,
    user: {},
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                login: action.payload.success,
                logout: !action.payload.success,
                user: action.payload.user,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                login: !action.payload.success,
                logout: action.payload.success,
                user: action.payload.user,
            };
        }
        default: {
            return state;
        }
    }
};