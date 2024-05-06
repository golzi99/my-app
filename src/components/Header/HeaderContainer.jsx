import {connect} from "react-redux";
import Header from "./Header";
import {useEffect} from "react";
import {getAuthUserData} from "../../redux/auth-reducer";
import {authLogoutUser} from "../../redux/form-reducer";

function HeaderContainer(props) {

    useEffect(() => {
        props.getAuthUserData();
    });

    return (
        <Header {...props}></Header>
    );
}

let mapStateToProps = (state) => ({
    userId: state.auth.userId,
    email: state.auth.email,
    login: state.auth.login,
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
});

export default connect(mapStateToProps, {getAuthUserData, authLogoutUser})(HeaderContainer);