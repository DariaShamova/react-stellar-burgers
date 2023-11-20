import { forgotPassReducer, initialState } from "./forgot-pass";
import {RESTORE_FORGOT_PASS_ACTION} from "../actions/forgot-pass";

describe("Testing forgotPass Reducer", () => {
    it("Success restore password", () => {
        expect(forgotPassReducer(initialState, RESTORE_FORGOT_PASS_ACTION(true))).toEqual(
            {
                success: true
            }
        )
    });
    it("Fail restore password", () => {
        expect(forgotPassReducer(initialState, RESTORE_FORGOT_PASS_ACTION(false))).toEqual(
            initialState
        );
    });
});


