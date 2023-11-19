import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {rootReducer} from "../reducers";
import {store} from "../reducers";
import { TUnionActions } from "../actions/dnd";


export type AppDispatch = typeof store.dispatch;
export type DispatchHook = () => AppDispatch | ThunkFunc;
export type RootState = ReturnType<typeof rootReducer>;
export type ThunkFunc<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TUnionActions>>;

export const useAppDispatch: DispatchHook = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
