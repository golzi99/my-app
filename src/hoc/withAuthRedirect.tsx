import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

type MapPropsType = {
    isAuth: boolean
}

export function withAuthRedirect<WCP> (Component: React.ComponentType<WCP>)  {

    const RedirectComponent: React.FC<WCP & MapPropsType> = (props) => {
        let {isAuth, ...restProps} = props;

        if (!isAuth) {
            return <Navigate to="/login"></Navigate>
        }

        return <Component {...restProps}></Component>
    }

    return connect(mapStateToPropsForRedirect, {})(RedirectComponent);
}