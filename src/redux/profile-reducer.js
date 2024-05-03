import {profileAPI} from "../API/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";

let initState = {
    postsData: [
        {id: 1, message: 'Мой первый пост за все время!', likesCount: 15},
        {id: 2, message: 'Я смогу добавить props в посты', likesCount: 27},
        {id: 3, message: 'Еще сообщение', likesCount: 2}
    ],
    avatar: `${process.env.PUBLIC_URL}/img/avatar3.png`,
    profile: null,
    status: ``,
};

const profileReducer = (state = initState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.postsData.length + 1,
                message: action.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                postsData: [...state.postsData, newPost]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return {
                ...state
            }
    }
}

export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST,
    newPostText
});

export const setUserProfileSuccess = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});

export const setStatus = (status) => ({
    type: SET_USER_STATUS,
    status
});

export const setUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId).then((response) => {
            dispatch(setUserProfileSuccess(response.data));
        });
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then((response) => {
            dispatch(setStatus(response.data));
        })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        })
    }
}

export default profileReducer;