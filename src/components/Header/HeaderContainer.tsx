import {connect} from "react-redux";
import Header from "./Header.tsx";
import {authLogoutUser} from "../../redux/auth-reducer.ts";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}

type MapDispatchPropsType = {
    authLogoutUser: () => void;
}

type PropsType = MapStateToPropsType & MapDispatchPropsType;

const HeaderContainer: React.FC<PropsType> = ({isAuth, login, authLogoutUser}) => {

    return (
        <Header isAuth={isAuth} login={login} authLogoutUser={authLogoutUser}></Header>
    );
}

let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {authLogoutUser})(HeaderContainer);