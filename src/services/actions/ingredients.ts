import {getIngredientsRequest} from "../api";
import {number} from "prop-types";
import {TIngredient} from "./dnd";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

interface IGET_INGREDIENTS_REQUEST_ACTION {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
    readonly payload: boolean;
}

interface IGET_INGREDIENTS_SUCCESS_ACTION {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: boolean;
    ingredients: Array<TIngredient>;
}

interface IGET_INGREDIENTS_FAILED_ACTION {
    readonly type: typeof GET_INGREDIENTS_FAILED;
    readonly payload: boolean;
}

export function getIngredients() {
    // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
    return function(dispatch: any) {
        // Проставим флаг в хранилище о том, что мы начали выполнять запрос
        // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
        // ввод на время выполнения запроса
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        // Запрашиваем данные у сервера

            getIngredientsRequest()
            .then(res => {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                })
        }).catch( err => {
            // Если сервер не вернул данных, отправляем экшен об ошибке
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
    }
}

export type TUnionIngredientsActions =
    | IGET_INGREDIENTS_REQUEST_ACTION
    | IGET_INGREDIENTS_SUCCESS_ACTION
    | IGET_INGREDIENTS_FAILED_ACTION