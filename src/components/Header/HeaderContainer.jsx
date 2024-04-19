import {connect} from "react-redux";
import Header from "./Header";
import {useEffect} from "react";
import axios from "axios";
import {setAuthUserData} from "../../redux/auth-reducer";

function HeaderContainer(props) {

    useEffect(() => {
        axios
            .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then((response) => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    props.setAuthUserData(id, login, email);
                }
            });
    });

    return (
        <Header></Header>
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