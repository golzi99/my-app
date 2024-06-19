import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer.tsx";
import {Navigate} from "react-router-dom";
import React from "react";
import Preloader from "../common/preLoader/preloader.tsx";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    isOwner: boolean,
}

const Profile: React.FC<PropsType> = ({isOwner}) => {

    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    if (isOwner && !isAuth) {
        return (<Navigate to={"/login"}></Navigate>);
    }

    return (
        <div>
            {!profile ? <Preloader></Preloader> :
                <>
                    <ProfileInfo profile={profile} isOwner={isOwner}></ProfileInfo>
                    <MyPostsContainer profile={profile}></MyPostsContainer>
                </>}
        </div>);
}

export default Profile;