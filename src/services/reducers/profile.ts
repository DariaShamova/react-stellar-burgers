import {GET_PROFILE_INFO, SEND_PROFILE_INFO, TProfileActions} from "../actions/profile";

type TProfile = {
    email: string;
    name: string;
};

export type TProfileState = {
    success: boolean;
    user: TProfile;
};

const initialState: TProfileState = {
    success: false,
    user: {
        email: "",
        name: "",
    },
};

export const profileReducer = (state = initialState, action: TProfileActions) => {
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