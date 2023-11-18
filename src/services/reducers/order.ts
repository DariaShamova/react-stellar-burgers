import {
    POST_ORDER_FAILED,
    POST_ORDER_SUCCESS,
    POST_ORDER_REQUEST, TUnionOrderActions
} from "../actions/order";

type TOrder = {
    number: number
}

type TOrderState = {
    postOrderFailed: boolean,
    order: null | TOrder,
    postOrderRequest: boolean
};

const orderInitialState: TOrderState = {
    postOrderFailed: false,
    order: null,
    postOrderRequest: false
};

export const orderReducer = (state = orderInitialState, action: TUnionOrderActions) => {
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
                order: action.payload,
                postOrderRequest: false
            };
        }
        default: {
            return state;
        }
    }
};