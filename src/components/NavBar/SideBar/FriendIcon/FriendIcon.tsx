import FriendIconCss from "./FriendIcon.module.css";
import {NavLink} from "react-router-dom";
import nonProfileImg from "../../../../assets/img/noProfilePictureIcon.png"

type PropsType = {
    id: number,
    name: string
}

const FriendIcon: React.FC<PropsType> = ({id, name}) => {
    let path = `/dialogs/${id}`;

    return (
        <div className={FriendIconCss.friendItem}>
            <NavLink to={path} className={FriendIconCss.linkBestFriend}>
                <img alt="Avatar"
                     src={nonProfileImg}/>
                {name}
            </NavLink>
        </div>
    );
}

export default FriendIcon;