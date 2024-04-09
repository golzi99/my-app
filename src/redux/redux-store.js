import {combineReducers, legacy_createStore as createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sidebarReducer,
});

let store = createStore(reducers);

export const avatars = [
    {id: 0, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
    {id: 1, avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
    {id: 2, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
    {id: 3, avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
    {id: 4, avatar: `${process.env.PUBLIC_URL}/img/avatar2.png`},
    {id: 5, avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
    {id: 6, avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
    {id: 7, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`}
];

export default store;