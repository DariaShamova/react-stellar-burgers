import {postOrderRequest} from "../api";
import {CLEAN_CONSTRUCTOR} from "./dnd";
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

interface IPOST_ORDER_REQUEST_ACTION {
    readonly type: typeof POST_ORDER_REQUEST;
    readonly payload: boolean
}

interface IPOST_ORDER_SUCCESS_ACTION {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly payload: object
}

interface IPOST_ORDER_FAILED_ACTION {
    readonly type: typeof POST_ORDER_FAILED;
    readonly payload: boolean
}

export type TUnionOrderActions =
    | IPOST_ORDER_REQUEST_ACTION
    | IPOST_ORDER_SUCCESS_ACTION
    | IPOST_ORDER_FAILED_ACTION

export function postOrder(id: string[]) {
    // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
    return function(dispatch: any) {
        // Проставим флаг в хранилище о том, что мы начали выполнять запрос
        // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
        // ввод на время выполнения запроса
        dispatch({
            type: POST_ORDER_REQUEST
        })
        // Отправляем данные на сервер
       postOrderRequest(id)
            .then(res => {
                    // В случае успешного получения данных вызываем экшен
                    // для записи полученных данных в хранилище
                    dispatch({
                        type: POST_ORDER_SUCCESS,
                        payload: res.order
                    })
            })
           .then(() => dispatch({
               type: CLEAN_CONSTRUCTOR
           }))
           .catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
            dispatch({
                type: POST_ORDER_FAILED
            })
        })
    }
}