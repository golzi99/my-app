import SideBarCss from "./SideBar.module.css";
import FriendIcon from "./FriendIcon/FriendIcon.tsx";

type PropsType = {
    sideBarData: any
}

const SideBar: React.FC<PropsType> = ({sideBarData}) => {
    let friendsElements = sideBarData.topFriends.map(
        (f) => {
            return (<FriendIcon key={f.id} name={f.name} id={f.id}></FriendIcon>);
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

export default SideBar;