import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {UserType} from "../../types/types";
import Preloader from "../common/preLoader/preloader.tsx";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    pagesCount: () => number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unFollow: (userId: number) => void,
    follow: (userId: number) => void,
    isFetching: boolean,
    onFilterChanged: (filter: FilterType) => void
}

const Users: FC<PropsType> = ({pagesCount, currentPage, onPageChanged, users, followingInProgress, unFollow, follow, isFetching, onFilterChanged}) => {

    return (
        <div>
            <Paginator pagesCount={pagesCount} currentPage={currentPage}
                       onPageChanged={onPageChanged}></Paginator>
            <UsersSearchForm onFilterChanged={onFilterChanged}></UsersSearchForm>
            {isFetching ? <Preloader></Preloader> :
                <div>
                    {users.map(u => {
                        return (<User key={u.id} user={u} followingInProgress={followingInProgress} unFollow={unFollow}
                                      follow={follow}></User>);
                    })
                    }
                </div>}

        </div>
    );
}

export default Users;