import {useDispatch, useSelector} from "react-redux";
import Login from "./Login.tsx";
import {FormikProvider, useFormik} from "formik";
import {LoginErrorSchema} from "../Utils/Validators/validators.js";
import {Navigate} from "react-router-dom";
import {authLoginUser} from "../../redux/auth-reducer.ts";
import {resetProf} from "../../redux/profile-reducer.ts";
import {LoginDataType} from "../../types/types";
import React from "react";
import {AppDispatch, AppStateType} from "../../redux/redux-store";

export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

    const dispatch: AppDispatch = useDispatch()

    const _resetProf = () => {
        dispatch(resetProf());
    }

    const _authLoginUser = (userLoginData, setStatus) => {
        dispatch(authLoginUser(userLoginData, setStatus));
    }

    const _onSubmit = (values, submitProps) => {
        let userLoginData: LoginDataType = {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe,
            captcha: values.captcha
        }
        _resetProf();
        _authLoginUser(userLoginData, submitProps.setStatus);
        submitProps.resetForm();
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        validationSchema: LoginErrorSchema,
        onSubmit: _onSubmit
    })

    let apiErrors;
    if(formik.status) {
        apiErrors = formik.status.error.map((item, index) => <p key={index}>{item}</p>);
    }

    return (
        <FormikProvider value={formik}>
            <div>
                {isAuth ? <Navigate to={"/profile"}/> :
                    <Login apiError={apiErrors} captchaUrl={captchaUrl}></Login>}
            </div>
        </FormikProvider>
    );
}