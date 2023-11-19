import {TOrderComponents} from "../types/types";

export type TUnionWsActions =
    | IWS_START_ACTION
    | IWS_SUCCESS_ACTION
    | IWS_ERR_ACTION
    | IWS_ORDER_ACTION
    | IWS_STOP_ACTION;

export const WS_START = "WS_START";

interface IWS_START_ACTION {
    readonly type: typeof WS_START;
}

export const WS_START_ACTION = (): IWS_START_ACTION => {
    return {
        type: WS_START,
    };
};

export const WS_SUCCESS = "WS_SUCCESS";

interface IWS_SUCCESS_ACTION {
    readonly type: typeof WS_SUCCESS;
}

export const WS_SUCCESS_ACTION = (): IWS_SUCCESS_ACTION => {
    return {
        type: WS_SUCCESS,
    };
};

export const WS_ERR = "WS_ERR";

interface IWS_ERR_ACTION {
    readonly type: typeof WS_ERR;
}

export const WS_ERR_ACTION = (): IWS_ERR_ACTION => {
    return {
        type: WS_ERR,
    };
};

export const WS_STOP = "WS_STOP";

interface IWS_STOP_ACTION {
    readonly type: typeof WS_STOP;
}

export const WS_STOP_ACTION = (): IWS_STOP_ACTION => {
    return {
        type: WS_STOP,
    };
};

export const WS_ORDER = "WS_ORDER";

type TWS_ORDER = {
    success: boolean;
    total: number;
    totalToday: number;
    orders: Array<TOrderComponents>;
};

interface IWS_ORDER_ACTION {
    readonly type: typeof WS_ORDER;
    readonly payload: TWS_ORDER;
}

export const WS_ORDER_ACTION = (payload: TWS_ORDER): IWS_ORDER_ACTION => {
    return {
        type: WS_ORDER,
        payload: payload,
    };
};

export const wsActions: IWS_ACTIONS = {
    wsInit: WS_START,
    onOpen: WS_SUCCESS,
    onError: WS_ERR,
    onOrders: WS_ORDER,
    onClose: WS_STOP,
};

export interface IWS_ACTIONS {
    readonly wsInit: typeof WS_START;
    readonly onOpen: typeof WS_SUCCESS;
    readonly onError: typeof WS_ERR;
    readonly onOrders: typeof WS_ORDER;
    readonly onClose: typeof WS_STOP;
}

//Profile

export type TUnionWsProfileActions =
    | IWS_START_PROFILE_ACTION
    | IWS_SUCCESS_PROFILE_ACTION
    | IWS_ERR_PROFILE_ACTION
    | IWS_ORDER_PROFILE_ACTION
    | IWS_STOP_PROFILE_ACTION;

export const WS_START_PROFILE = "WS_START_PROFILE";

interface IWS_START_PROFILE_ACTION {
    readonly type: typeof WS_START_PROFILE;
    readonly payload: string | undefined;
}

export const WS_START_PROFILE_ACTION = (
    payload: string | undefined
): IWS_START_PROFILE_ACTION => {
    return {
        type: WS_START_PROFILE,
        payload: payload,
    };
};

export const WS_SUCCESS_PROFILE = "WS_SUCCESS_PROFILE";

interface IWS_SUCCESS_PROFILE_ACTION {
    readonly type: typeof WS_SUCCESS_PROFILE;
}

export const WS_SUCCESS_PROFILE_ACTION = (): IWS_SUCCESS_PROFILE_ACTION => {
    return {
        type: WS_SUCCESS_PROFILE,
    };
};

export const WS_ERR_PROFILE = "WS_ERR_PROFILE";

interface IWS_ERR_PROFILE_ACTION {
    readonly type: typeof WS_ERR_PROFILE;
}

export const WS_ERR_PROFILE_ACTION = (): IWS_ERR_PROFILE_ACTION => {
    return {
        type: WS_ERR_PROFILE,
    };
};

export const WS_STOP_PROFILE = "WS_STOP_PROFILE";

interface IWS_STOP_PROFILE_ACTION {
    readonly type: typeof WS_STOP_PROFILE;
}

export const WS_STOP_PROFILE_ACTION = (): IWS_STOP_PROFILE_ACTION => {
    return {
        type: WS_STOP_PROFILE,
    };
};

export const WS_ORDER_PROFILE = "WS_ORDER_PROFILE";

type TWS_ORDER_PROFILE = {
    success: boolean;
    orders: Array<TOrderComponents>;
};

interface IWS_ORDER_PROFILE_ACTION {
    readonly type: typeof WS_ORDER_PROFILE;
    readonly payload: TWS_ORDER_PROFILE;
}

export const WS_ORDER_PROFILE_ACTION = (
    payload: TWS_ORDER_PROFILE
): IWS_ORDER_PROFILE_ACTION => {
    return {
        type: WS_ORDER_PROFILE,
        payload: payload,
    };
};

export const wsProfileActions: IWS_PROFILE_ACTIONS = {
    wsInit: WS_START_PROFILE,
    onOpen: WS_SUCCESS_PROFILE,
    onError: WS_ERR_PROFILE,
    onOrders: WS_ORDER_PROFILE,
    onClose: WS_STOP_PROFILE,
};

export interface IWS_PROFILE_ACTIONS {
    readonly wsInit: typeof WS_START_PROFILE;
    readonly onOpen: typeof WS_SUCCESS_PROFILE;
    readonly onError: typeof WS_ERR_PROFILE;
    readonly onOrders: typeof WS_ORDER_PROFILE;
    readonly onClose: typeof WS_STOP_PROFILE;
}

export type TMiddlewareActions = IWS_PROFILE_ACTIONS | IWS_ACTIONS;