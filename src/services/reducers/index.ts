import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import { ingredientsReducer } from './ingredients';
import {dropTargetReducer} from "./dnd";
import {orderReducer} from "./order";
import {tabReducer} from "./tabs";
import {forgotPassReducer} from "./forgot-pass";
import {resetPassReducer} from "./reset-pass";
import {profileReducer} from "./profile";
import {registrationReducer} from "./register";
import {loginReducer} from "./login";
import {wsReducer} from "./websocket";
import {wsProfileReducer} from "./websocket-profile";
import thunk from "redux-thunk";
import {ordersUrl, socketMiddleware, wsUrl} from "../middleware/middleware";
import {wsActions, wsProfileActions} from "../actions/websocket";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    fillings: dropTargetReducer,
    buns: dropTargetReducer,
    order: orderReducer,
    tabs: tabReducer,
    password: forgotPassReducer,
    newPassword: resetPassReducer,
    profile: profileReducer,
    registration: registrationReducer,
    login: loginReducer,
    websocket: wsReducer,
    wsprofile: wsProfileReducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddleware(wsUrl, wsActions),
        socketMiddleware(ordersUrl, wsProfileActions)
    )
);

export const store = createStore(rootReducer, enhancer);