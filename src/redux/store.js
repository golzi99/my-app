const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
                {id: 1, message: "How Are You"},
                {id: 1, message: "Where are You!!!"},
                {id: 1, message: "dont show it for him"},
                {id: 0, message: "doubi doubi"},
                {id: 0, message: "WAZZZAAA"},
                {id: 0, message: "Welcome"}
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
    _rendWeb() {

    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._rendWeb = observer;
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
        if (action.type === 'ADD-POST') {
            // this._addPost();
            let newPost = {
                id: this._state.profilePage.postsData.length + 1,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            };
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = "";
            this._rendWeb(this._state);
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._rendWeb(this._state);
            // this._updateNewPostText(action.newText);
        }
    }
};

export const addPostActionCreator = () => ({
    type: ADD_POST
});

export const updateNewPostActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
});

export default store;

