export const ADD_DETAILS = 'ADD_DETAILS';
export const DELETE_DETAILS = 'DELETE_DETAILS';
export const addDetails = (ingredient) => ({
        type: ADD_DETAILS,
        payload: ingredient
})