import {
    SET_TAB,
    SCROLL_TO, TTabActions
} from '../actions/tabs';

type TTabState = {
    current: string;
    next: string;
};

export const initialState: TTabState = {
    current: '',
    next: ''
};

export const tabReducer = (state = initialState, action: TTabActions) => {
    switch (action.type) {
        case SET_TAB: {
            return {
                ...state,
                current: action.payload
            };
        }
        case SCROLL_TO: {
            return {
                ...state,
                next: action.payload
            };
        }
        default: {
            return state
        }
    }
}
