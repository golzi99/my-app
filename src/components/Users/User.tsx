import UsersCss from "./UsersCss.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"
import {UserType} from "../../types/types";

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    unFollow: (userId: number) => void,
    follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, unFollow, follow}) => {
    return (
        <div key={user.id} className={UsersCss.userList}>
            <span>
                <div>
                    <NavLink to={`/profile/${user.id}`}>
                        <img alt="avatar" src={user.photos.small || nonProfileImg}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ? <button disabled={followingInProgress.some(id => id === user.id)}
                                             onClick={() => {
                                                 unFollow(user.id);
                                             }
                    }>Unfollow</button> :
                        <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    follow(user.id);
                                }
                        }>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>);
}

export default User;