import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

export const withAuthRedirect = (Component) => {

    function RedirectComponent(props) {
        if (!props.isAuth) {
            return <Navigate to="/Login"></Navigate>
        }
        return <Component {...props}></Component>
    }

    return connect(mapStateToPropsForRedirect, {})(RedirectComponent);
}