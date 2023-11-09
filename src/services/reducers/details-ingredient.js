import {
    ADD_DETAILS,
    DELETE_DETAILS
} from '../actions/details-ingredient';

const initialState = {
    ingredientDetails: null
};

export const detailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DETAILS: {
            return {
                ...state,
                ingredientDetails: action.payload
            };
        }
        case DELETE_DETAILS: {
            return {
                ...state,
                ingredientDetails: null
            };
        }
        default: {
            return state
        }
    }
}

