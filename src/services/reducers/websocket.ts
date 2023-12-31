import {
    TUnionWsActions,
    WS_ERR,
    WS_ORDER,
    WS_START,
    WS_STOP,
    WS_SUCCESS,
} from "../actions/websocket";
import { TOrderComponents } from "../types/types";

type TWsState = {
    success: boolean;
    total: null | number;
    totalToday: null | number;
    orders: Array<TOrderComponents> | [];
};

export const wsState: TWsState = {
    success: false,
    total: null,
    totalToday: null,
    orders: [],
};

export const wsReducer = (
    state = wsState,
    action: TUnionWsActions
): TWsState => {
    switch (action.type) {
        case WS_SUCCESS: {
            return {
                ...state,
                success: true,
            };
        }
        case WS_ERR: {
            return {
                ...state,
                success: false,
            };
        }
        case WS_STOP: {
            return {
                ...state,
                success: false,
            };
        }
        case WS_ORDER: {
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };
        }
        default:
            return state;
    }
};
