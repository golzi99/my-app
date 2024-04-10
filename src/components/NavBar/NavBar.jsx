import NavBarCss from "./NavBar.module.css"
import {NavLink} from "react-router-dom";
import {SideBar} from "./SideBar/SideBar";
import StoreContext from "../../StoreContext";

export function NavBar(props) {
    // let state = props.store.getState().sideBar;
    return (
        <StoreContext.Consumer>
            {(store) => {
                let state = store.getState().sideBar;
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
                        <SideBar sideBarData={state} avatars={store.getState().avatars.avatarsStore}></SideBar>
                    </div>
                );
            }
            }
        </StoreContext.Consumer>
    );
}

const SelectedLink = () => {
    return (
        select => select.isActive ? NavBarCss.active : NavBarCss.item
    );
}