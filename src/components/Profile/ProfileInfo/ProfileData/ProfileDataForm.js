import React from "react";
import {createField} from "../../../common/SimpleForms/SimpleForms";
import {useFormikContext} from "formik";
import ProfileDataCss from "./ProfileDataCss.module.css"

function ProfileDataForm({profile}) {
    const formik = useFormikContext();

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="fullName">
                    <b>Full name: </b>
                </label>
                {createField("fullName", "fullName", "fullName", `${profile.fullName}`, "input")}
                {/*{hasErrorEmail && <div>{formik.errors.email}</div>}*/}
            </div>
            <div>
                <label htmlFor="needJobDescription">
                    <b>Looking for a job description: </b>
                </label>
                {createField("needJobDescription", "needJobDescription", "needJobDescription",
                    `${profile.lookingForAJobDescription}`, "input")}
                {/*{hasErrorEmail && <div>{formik.errors.email}</div>}*/}
            </div>
            <div>
                <label htmlFor="aboutMe">
                    <b>About me: </b>
                </label>
                {createField("aboutMe", "aboutMe", "aboutMe", `${profile.aboutMe}`,"input")}
                {/*{hasErrorEmail && <div>{formik.errors.email}</div>}*/}
            </div>
            <div>
                <label>
                    <b>Contacts:</b>
                </label>
                <div>
                    {Object.entries(profile.contacts).map(([contactTitle, contactValue]) => {
                        return (
                            <div key={contactTitle} className={ProfileDataCss.contact}>
                                <label htmlFor={contactTitle}>
                                    <b>{contactTitle}: </b>
                                </label>
                                {createField({contactTitle}, {contactTitle}, {contactTitle}, `${contactValue}`, "input")}
                            </div>
                        );
                    })}
                </div>
                {/*{hasErrorEmail && <div>{formik.errors.email}</div>}*/}
            </div>
            <button type={"submit"}>SAVE</button>
        </form>
    );
}

export default ProfileDataForm;