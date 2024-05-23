import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {Navigate} from "react-router-dom";
import React from "react";
import Preloader from "../common/preLoader/preloader";

export function Profile(props) {

    if (props.isOwner && !props.isAuth) {
        return (<Navigate to={"/Login"}></Navigate>);
    }

    return (
        <div>
            {!props.profile ? <Preloader></Preloader> :
                <>
                    <ProfileInfo profile={props.profile} status={props.status} isOwner={props.isOwner}
                                 updateStatus={props.updateStatus} savePhoto={props.savePhoto}></ProfileInfo>
                    <MyPostsContainer></MyPostsContainer>
                </>}
        </div>);
}
