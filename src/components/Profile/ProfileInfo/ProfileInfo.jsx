import ProfileInfoCss from "./ProfileInfo.module.css";
import Preloader from "../../common/preLoader/preloader";
import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"

export function ProfileInfo({profile, status, updateStatus, isOwner, savePhoto}) {

    if (!profile) {
        return (<Preloader></Preloader>);
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    return (
        <div>
            <div className={ProfileInfoCss.descriptionBlock}>
                <div className={ProfileInfoCss.avatarEditable}>
                    {isOwner ?
                        <label role={"button"} title={"Edit your profile photo"}>
                            <input type={"file"} accept={"image/png, image/jpeg"} style={{ display: "none" }}
                            onChange={onMainPhotoSelected}/>
                            <img className={ProfileInfoCss.profileImg} alt="avatarProfile" src={profile.photos.large || nonProfileImg}/>
                        </label>
                        :
                        <img alt="avatarProfile" src={profile.photos.large || nonProfileImg}/>
                    }
                </div>
                <ProfileStatusWithHooks status={status}
                                        updateStatus={updateStatus}></ProfileStatusWithHooks>
            </div>
        </div>
    );
}
