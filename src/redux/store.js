import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'Мой первый пост за все время!', likesCount: 15},
                {id: 2, message: 'Я смогу добавить props в посты', likesCount: 27},
                {id: 3, message: 'Еще сообщение', likesCount: 2}
            ],
            avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`,
            newPostText: ``,
        },
        dialogsPage: {
            messagesData: [
                {id: 1, message: "Hi"},
                {id: 0, message: "How Are You"},
                {id: 0, message: "Where are You!!!"},
                {id: 1, message: "dont show it for him"},
                {id: 1, message: "doubi doubi"},
                {id: 0, message: "WAZZZAAA"},
                {id: 1, message: "Welcome"}
            ],
            dialogsData: [
                {id: 1, name: "Paul"},
                {id: 2, name: "Oleg"},
                {id: 3, name: "Sasha"},
                {id: 4, name: "Vika"},
                {id: 5, name: "Liza"},
                {id: 6, name: "Semen"},
                {id: 7, name: "Cumpot"}
            ],
            newMessageBody: '',
        },
        sideBar: {
            topFriends: [
                {id: 1, name: "Paul"},
                {id: 2, name: "Oleg"},
                {id: 3, name: "Sasha"}
            ]
        },
        avatars: [
            {id: 0, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
            {id: 1, avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
            {id: 2, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`},
            {id: 3, avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
            {id: 4, avatar: `${process.env.PUBLIC_URL}/img/avatar2.png`},
            {id: 5, avatar: `${process.env.PUBLIC_URL}/img/avatar4.png`},
            {id: 6, avatar: `${process.env.PUBLIC_URL}/img/avatar1.png`},
            {id: 7, avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`}
        ]
    },
    _callSubscriber() {

    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);
        this._callSubscriber(this._state);
    }
};

export default store;

