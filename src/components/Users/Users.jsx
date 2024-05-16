import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

function Users({pagesCount, currentPage, onPageChanged, users, ...props}) {

    return (
        <div>
            <Paginator pagesCount={pagesCount} currentPage={currentPage}
                       onPageChanged={onPageChanged}></Paginator>
            {users.map(u => {
                return (<User key={u.id} user={u} followingInProgress={props.followingInProgress} unFollow={props.unFollow}
                              follow={props.follow}></User>);
            })
            }
        </div>
    );
}

export default Users;