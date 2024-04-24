import HeaderClass from "./Header.module.css"
import {NavLink} from "react-router-dom";

function Header(props) {
    return (
        <header className={HeaderClass.header}>
            <img alt="Logo"
                 src='https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-1-580x435.png'></img>
            <div className={HeaderClass.loginBlock}>
                {props.isAuth ? props.login :
                <NavLink to={'/Login'}>Login</NavLink>}
            </div>
        </header>);
}

export default Header;