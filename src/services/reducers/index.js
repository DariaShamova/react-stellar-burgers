import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { detailsReducer } from './details-ingredient'
import {dropTargetReducer} from "./dnd";
import {orderReducer} from "./order";
import {tabReducer} from "./tabs";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    details: detailsReducer,
    fillings: dropTargetReducer,
    buns: dropTargetReducer,
    order: orderReducer,
    tabs: tabReducer
});