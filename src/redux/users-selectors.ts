// import {createSelector} from "reselect";

import {AppStateType} from "./redux-store";

export const getUsersBase = (state: AppStateType) => {
    return state.usersPage.users;
}

// example
// export const getUsers = createSelector(getUsersBase, (users) => {
//     return users.filter(u => true);
// });


export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter
}