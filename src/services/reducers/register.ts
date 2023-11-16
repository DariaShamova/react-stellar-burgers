import {IREGISTER_ACTION, REGISTER} from "../actions/register";

const initialState = {
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