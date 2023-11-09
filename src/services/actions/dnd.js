export const ADD_FILLING = 'ADD_FILLING';
export const CHANGE_BUN = 'CHANGE_BUN';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DND_INGREDIENT = 'DND_INGREDIENT';
export const CLEAN_CONSTRUCTOR = 'CLEAN_CONSTRUCTOR';

export const dndIngredient = (drag, drop) => ({
    type: DND_INGREDIENT,
    payload: { drag, drop },
});


