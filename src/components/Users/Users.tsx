import React, {FC} from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {UserType} from "../../types/types";
import Preloader from "../common/preLoader/preloader.tsx";

type Props = {
    pagesCount: () => number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unFollow: (userId: number) => void,
    follow: (userId: number) => void,
    isFetching: boolean
}

const Users: FC<Props> = ({pagesCount, currentPage, onPageChanged, users, followingInProgress, unFollow, follow, isFetching}) => {

    return (
        <div>
            <Paginator pagesCount={pagesCount} currentPage={currentPage}
                       onPageChanged={onPageChanged}></Paginator>
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