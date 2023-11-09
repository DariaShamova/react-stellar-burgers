import {GET_PROFILE_INFO, SEND_PROFILE_INFO} from "../actions/profile";

const initialState = {
    success: false,
    user: {
        email: "",
        name: "",
    },
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_INFO: {
            return {
                ...state,
                success: action.payload.success,
                user: action.payload.user,
            };
        }
        case SEND_PROFILE_INFO: {
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