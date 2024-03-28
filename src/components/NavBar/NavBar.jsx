import NavBarClasses from "./NavBar.module.css"

export function NavBar() {
    return (
        <nav className={NavBarClasses.nav}>
            <div className={`${NavBarClasses.item} ${NavBarClasses.active}`}>
                <a href="#Profile">Profile</a>
            </div>
            <div className={NavBarClasses.item}>
                <a href="#Messages">Messages</a>
            </div>
            <div className={NavBarClasses.item}>
                <a href="#News">News</a>
            </div>
            <div className={NavBarClasses.item}>
                <a href="#Music">Music</a>
            </div>
            <div className={NavBarClasses.item}>
                <a href="#Settings">Settings</a>
            </div>
        </nav>);
}
