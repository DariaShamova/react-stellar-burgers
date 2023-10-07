import {postOrderRequest} from "../api";
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export function postOrder(id) {
    // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
    return function(dispatch) {
        // Проставим флаг в хранилище о том, что мы начали выполнять запрос
        // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать
        // ввод на время выполнения запроса
        dispatch({
            type: POST_ORDER_REQUEST
        })
        // Отправляем данные на сервер
       postOrderRequest(id)
            .then(res => {
                if (res && res.success) {
                    // В случае успешного получения данных вызываем экшен
                    // для записи полученных данных в хранилище
                    dispatch({
                        type: POST_ORDER_SUCCESS,
                        payload: res.order
                    })
                    console.log (res.order)
                } else {
                    // Если произошла ошибка, отправляем соответствующий экшен
                    dispatch({
                        type: POST_ORDER_FAILED
                    })
                }
            }).catch( err => {
            // Если сервер не вернул данных, также отправляем экшен об ошибке
            dispatch({
                type: POST_ORDER_FAILED
            })
        })
    }

}