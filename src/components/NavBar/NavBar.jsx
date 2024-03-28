import NavBarClasses from "./NavBar.module.css"
import {NavLink} from "react-router-dom";

export function NavBar() {
    return (
        <nav className={NavBarClasses.nav}>
            <div className={NavBarClasses.item}>
                <NavLink to="/Profile"
                         className={SelectedLink()}>Profile</NavLink>
            </div>
            <div className={NavBarClasses.item}>
                <NavLink to="/Dialogs"
                         className={SelectedLink()}>Messages</NavLink>
            </div>
            <div className={NavBarClasses.item}>
                <NavLink to="/News"
                         className={SelectedLink()}>News</NavLink>
            </div>
            <div className={NavBarClasses.item}>
                <NavLink to="/Music"
                         className={SelectedLink()}>Music</NavLink>
            </div>
            <div className={NavBarClasses.item}>
                <NavLink to="/Settings"
                         className={SelectedLink()}>Settings</NavLink>
            </div>
        </nav>);
}

const SelectedLink = () => {
    return (
        select => select.isActive ? NavBarClasses.active: NavBarClasses.item
    );
}