import {RESTORE_FORGOT_PASS} from "../actions/forgot-pass";

const initialState = {
    success: false
};

export const forgotPassReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESTORE_FORGOT_PASS: {
            return {
                ...state,
                success: action.payload
            };
        }
        default: {
            return state
        }
    }
}