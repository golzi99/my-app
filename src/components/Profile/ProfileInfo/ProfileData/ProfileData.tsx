import ProfileInfoCss from "../ProfileInfo.module.css";
import React from "react";
import {ContactsType, ProfileType} from "../../../../types/types";

type PropsType = {
    profile: ProfileType
}

const ProfileData: React.FC<PropsType> = ({profile}) => {
    return (
        <div>
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            }
            {profile.aboutMe &&
                <div>
                    <b>About me:</b> {profile.aboutMe}
                </div>
            }
            <div>
                <b>Contact:</b>
                {Object.keys(profile.contacts).map((contactTitle) => {
                    if (profile.contacts[contactTitle]) {
                        return (<div key={contactTitle} className={ProfileInfoCss.contact}>
                            <b>{contactTitle}:</b> {profile.contacts[contactTitle as keyof ContactsType]}
                        </div>);
                    }
                    else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}

export default ProfileData;