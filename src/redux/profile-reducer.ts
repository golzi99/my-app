import {PhotosType, PostDataType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {profileAPI} from "../API/profile-api.ts";

let initState = {
    postsData: [
        {id: 1, message: 'Мой первый пост за все время!', likesCount: 15},
        {id: 2, message: 'Я смогу добавить props в посты', likesCount: 27},
        {id: 3, message: 'Еще сообщение', likesCount: 2}
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: '',
};

const profileReducer = (state = initState, action: ActionsTypes): InitStateType => {

    switch (action.type) {
        case "samurai/profile/ADD-POST":
            let newPost = {
                id: state.postsData.length + 1,
                message: action.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                postsData: [...state.postsData, newPost]
            };
        case "samurai/profile/SET-USER-PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "samurai/profile/SET-USER-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "samurai/profile/RESET_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "samurai/profile/DELETE-POST":
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id !== action.postId)
            }
        case "samurai/profile/SET-PROFILE-PHOTO": {
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

export const profileActions = {
    addPost: (newPostText: string) => ({
        type: "samurai/profile/ADD-POST",
        newPostText
    } as const),
    setUserProfileSuccess: (profile: ProfileType) => ({
        type: "samurai/profile/SET-USER-PROFILE",
        profile
    } as const),
    setStatus: (status: string) => ({
        type: "samurai/profile/SET-USER-STATUS",
        status
    } as const),
    resetProfile: () => ({
        type: "samurai/profile/RESET_PROFILE",
        profile: null
    } as const),
    deletePost: (postId: number) => ({
        type: "samurai/profile/DELETE-POST",
        postId
    } as const),
    setProfilePhoto: (photos: PhotosType) => ({
        type: "samurai/profile/SET-PROFILE-PHOTO",
        photos
    } as const)
}

export const addNewPost = (textPost: string): ThunkType => async (dispatch) => {
    dispatch(profileActions.addPost(textPost));
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    dispatch(profileActions.resetProfile());
    const data = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUserProfileSuccess(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(profileActions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(profileActions.setStatus(status));
        }
    }
    catch (error) {
        // dispatch or do something
    }

}

export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(photo);
    if (data.resultCode === 0) {
        dispatch(profileActions.setProfilePhoto(data.data.photos))
    }
}

export const saveProfile = (profileData: ProfileType, setStatus: any): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profileData);
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    }
    else {
        setStatus({errors: data.messages});
        return Promise.reject("wrong");
    }
}

export const resetProf = (): ThunkType => async (dispatch) => {
    dispatch(profileActions.resetProfile());
}

export default profileReducer;

type InitStateType = typeof initState;
type ActionsTypes = InferActionsType<typeof profileActions>;
type ThunkType = BaseThunkType<ActionsTypes>;