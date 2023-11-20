import {  
    SET_TAB,
    SCROLL_TO 
} from "../actions/tabs";
import { tabReducer, initialState } from "./tabs";

describe("Testing tabReducer", () => {
    it("Testing scroll", () => {
        expect(
            tabReducer(initialState, { type: SCROLL_TO, payload: "main" })
        ).toEqual({
            next: "main",
            current: "",
        });
    });
    it("Testing tab scroll", () => {
        expect(
            tabReducer(initialState, { type: SET_TAB, payload: "main" })
        ).toEqual({
            next: "",
            current: "main",
        });
    });
});
