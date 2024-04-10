import SideBarCss from "./SideBar.module.css";
import {FriendIcon} from "./FriendIcon/FriendIcon";

export function SideBar(props) {
    let friendsElements = props.sideBarData.topFriends.map(
        (f) => {
            let avatar = props.avatars.find((value) => {
                return value.id === f.id;
            });
            return (<FriendIcon name={f.name} avatar={avatar.avatar} id={f.id}></FriendIcon>);
        }
    );

    return (
        <div>
            <div className={SideBarCss.friends}>
                <h1>Friends</h1>
                <div className={SideBarCss.friendsList}>
                    {friendsElements}
                </div>
            </div>
        </div>);
}