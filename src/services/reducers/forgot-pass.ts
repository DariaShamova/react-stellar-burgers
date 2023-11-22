import {RESTORE_FORGOT_PASS} from "../actions/forgot-pass";
import {IRESTORE_FORGOT_PASS} from "../actions/forgot-pass";

type TInitialState = {
    success: boolean;
};

export const initialState: TInitialState = {
    success: false
};

export const forgotPassReducer = (state = initialState, action: IRESTORE_FORGOT_PASS ) => {
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