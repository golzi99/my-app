import UsersCss from "./UsersCss.module.css"
import React from "react";
import {NavLink} from "react-router-dom";
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"
import {UserType} from "../../types/types";
import {AppDispatch} from "../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {follow, unFollow} from "../../redux/users-reducer.ts";
import {getFollowingInProgress} from "../../redux/users-selectors.ts";

type PropsType = {
    user: UserType,
}

const User: React.FC<PropsType> = ({user}) => {

    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatch = useDispatch()

    const _follow = (userId: number) => {
        dispatch(follow(userId));
    }

    const _unFollow = (userId: number) => {
        dispatch(unFollow(userId));
    }

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
                                                 _unFollow(user.id);
                                             }
                    }>Unfollow</button> :
                        <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    _follow(user.id);
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