import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { detailsReducer } from './details-ingredient'
import {dropTargetReducer} from "./dnd";
import {orderReducer} from "./order";
import {tabReducer} from "./tabs";
import {forgotPassReducer} from "./forgot-pass";
import {resetPassReducer} from "./reset-pass";
import {profileReducer} from "./profile";
import {registrationReducer} from "./register";
import {loginReducer} from "./login";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    details: detailsReducer,
    fillings: dropTargetReducer,
    buns: dropTargetReducer,
    order: orderReducer,
    tabs: tabReducer,
    password: forgotPassReducer,
    newPassword: resetPassReducer,
    profile: profileReducer,
    registration: registrationReducer,
    login: loginReducer,
});