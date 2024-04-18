import NavBarCss from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import {SideBarContainer} from "./SideBar/SideBarContainer";

function NavBar(props) {
    return (
        <div className={NavBarCss.navBar}>
            <nav className={NavBarCss.nav}>
                <div className={NavBarCss.item}>
                    <NavLink to="/ProfileInfo"
                             className={SelectedLink()}>ProfileInfo</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/Dialogs"
                             className={SelectedLink()}>Messages</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/Users"
                             className={SelectedLink()}>Users</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/News"
                             className={SelectedLink()}>News</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/Music"
                             className={SelectedLink()}>Music</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/Settings"
                             className={SelectedLink()}>Settings</NavLink>
                </div>
            </nav>
            <SideBarContainer></SideBarContainer>
        </div>
    );
}

const SelectedLink = () => {
    return (
        select => select.isActive ? NavBarCss.active : NavBarCss.item
    );
}

export default NavBar;