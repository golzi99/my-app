import NavBarCss from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import {SideBarContainer} from "./SideBar/SideBarContainer";

function NavBar() {
    return (
        <div className={NavBarCss.navBar}>
            <nav className={NavBarCss.nav}>
                <div className={NavBarCss.item}>
                    <NavLink to="/profile"
                             className={SelectedLink()}>ProfileInfo</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/dialogs"
                             className={SelectedLink()}>Messages</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/users"
                             className={SelectedLink()}>Users</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/news"
                             className={SelectedLink()}>News</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/music"
                             className={SelectedLink()}>Music</NavLink>
                </div>
                <div className={NavBarCss.item}>
                    <NavLink to="/settings"
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