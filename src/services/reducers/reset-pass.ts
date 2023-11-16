import {IRESET_PASS_ACTION, RESET_PASS} from "../actions/reset-pass";

const initialState = {
    success: false
};

export const resetPassReducer = (state = initialState, action: IRESET_PASS_ACTION) => {
    switch (action.type) {
        case RESET_PASS: {
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