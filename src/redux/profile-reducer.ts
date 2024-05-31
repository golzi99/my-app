import {profileAPI} from "../API/api";
import {PhotosType, PostDataType, ProfileType} from "../types/types";

const ADD_POST = 'samurai/profile/ADD-POST';
const SET_USER_PROFILE = "samurai/profile/SET-USER-PROFILE";
const SET_USER_STATUS = "samurai/profile/SET-USER-STATUS";
const RESET_PROFILE = "samurai/profile/RESET_PROFILE";
const DELETE_POST = "samurai/profile/DELETE-POST";
const SET_PROFILE_PHOTO = "samurai/profile/SET-PROFILE-PHOTO";

let initState = {
    postsData: [
        {id: 1, message: 'Мой первый пост за все время!', likesCount: 15},
        {id: 2, message: 'Я смогу добавить props в посты', likesCount: 27},
        {id: 3, message: 'Еще сообщение', likesCount: 2}
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: '',
};

type InitStateType = typeof initState;

const profileReducer = (state = initState, action: any): InitStateType => {

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

type AddPostType = {
    type: typeof ADD_POST,
    newPostText: string
}

export const addPost = (newPostText: string): AddPostType => ({
    type: ADD_POST,
    newPostText
});

type SetUserProfileSuccess = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

export const setUserProfileSuccess = (profile: ProfileType): SetUserProfileSuccess => ({
    type: SET_USER_PROFILE,
    profile
});

type SetStatusType = {
    type: typeof SET_USER_STATUS,
    status: string
}

export const setStatus = (status: string): SetStatusType => ({
    type: SET_USER_STATUS,
    status
});

type ResetProfileType = {
    type: typeof RESET_PROFILE,
    profile: null
}

export const resetProfile = (): ResetProfileType => ({
    type: RESET_PROFILE,
    profile: null
});

type DeletePost = {
    type: typeof DELETE_POST,
    postId: number
}

export const deletePost = (postId: number): DeletePost => ({
    type: DELETE_POST,
    postId
});

type SetProfilePhotoType = {
    type: typeof SET_PROFILE_PHOTO,
    photos: PhotosType
}

const setProfilePhoto = (photos: PhotosType): SetProfilePhotoType => ({
    type: SET_PROFILE_PHOTO,
    photos
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    dispatch(resetProfile());
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfileSuccess(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
    catch (error) {
        // dispatch or do something
    }

}

export const savePhoto = (photo: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(setProfilePhoto(response.data.data.photos))
    }
}

export const saveProfile = (profileData: ProfileType, setStatus: any) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profileData);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
    else {
        setStatus({errors: response.data.messages});
        return Promise.reject("wrong");
    }
}

export const resetProf = () => {
    return (dispatch) => {
        dispatch(resetProfile());
    }
}

export default profileReducer;