import {connect} from "react-redux";
import {Login} from "./Login";
import {authLoginUser} from "../../redux/form-reducer";
import {Formik} from "formik";
import {EmailErrorSchema} from "../Utils/Validators/validators";
import {Navigate} from "react-router-dom";

function LoginContainer(props) {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: false
            }}
            validationSchema={EmailErrorSchema}
            onSubmit={
                (values) => {
                    let userLoginData = {
                        email: values.email,
                        password: values.password,
                        rememberMe: values.rememberMe,
                        captcha: values.captcha
                    }
                    props.authLoginUser(userLoginData);
                }
            }
        >
            {({errors, touched}) => (
                <div>
                    {props.isAuth ? <Navigate to={"/ProfileInfo"}/> :
                    <Login errors={errors} touched={touched}></Login>}
                </div>
            )}
        </Formik>
    );
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {authLoginUser})(LoginContainer)