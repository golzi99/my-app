import HeaderClass from "./Header.module.css"
import {NavLink} from "react-router-dom";
import logo from "@assets/img/logo2.png"

function Header(props) {
    return (
        <header className={HeaderClass.header}>
            <img alt="Logo"
                 src={logo}></img>
            <div className={HeaderClass.loginBlock}>
                {props.isAuth ?
                    <span>
                        <span>{props.login}</span>
                        <NavLink to={"/Login"} onClick={props.authLogoutUser}>Logout</NavLink>
                    </span> :
                    <NavLink to={'/Login'}>Login</NavLink>}
            </div>
        </header>);
}

export default Header;