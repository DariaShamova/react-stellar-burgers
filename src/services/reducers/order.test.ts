import { orderReducer, orderInitialState } from "./order";
import {
    POST_ORDER_FAILED,
    POST_ORDER_SUCCESS,
    POST_ORDER_REQUEST
} from "../actions/order";

export const id = '2566'

describe("Testing orderReducer", () => {

    it("Request order data", () => {
        expect(orderReducer(orderInitialState, ({
            type: POST_ORDER_REQUEST,
            payload: true
        }))).toEqual({
            ...orderInitialState,
            postOrderFailed: false,
            postOrderRequest: true
        });
    });

    it("Failed request order data", () => {
        expect(orderReducer(orderInitialState, ({
            type: POST_ORDER_FAILED,
            payload: true
        }))).toEqual({
            ...orderInitialState,
            postOrderFailed: true,
            postOrderRequest: false
        });
    });

    it("Get order data", () => {
        expect(orderReducer(orderInitialState, ({
            type: POST_ORDER_SUCCESS,
            payload: id
        }))).toEqual({
            ...orderInitialState,
            postOrderFailed: false,
            order: id
        });
    });
});
