import {updateObjectInArray} from "../components/Utils/object-helpers.js";
import {UserType} from "../types/types";
import {AppStateType, InferActionsType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
import {usersAPI} from "../API/users-api.ts";

type usersType = Array<UserType>;

let initState = {
    users: [] as usersType,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users id
};

type InitStateType = typeof initState;

const usersReducer = (state = initState, action: ActionsTypes): InitStateType => {

    switch (action.type) {
        case "FOLLOW_ON_USER":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
            };
        case "UNFOLLOW_ON_USER":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
            };
        case "SET_USERS":
            return {
                ...state,
                users: action.users,
            }
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.totalCount}
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
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

type ActionsTypes = InferActionsType<typeof usersActions>;

export const usersActions = {
    setUsers: (users: usersType) => ({
        type: "SET_USERS",
        users: users
    } as const),
    followOnUserSuccess: (userId: number) => ({
        type: "FOLLOW_ON_USER",
        userId: userId
    } as const),
    unFollowOnUserSuccess: (userId: number) => ({
        type: "UNFOLLOW_ON_USER",
        userId: userId
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: "SET_CURRENT_PAGE",
        currentPage: currentPage
    } as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: "SET_TOTAL_USERS_COUNT",
        totalCount: totalCount
    } as const),
    toggleIsFetching:(isFetching: boolean) => ({
        type: "TOGGLE_IS_FETCHING",
        isFetching: isFetching
    } as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: "TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching: isFetching,
        userId: userId
    } as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(usersActions.toggleIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(usersActions.setCurrentPage(page));
    dispatch(usersActions.toggleIsFetching(false));
    dispatch(usersActions.setUsers(data.items));
    dispatch(usersActions.setTotalUsersCount(data.totalCount));
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(usersActions.toggleIsFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(usersActions.toggleIsFollowingProgress(false, userId));
}

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unFollowOnUserAPI.bind(usersAPI), usersActions.unFollowOnUserSuccess);
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.followOnUserAPI.bind(usersAPI), usersActions.followOnUserSuccess);
}

export default usersReducer;