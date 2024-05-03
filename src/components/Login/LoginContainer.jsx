import {connect} from "react-redux";
import {Login} from "./Login";
import {authLoginUser} from "../../redux/form-reducer";
import {useFormik} from "formik";

function LoginContainer(props) {

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: false
        },
        onSubmit: (values) => {
            let userLoginData = {
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe,
                captcha: values.captcha
            }
            props.authLoginUser(userLoginData);
        },
    });

    return (
        <div>
            <Login formik={formik}></Login>
        </div>
    );
}

let mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {authLoginUser})(LoginContainer)