import ProfileInfoCss from "./ProfileInfo.module.css";

export function ProfileInfo() {
    return (
        <div className={ProfileInfoCss.profileHeader}>
            <div>
                <img
                    alt="Main Provile Avatar"
                    src='https://ik.imagekit.io/ikmedia/backlit.jpg'></img>
            </div>
            <div className={ProfileInfoCss.descriptionBlock}>
                avatar + description
            </div>
        </div>);

}
