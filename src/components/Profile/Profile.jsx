import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {Navigate} from "react-router-dom";
import React from "react";
import Preloader from "../common/preLoader/preloader";

export function Profile(props) {

    if (props.location === "/ProfileInfo" && !props.isAuth) {
        return (<Navigate to={"/Login"}></Navigate>);
    }

    return (
        <div>
            {!props.profile ? <Preloader></Preloader> :
                <>
                    <ProfileInfo isAuth={props.isAuth} location={props.location} profile={props.profile} status={props.status}
                                 updateStatus={props.updateStatus}></ProfileInfo>
                    <MyPostsContainer></MyPostsContainer>
                </>}
        </div>);
}
