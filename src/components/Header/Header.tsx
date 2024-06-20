import HeaderClass from "./Header.module.css"
import {NavLink} from "react-router-dom";
import logo from "../../assets/img/logo2.png"

type PropsType = {
    isAuth: boolean,
    login: string | null,
    authLogoutUser: () => void;
}

const Header: React.FC<PropsType> = ({isAuth, login, authLogoutUser}) => {
    return (
        <header className={HeaderClass.header}>
            <img alt="Logo"
                 src={logo}></img>
            <div className={HeaderClass.loginBlock}>
                {isAuth ?
                    <span>
                        <span>{login}</span>
                        <NavLink to={"/login"} onClick={authLogoutUser}>Logout</NavLink>
                    </span> :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>);
}

export default Header;