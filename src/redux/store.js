const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

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

    // _addPost() {
    //     let newPost = {
    //         id: this._state.profilePage.postsData.length + 1,
    //         message: this._state.profilePage.newPostText,
    //         likesCount: 0
    //     };
    //     this._state.profilePage.postsData.push(newPost);
    //     this._state.profilePage.newPostText = "";
    //     this._rendWeb(this._state);
    // },
    // _updateNewPostText(newText) {
    //     this._state.profilePage.newPostText = newText;
    //     this._rendWeb(this._state);
    // },

    dispatch(action) {
        if (action.type === ADD_POST) {
            // this._addPost();
            let newPost = {
                id: this._state.profilePage.postsData.length + 1,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
            // this._updateNewPostText(action.newText);
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPage.newMessageBody = action.body;
            this._callSubscriber(this._state);
        } else if (action.type === SEND_MESSAGE) {
            let newMessage = {
                id: 0,
                message: this._state.dialogsPage.newMessageBody
            };
            this._state.dialogsPage.messagesData.push(newMessage);
            this._state.dialogsPage.newMessageBody = '';
            this._callSubscriber(this._state);
        }
    }
};

export const addPostActionCreator = () => ({
    type: ADD_POST
});

export const updateNewPostActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
});

export const updateNewMessageActionCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
});

export const sendMessageActionCreator = () => ({
    type: SEND_MESSAGE
});

export default store;

