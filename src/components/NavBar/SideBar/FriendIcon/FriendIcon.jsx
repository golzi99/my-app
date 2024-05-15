import FriendIconCss from "./FriendIcon.module.css";
import {NavLink} from "react-router-dom";

export function FriendIcon(props) {
    let path = `/Dialogs/${props.id}`;

    return (
        <div className={FriendIconCss.friendItem}>
            <NavLink to={path} className={FriendIconCss.linkBestFriend}>
                <img alt="Avatar"
                     src={`/img/no-profile-picture-icon.png`}/>
                {props.name}
            </NavLink>
        </div>
    );
}