import {profileReducer, initialState} from "./profile";
import {GET_PROFILE_INFO, SEND_PROFILE_INFO} from "../actions/profile";

const mockupUser = {
    success: true,
    user: {
        email: "daria@gmail.com",
        name: "Daria",
    },
}
describe("Testing profileReducer", () => {
    it("Get profile info", () => {
        expect(profileReducer(initialState, ({
            type: GET_PROFILE_INFO,
            payload: mockupUser
        }))).toEqual({
            success: true,
            user: mockupUser.user,
        });
    });
    it("Send profile info", () => {
        expect(profileReducer(initialState, ({
            type: SEND_PROFILE_INFO,
            payload: mockupUser
        }))).toEqual({
            success: true,
            user: mockupUser.user,
        });
    });
});