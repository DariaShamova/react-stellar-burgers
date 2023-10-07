export const ADD_DETAILS = 'ADD_DETAILS';
export const DELETE_DETAILS = 'DELETE_DETAILS';

export function getDetailsIngredient(ingredient) {
    return function(dispatch) {
        dispatch({
            type: ADD_DETAILS,
            payload: ingredient
        })
    }
}