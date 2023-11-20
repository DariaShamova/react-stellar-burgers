import {
    WS_SUCCESS_ACTION,
    WS_STOP_ACTION,
    WS_ORDER_ACTION,
    WS_ERR_ACTION,
} from "../actions/websocket";
import { wsReducer, wsState } from "./websocket";

const testOrder = {
    success: true,
    orders: [
        {
            createdAt: "2023-11-20T09:20:23.042Z",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0945",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d",
            ],
            name: "Антарианский люминесцентный флюоресцентный фалленианский бургер",
            number: 21725,
            status: "done",
            updateAt: "2023-11-20T09:20:23.313Z",
            _id: "65154df06d2997001caab6bc",
        },
    ],
    total: 1234,
    totalToday: 123,
};

describe("Testing wsReducer", () => {
    it("Successful connection", () => {
        expect(wsReducer(wsState, WS_SUCCESS_ACTION())).toEqual({
            ...wsState,
            success: true,
        });
    });
    it("Connection with errors", () => {
        expect(wsReducer(wsState, WS_ERR_ACTION())).toEqual({
            ...wsState,
            success: false,
        });
    });
    it("Connection close", () => {
        expect(wsReducer(wsState, WS_STOP_ACTION())).toEqual(wsState);
    });
    it("Order information get", () => {
        expect(wsReducer(wsState, WS_ORDER_ACTION(testOrder))).toEqual({
            ...wsState,
            orders: testOrder.orders,
            total: testOrder.total,
            totalToday: testOrder.totalToday,
        });
    });
});
