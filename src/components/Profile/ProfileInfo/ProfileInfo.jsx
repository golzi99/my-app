import ProfileInfoCss from "./ProfileInfo.module.css";
import Preloader from "../../common/preLoader/preloader";
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

export function ProfileInfo({profile, status, updateStatus}) {
    if (!profile) {
        return (<Preloader></Preloader>);
    }
    return (
        <div>
            <div className={ProfileInfoCss.backgroundProfile}></div>
            <div className={ProfileInfoCss.descriptionBlock}>
                {!profile.photos.large ? <img alt="avatarProfile" src={`/img/no-profile-picture-icon.png`}/> :
                    <img alt="avatarProfile" src={profile.photos.large}/>}
                <ProfileStatusWithHooks status={status}
                                        updateStatus={updateStatus}></ProfileStatusWithHooks>
            </div>
        </div>
    );
}
