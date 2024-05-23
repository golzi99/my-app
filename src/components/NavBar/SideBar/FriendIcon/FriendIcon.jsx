import FriendIconCss from "./FriendIcon.module.css";
import {NavLink} from "react-router-dom";
import nonProfileImg from "@assets/img/noProfilePictureIcon.png"

export function FriendIcon(props) {
    let path = `/Dialogs/${props.id}`;

    return (
        <div className={FriendIconCss.friendItem}>
            <NavLink to={path} className={FriendIconCss.linkBestFriend}>
                <img alt="Avatar"
                     src={nonProfileImg}/>
                {props.name}
            </NavLink>
        </div>
    );
}