import {REGISTER} from "../actions/register";

const initialState = {
    success: false,
    user: {},
};

export const registrationReducer = (state = initialState, action) => {
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