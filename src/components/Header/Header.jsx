import HeaderClass from "./Header.module.css"

function Header() {
    return (<header className={HeaderClass.header}>
        <img alt="Logo"
             src='https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-1-580x435.png'></img>
    </header>);
}

export default Header;