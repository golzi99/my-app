import {connect} from "react-redux";
import {Login} from "./Login";
import {authLoginUser} from "../../redux/form-reducer";
import {useFormik} from "formik";

function LoginContainer(props) {

    let formik = useFormik({
        initialValues: props.initialValues,
        onSubmit: (values) => {
            let userLoginData = {
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe
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
    initialValues: {
        email: state.form.email,
        password: state.form.password,
        rememberMe: state.form.rememberMe
    }
});

export default connect(mapStateToProps, {authLoginUser})(LoginContainer)