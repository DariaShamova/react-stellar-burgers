import { ingredientsReducer, initialState } from "./ingredients";
import { 
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS 
} from "../actions/ingredients";

const mockupIngredients = [
    {
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
    },
    {
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
    },
];

describe("Testing ingredientsReducer", () => {

    it("Request ingredients data", () => {
        expect(ingredientsReducer(initialState, ({
            type: GET_INGREDIENTS_REQUEST,
            payload: true
        }))).toEqual({
            ...initialState,
            ingredientsRequest: true,
            ingredientsFailed: false
        });
    });

    it("Failed request ingredients data", () => {
        expect(ingredientsReducer(initialState, ({
            type: GET_INGREDIENTS_FAILED,
            payload: true
        }))).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: true
        });
    });

    it("Get ingredients data", () => {
        expect(ingredientsReducer(initialState, ({
            type: GET_INGREDIENTS_SUCCESS,
            payload: true,
            ingredients: mockupIngredients
        }))).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredients: mockupIngredients
        });
    });
});
