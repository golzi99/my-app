import {connect} from "react-redux";
import {
    unFollow, follow, requestUsers, FilterType
} from "../../redux/users-reducer.ts";
import React, {useEffect} from "react";
import Users from "./Users.tsx";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsersBase, getUsersFilter
} from "../../redux/users-selectors.ts";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    totalUsersCount: number,
    isFetching: boolean,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    filter: FilterType
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void,
    unFollow: (userId: number) => void,
    follow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStateToPropsType & MapDispatchPropsType & OwnPropsType;

const UsersContainer: React.FC<PropsType> = ({currentPage, pageSize, totalUsersCount, requestUsers, filter,
                                             users, followingInProgress, follow, unFollow, isFetching
}) => {


    const pagesCount = () => {
        return Math.ceil(totalUsersCount / pageSize);
    };

    const onPageChanged = (pageNumber) => {
        requestUsers(pageNumber, pageSize, filter);
    };

    const onFilterChanged = (filter: FilterType) => {
        requestUsers(1, pageSize, filter)
    }

    useEffect(() => {
        requestUsers(currentPage, pageSize, filter);
    }, []);

    return (
        <>
            <Users pagesCount={pagesCount}
                   onPageChanged={onPageChanged}
                   unFollow={unFollow}
                   follow={follow}
                   users={users}
                   currentPage={currentPage}
                   followingInProgress={followingInProgress}
                   isFetching={isFetching}
                   onFilterChanged={onFilterChanged}
            ></Users>
        </>
    );
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    users: getUsersBase(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
});

export default compose(connect<MapStateToPropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    unFollow, follow, requestUsers}))(UsersContainer);

//setCurrentPage