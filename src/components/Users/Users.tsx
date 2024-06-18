import React, {useEffect} from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import Preloader from "../common/preLoader/preloader.tsx";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {FilterType, requestUsers} from "../../redux/users-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersBase,
    getUsersFilter
} from "../../redux/users-selectors.ts";
import {AppDispatch} from "../../redux/redux-store";

export const Users: React.FC = () => {

    const users = useSelector(getUsersBase);
    const currentPage = useSelector(getCurrentPage);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const isFetching = useSelector(getIsFetching);

    const dispatch: AppDispatch = useDispatch()

    const onPageChanged = (pageNumber) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter));
    }

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    }, []);


    return (
        <div>
            <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount}
                       pageSize={pageSize} onPageChanged={onPageChanged}></Paginator>
            <UsersSearchForm onFilterChanged={onFilterChanged}></UsersSearchForm>
            {isFetching ? <Preloader></Preloader> :
                <div>
                    {users.map(u => {
                        return (<User key={u.id} user={u}></User>);
                    })
                    }
                </div>}

        </div>
    );
}