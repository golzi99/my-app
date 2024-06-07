import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import sidebarReducer from "./sidebar-reducer.ts";
import usersReducer from "./users-reducer.ts";
import appReducer from "./app-reducer.ts";
import {thunk as ThunkMiddleware, ThunkAction} from "redux-thunk"
import authReducer from "./auth-reducer.ts";


let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<AT, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//@ts-ignore
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(ThunkMiddleware)));

// let store = createStore(reducers, applyMiddleware(ThunkMiddleware));
//@ts-ignore
window.__store__ = store;

export default store;