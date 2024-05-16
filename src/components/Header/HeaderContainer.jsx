import {connect} from "react-redux";
import Header from "./Header";
import {authLogoutUser} from "../../redux/auth-reducer";

function HeaderContainer(props) {

    return (
        <Header {...props}></Header>
    );
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {authLogoutUser})(HeaderContainer);