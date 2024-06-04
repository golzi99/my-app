import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer.tsx";
import {Navigate} from "react-router-dom";
import React from "react";
import Preloader from "../common/preLoader/preloader.tsx";
import {ProfileType} from "../../types/types";

type Props = {
    isAuth: boolean,
    profile: ProfileType,
    status: string,
    isOwner: boolean,
    updateStatus: (status: string) => void,
    savePhoto: (photo: any) => void,
    saveProfile: (profileData: ProfileType, setStatus: any) => void
}

const Profile: React.FC<Props> = ({isAuth, profile, status, isOwner, updateStatus, savePhoto, saveProfile}) => {

    if (isOwner && !isAuth) {
        return (<Navigate to={"/login"}></Navigate>);
    }

    return (
        <div>
            {!profile ? <Preloader></Preloader> :
                <>
                    <ProfileInfo profile={profile} status={status} isOwner={isOwner}
                                 updateStatus={updateStatus} savePhoto={savePhoto}
                                 saveProfile={saveProfile}></ProfileInfo>
                    <MyPostsContainer profile={profile}></MyPostsContainer>
                </>}
        </div>);
}

export default Profile;