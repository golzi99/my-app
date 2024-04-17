const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initState = {
    postsData: [
        {id: 1, message: 'Мой первый пост за все время!', likesCount: 15},
        {id: 2, message: 'Я смогу добавить props в посты', likesCount: 27},
        {id: 3, message: 'Еще сообщение', likesCount: 2}
    ],
    avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`,
    newPostText: ``
};

const profileReducer = (state = initState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.postsData.length + 1,
                message: state.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                newPostText: "",
                postsData: [...state.postsData, newPost]
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            }
        default:
            return {
                ...state
            }
    }
}

export const addPostActionCreator = () => ({
    type: ADD_POST
});

export const updateNewPostActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
});

export default profileReducer;