export const SET_TAB = "SET_TAB";
export const SCROLL_TO = "SCROLL_TO";

export const setTab = (value) => ({
    type: SET_TAB,
    payload: value
})

export const scrollTo = (value) => ({
    type: SCROLL_TO,
    payload: value
})