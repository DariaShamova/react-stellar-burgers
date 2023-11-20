import {registrationReducer, initialState} from "./register";
import {REGISTER} from "../actions/register";

const mockupUser = {
    success: true,
    user: {
        email: "daria@gmail.com",
        password: "test",
        name: "Daria",
    },
}
describe("Testing registrationReducer", () => {
    it("User register", () => {
        expect(registrationReducer(initialState, ({
            type: REGISTER,
            payload: mockupUser
        }))).toEqual({
            success: true,
            user: mockupUser.user,
        });
    });
});