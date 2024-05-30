import {usersAPI} from "../API/api";
import {updateObjectInArray} from "../components/Utils/object-helpers";
import {userType} from "../types/types";

const FOLLOW_ON_USER = "samurai/users/FOLLOW-ON-USER";
const UNFOLLOW_ON_USER = "samurai/users/UNFOLLOW-ON-USER";
const SET_USERS = "samurai/users/SET-USERS";
const SET_CURRENT_PAGE = "samurai/users/SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "samurai/users/SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "samurai/users/TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "samurai/users/TOGGLE-IS-FOLLOWING-PROGRESS";

type usersType = Array<userType>;

let initState = {
    users: [] as usersType,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users id
};

type InitStateType = typeof initState;

const usersReducer = (state = initState, action: any): InitStateType => {

    switch (action.type) {
        case FOLLOW_ON_USER:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
            };
        case UNFOLLOW_ON_USER:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return {
                ...state
            }
    }
}

type SetUsersType = {
    type: typeof SET_USERS,
    users: usersType
}

export const setUsers = (users: usersType): SetUsersType => ({
    type: SET_USERS,
    users: users
});

type FollowOnUserSuccessType = {
    type: typeof FOLLOW_ON_USER,
    userId: number
}

export const followOnUserSuccess = (userId: number): FollowOnUserSuccessType => ({
    type: FOLLOW_ON_USER,
    userId: userId
});


type UnFollowOnUserSuccessType = {
    type: typeof UNFOLLOW_ON_USER,
    userId: number
}

export const unFollowOnUserSuccess = (userId: number): UnFollowOnUserSuccessType => ({
    type: UNFOLLOW_ON_USER,
    userId: userId
});

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
});

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalCount: number
}

export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount: totalCount
});

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});

type ToggleIsFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}

export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): ToggleIsFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId: userId
});

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(setCurrentPage(page));
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}

export const unFollow = (userId: number) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unFollowOnUserAPI.bind(usersAPI), unFollowOnUserSuccess);
}

export const follow = (userId: number) => async (dispatch: any) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.followOnUserAPI.bind(usersAPI), followOnUserSuccess);
}

export default usersReducer;