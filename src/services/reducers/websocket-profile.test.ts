import {
    WS_SUCCESS_PROFILE_ACTION,
    WS_STOP_PROFILE_ACTION,
    WS_ORDER_PROFILE_ACTION,
    WS_ERR_PROFILE_ACTION,
} from "../actions/websocket";
import { wsProfileReducer, wsProfileState } from "./websocket-profile";

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
};

describe("Testing wsProfileReducer", () => {
    it("Successful connection", () => {
        expect(
            wsProfileReducer(wsProfileState, WS_SUCCESS_PROFILE_ACTION())
        ).toEqual({
            ...wsProfileState,
            success: true,
        });
    });
    it("Connection with errors", () => {
        expect(wsProfileReducer(wsProfileState, WS_ERR_PROFILE_ACTION())).toEqual({
            ...wsProfileState,
            success: false,
        });
    });
    it("Connection close", () => {
        expect(wsProfileReducer(wsProfileState, WS_STOP_PROFILE_ACTION())).toEqual(
            wsProfileState
        );
    });
    it("Order information get", () => {
        expect(
            wsProfileReducer(wsProfileState, WS_ORDER_PROFILE_ACTION(testOrder))
        ).toEqual({
            ...wsProfileState,
            orders: testOrder.orders,
        });
    });
});
