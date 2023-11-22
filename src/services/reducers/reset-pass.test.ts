import {resetPassReducer, initialState} from "./reset-pass";
import {RESET_PASS} from "../actions/reset-pass";

describe("Testing resetPassReducer", () => {
    it("User reset password", () => {
        expect(resetPassReducer(initialState, ({
            type: RESET_PASS,
            payload: true
        }))).toEqual({
            success: true,
        });
    });
});