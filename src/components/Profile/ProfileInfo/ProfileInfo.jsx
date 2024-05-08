import ProfileInfoCss from "./ProfileInfo.module.css";
import Preloader from "../../common/preLoader/preloader";
import React from "react";
import ProfileStatus from "./ProfileStatus"

export function ProfileInfo(props) {
    if (!props.profile) {
        return (<Preloader></Preloader>);
    }
    return (
        <div>
            <div className={ProfileInfoCss.backgroundProfile}></div>
            <div className={ProfileInfoCss.descriptionBlock}>
                <img alt="avatarProfile" src={props.profile.photos.large}/>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}></ProfileStatus>
            </div>
        </div>
    );
}
