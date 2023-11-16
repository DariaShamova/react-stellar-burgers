export const SET_TAB = "SET_TAB";
export const SCROLL_TO = "SCROLL_TO";

interface ISET_TAB_ACTION {
    readonly type: typeof SET_TAB;
    readonly payload: string;
}

interface ISCROLL_TO_ACTION {
    readonly type: typeof SCROLL_TO;
    readonly payload: string;
}

export type TTabActions = ISET_TAB_ACTION | ISCROLL_TO_ACTION;

export const setTab = (value: string) => ({
    type: SET_TAB,
    payload: value
})

export const scrollTo = (value: string) => ({
    type: SCROLL_TO,
    payload: value
})