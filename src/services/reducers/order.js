import {
    POST_ORDER_FAILED,
    POST_ORDER_SUCCESS,
    POST_ORDER_REQUEST
} from "../actions/order";

const orderInitialState = {
    postOrderFailed: false,
    orderNumber: null,
    postOrderRequest: false
};

export const orderReducer = (state = orderInitialState, action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                postOrderFailed: false,
                postOrderRequest: true
            };
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                postOrderFailed: true,
                postOrderRequest: false
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.payload.number,
                postOrderRequest: false
            };
        }
        default: {
            return state;
        }
    }
};