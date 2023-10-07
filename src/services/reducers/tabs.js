import {
    SET_TAB,
    SCROLL_TO
} from '../actions/tabs';

const initialState = {
    current: 'buns',
    next: ''
};

export const tabReducer = (state = initialState, action) => {
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
