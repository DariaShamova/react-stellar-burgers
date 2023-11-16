export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    id?: string;
};
export const ADD_FILLING = 'ADD_FILLING';
export interface IADD_FILLING {
    readonly type: typeof ADD_FILLING;
    readonly payload: TIngredient;
}

export const CHANGE_BUN = 'CHANGE_BUN';
export interface ICHANGE_BUN {
    readonly type: typeof CHANGE_BUN;
    readonly payload: TIngredient;
}
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export interface IDELETE_INGREDIENT {
    readonly type: typeof DELETE_INGREDIENT;
    readonly payload: TIngredient;
}

export const DND_INGREDIENT = 'DND_INGREDIENT';
export interface IDND_INGREDIENT {
    readonly type: typeof DND_INGREDIENT;
    readonly payload: {
        drag: number;
        drop: number;
    };
}
export const CLEAN_CONSTRUCTOR = 'CLEAN_CONSTRUCTOR';
export interface ICLEAN_CONSTRUCTOR {
    readonly type: typeof CLEAN_CONSTRUCTOR;
}

export const dndIngredient = (drag: number, drop: number) => ({
    type: DND_INGREDIENT,
    payload: { drag, drop },
});

export type TUnionActions =
    | IADD_FILLING
    | ICHANGE_BUN
    | IDELETE_INGREDIENT
    | ICLEAN_CONSTRUCTOR
    | IDND_INGREDIENT;


