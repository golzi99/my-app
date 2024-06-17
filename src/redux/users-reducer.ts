import {updateObjectInArray} from "../components/Utils/object-helpers.ts";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../API/users-api.ts";

let initState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users id,
    filter: {
        term: "",
        friend: null as boolean | null
    }
};


const usersReducer = (state = initState, action: ActionsTypes): InitStateType => {

    switch (action.type) {
        case "samurai/users/FOLLOW_ON_USER":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true}),
            };
        case "samurai/users/UNFOLLOW_ON_USER":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false}),
            };
        case "samurai/users/SET_USERS":
            return {
                ...state,
                users: action.users,
            }
        case "samurai/users/SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "samurai/users/SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.totalCount}
        case "samurai/users/TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "samurai/users/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)
            }
        case "samurai/users/SET_FILTER":
            return {
                ...state,
                filter: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export const usersActions = {
    setUsers: (users: Array<UserType>) => ({
        type: "samurai/users/SET_USERS",
        users: users
    } as const),
    followOnUserSuccess: (userId: number) => ({
        type: "samurai/users/FOLLOW_ON_USER",
        userId: userId
    } as const),
    unFollowOnUserSuccess: (userId: number) => ({
        type: "samurai/users/UNFOLLOW_ON_USER",
        userId: userId
    } as const),
    setCurrentPage: (currentPage: number) => ({
        type: "samurai/users/SET_CURRENT_PAGE",
        currentPage: currentPage
    } as const),
    setTotalUsersCount: (totalCount: number) => ({
        type: "samurai/users/SET_TOTAL_USERS_COUNT",
        totalCount: totalCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: "samurai/users/TOGGLE_IS_FETCHING",
        isFetching: isFetching
    } as const),
    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: "samurai/users/TOGGLE_IS_FOLLOWING_PROGRESS",
        isFetching: isFetching,
        userId: userId
    } as const),
    setFilter: (filter: FilterType) => ({
        type: "samurai/users/SET_FILTER",
        payload: filter
    } as const)
}

export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(usersActions.toggleIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
    dispatch(usersActions.setCurrentPage(page));
    dispatch(usersActions.setFilter(filter));
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

export type InitStateType = typeof initState;
export type FilterType = typeof initState.filter;
type ActionsTypes = InferActionsType<typeof usersActions>;
type ThunkType = BaseThunkType<ActionsTypes>;