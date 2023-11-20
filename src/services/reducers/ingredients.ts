import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS, TUnionIngredientsActions
} from '../actions/ingredients';
import {TIngredient} from "../actions/dnd";

type TInitialState = {
    ingredients: Array<TIngredient> | [],
    ingredientsRequest: boolean,
    ingredientsFailed: boolean
}

export const initialState: TInitialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false
};


export const ingredientsReducer = (state = initialState, action: TUnionIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                // Запрос начал выполняться
                ingredientsRequest: true,
                // Сбрасываем статус наличия ошибок от предыдущего запроса
                // на случай, если он был и завершился с ошибкой
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                // Запрос выполнился успешно, помещаем полученные данные в хранилище
                ingredients: action.ingredients,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                // Запрос выполнился с ошибкой,
                // выставляем соответствующие значения в хранилище
                ingredientsFailed: true,
                // Запрос закончил своё выполнение
                ingredientsRequest: false
            };
        }
        default: {
            return state
        }
    }
}

