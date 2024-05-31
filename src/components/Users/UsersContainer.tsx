import {connect} from "react-redux";
import {
    unFollow, follow, requestUsers
} from "../../redux/users-reducer.ts";
import React, {useEffect} from "react";
import Users from "./Users.tsx";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsersBase
} from "../../redux/users-selectors.ts";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store.ts";

type MapStateToPropsType = {
    currentPage: number,
    pageSize: number,
    totalUsersCount: number,
    isFetching: boolean,
    users: Array<UserType>,
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage, pageSize) => void,
    unFollow: (userId: number) => void,
    follow: (userId: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type Props = MapStateToPropsType & MapDispatchPropsType & OwnPropsType;

const UsersContainer: React.FC<Props> = ({currentPage, pageSize, totalUsersCount, requestUsers,
                                             users, followingInProgress, follow, unFollow, isFetching
}) => {


    const pagesCount = () => {
        return Math.ceil(totalUsersCount / pageSize);
    };

    const onPageChanged = (pageNumber) => {
        requestUsers(pageNumber, pageSize);
    };

    useEffect(() => {
        requestUsers(currentPage, pageSize);
    }, [currentPage, pageSize, requestUsers]);

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
});

export default compose(connect<MapStateToPropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    unFollow, follow, requestUsers}))(UsersContainer);

//setCurrentPage