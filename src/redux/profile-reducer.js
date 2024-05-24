import {profileAPI} from "../API/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";
const RESET_PROFILE = "RESET_PROFILE";
const DELETE_POST = "DELETE-POST";
const SET_PROFILE_PHOTO = "SET-PROFILE-PHOTO"

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
        case RESET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        case SET_PROFILE_PHOTO: {
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                },

            }
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

export const resetProfile = () => ({
    type: RESET_PROFILE,
    profile: null
});

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
});

const setProfilePhoto = (photos) => ({
    type: SET_PROFILE_PHOTO,
    photos
});

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfileSuccess(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (photo) => async (dispatch) => {
    let response = await profileAPI.savePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.data.photos))
    }
}

export const resetProf = () => {
    return (dispatch) => {
        dispatch(resetProfile());
    }
}

export default profileReducer;