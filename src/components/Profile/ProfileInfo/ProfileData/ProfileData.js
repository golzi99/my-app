import ProfileInfoCss from "../ProfileInfo.module.css";
import React from "react";

function ProfileData({profile}) {
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
                {Object.entries(profile.contacts).map(([contactTitle, contactValue]) => {
                    if (contactValue) {
                        return (<div key={contactTitle} className={ProfileInfoCss.contact}>
                            <b>{contactTitle}:</b> {contactValue}
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