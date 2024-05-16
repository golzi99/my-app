import {usersAPI} from "../API/api";
import {updateObjectInArray} from "../components/Utils/object-helpers";

const FOLLOW_ON_USER = "FOLLOW-ON-USER";
const UNFOLLOW_ON_USER = "UNFOLLOW-ON-USER";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE-IS-FOLLOWING-PROGRESS";

let initState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

const usersReducer = (state = initState, action) => {



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

export const setUsers = (users) => ({
    type: SET_USERS,
    users: users
});

export const followOnUserSuccess = (userId) => ({
    type: FOLLOW_ON_USER,
    userId: userId
});

export const unFollowOnUserSuccess = (userId) => ({
    type: UNFOLLOW_ON_USER,
    userId: userId
});

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
});

export const setTotalUsersCount = (totalCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount: totalCount
});

export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});

export const toggleIsFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: isFetching,
    userId: userId
});

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(setCurrentPage(page));
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));
}

export const unFollow = (userId) => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unFollowOnUserAPI.bind(usersAPI), unFollowOnUserSuccess);
}

export const follow = (userId) => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.followOnUserAPI.bind(usersAPI), followOnUserSuccess);
}

export default usersReducer;