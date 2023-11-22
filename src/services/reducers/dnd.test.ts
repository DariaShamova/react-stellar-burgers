import { dropTargetReducer, initialState } from "./dnd";
import {
    ADD_FILLING,
    CHANGE_BUN,
    CLEAN_CONSTRUCTOR,
    DELETE_INGREDIENT,
    DND_ING_ACTION,
} from "../actions/dnd";

export const bun = {
    _id: "643d69a5c3f7b9001cfa093d",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
    id: "1",
};

export const sauce = {
    _id: "643d69a5c3f7b9001cfa0945",
    name: "Соус с шипами Антарианского плоскоходца",
    type: "sauce",
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: "https://code.s3.yandex.net/react/code/sauce-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
    __v: 0,
    id: "3",
};

export const main = {
    _id: "643d69a5c3f7b9001cfa0940",
    name: "Говяжий метеорит (отбивная)",
    type: "main",
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: "https://code.s3.yandex.net/react/code/meat-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
    __v: 0,
    id: "5",
};

const drag = 1;
const drop = 2;

describe("Testing dropTargetReducer", () => {
    it("Add bun", () => {
        expect(dropTargetReducer(initialState, ({
            type: CHANGE_BUN,
            payload: bun
        }))).toEqual({
            ...initialState,
            buns: [bun],
        });
    });

    it("Add filling", () => {
        expect(dropTargetReducer(initialState, ({
            type: ADD_FILLING,
            payload: main
        }))).toEqual({
            ...initialState,
            fillings: [main],
        });
    });

    it("Drag and drop ingredients within constructor", () => {
        expect(
            dropTargetReducer(
                {...initialState, fillings: [main, main, sauce]},
                DND_ING_ACTION(drag, drop)
            )
        ).toEqual({
            ...initialState,
            fillings: [main, sauce, main],
        });
    });

    it("Delete ingredient", () => {
        expect(dropTargetReducer({...initialState, fillings: [main, sauce]}, ({
            type: DELETE_INGREDIENT,
            payload: main
        }))).toEqual({
            ...initialState,
            fillings: [sauce],
        });
    });

    it("Clean constructor", () => {
        expect(dropTargetReducer({...initialState, buns: [bun], fillings: [main, sauce]}, ({
            type: CLEAN_CONSTRUCTOR,
        }))).toEqual(
            initialState
        );
    });
})