import NavBarClasses from "./NavBar.module.css"

export function NavBar() {
  return (
    <nav className={NavBarClasses.nav}>
      <div className={`${NavBarClasses.item} ${NavBarClasses.active}`}>
        <a>Profile</a>
      </div>
      <div className={NavBarClasses.item}>
        <a>Messages</a>
      </div>
      <div className={NavBarClasses.item}>
        <a>News</a>
      </div>
      <div className={NavBarClasses.item}>
        <a>Music</a>
      </div>
      <div className={NavBarClasses.item}>
        <a>Settings</a>
      </div>
    </nav>);
}
