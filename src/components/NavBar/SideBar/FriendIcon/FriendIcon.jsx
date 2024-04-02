import FriendIconCss from "./FriendIcon.module.css";

export function FriendIcon(props) {
    return (
        <div className={FriendIconCss.friendItem}>
            <img alt="Avatar"
                 src={props.avatar}/>
            {props.name}
        </div>
    );
}