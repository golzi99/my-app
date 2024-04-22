import {connect} from "react-redux";
import Header from "./Header";
import {useEffect} from "react";
import {setAuthUserData} from "../../redux/auth-reducer";
import {authAPI} from "../../API/api";

function HeaderContainer(props) {

    useEffect(() => {
        authAPI.authMe().then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data;
                    props.setAuthUserData(id, login, email);
                }
            });
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

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);