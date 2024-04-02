import SideBarCss from "./SideBar.module.css";
import {FriendIcon} from "./FriendIcon/FriendIcon";

export function SideBar(props) {

    let friendsElements = props.sideBarData.topFriends.map(
        (f) => {
            return (<FriendIcon name={f.name} avatar={f.avatar}></FriendIcon>);
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