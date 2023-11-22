import {IRESTORE_FORGOT_PASS} from "./forgot-pass";
import {
    IGET_INGREDIENTS_FAILED_ACTION,
    IGET_INGREDIENTS_REQUEST_ACTION,
    IGET_INGREDIENTS_SUCCESS_ACTION
} from "./ingredients";
import {ILOGIN_ACTION, ILOGOUT_ACTION} from "./login";
import {IPOST_ORDER_FAILED_ACTION, IPOST_ORDER_REQUEST_ACTION, IPOST_ORDER_SUCCESS_ACTION} from "./order";
import {IGET_PROFILE_INFO_ACTION, ISEND_PROFILE_INFO_ACTION} from "./profile";
import {IREGISTER_ACTION} from "./register";
import {IRESET_PASS_ACTION} from "./reset-pass";
import {ISCROLL_TO_ACTION, ISET_TAB_ACTION} from "./tabs";

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

export const DND_ING_ACTION = (
    drag: number,
    drop: number
): IDND_INGREDIENT => ({
    type: DND_INGREDIENT,
    payload: { drag, drop },
});

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
    | IDND_INGREDIENT
    | IRESTORE_FORGOT_PASS
    | IGET_INGREDIENTS_REQUEST_ACTION
    | IGET_INGREDIENTS_SUCCESS_ACTION
    | IGET_INGREDIENTS_FAILED_ACTION
    | ILOGIN_ACTION
    | ILOGOUT_ACTION
    | IPOST_ORDER_REQUEST_ACTION
    | IPOST_ORDER_SUCCESS_ACTION
    | IPOST_ORDER_FAILED_ACTION
    | IGET_PROFILE_INFO_ACTION
    | ISEND_PROFILE_INFO_ACTION
    | IREGISTER_ACTION
    | IRESET_PASS_ACTION
    | ISET_TAB_ACTION
    | ISCROLL_TO_ACTION;




