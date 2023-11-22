import { LOGIN_ACTION, LOGOUT_ACTION } from "../actions/login";
import { loginReducer, initialState } from "./login";

describe("Testing loginReducer", () => {
    it("User login", () => {
        expect(loginReducer(initialState, LOGIN_ACTION(true))).toEqual({
            login: true,
            logout: false,
        });
    });
    it("User logout", () => {
        expect(loginReducer(initialState, LOGOUT_ACTION(true))).toEqual({
            login: false,
            logout: true,
        });
    });
});