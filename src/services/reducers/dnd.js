import {
    ADD_FILLING,
    CHANGE_BUN,
    DELETE_INGREDIENT,
    DND_INGREDIENT
} from "../actions/dnd";

const initialState = {
    buns: [],
    fillings: []
};

export const dropTargetReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILLING: {
            return {
                ...state,
                fillings: [...state.fillings, action.payload]
            };
        }
        case CHANGE_BUN: {
            return {
                ...state,
                buns: [action.payload]
            };
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                fillings: state.fillings.filter((ingredient) => ingredient.id !== action.payload.id)
            }
        }
        case DND_INGREDIENT: {
            let result = [];
            const { drag, drop } = action.payload;
            if (drag === drop) {
                return state;
            } else if (drag > drop) {
                result = [
                    ...state.fillings.slice(0, drop),
                    state.fillings[drag],
                    ...state.fillings.slice(drop, drag),
                    ...state.fillings.slice(drag + 1),
                ];
            } else {
                result = [
                    ...state.fillings.slice(0, drag),
                    ...state.fillings.slice(drag + 1, drop + 1),
                    state.fillings[drag],
                    ...state.fillings.slice(drop + 1),
                ];
            }
            return {
                ...state,
                fillings: result,
            };
        }
        default: {
            return state
        }
    }
}