import {connect} from "react-redux";
import {Login} from "./Login";
import {FormikProvider, useFormik} from "formik";
import {LoginErrorSchema} from "../Utils/Validators/validators";
import {Navigate} from "react-router-dom";
import {authLoginUser} from "../../redux/auth-reducer";
import {resetProf} from "../../redux/profile-reducer";

function LoginContainer({resetProf, authLoginUser, isAuth, captchaUrl}) {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        validationSchema: LoginErrorSchema,
        onSubmit:
            (values, submitProps) => {
                let userLoginData = {
                    email: values.email,
                    password: values.password,
                    rememberMe: values.rememberMe,
                    captcha: values.captcha
                }
                resetProf();
                authLoginUser(userLoginData, submitProps.setStatus);
                submitProps.resetForm();
            }
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

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {authLoginUser, resetProf})(LoginContainer)