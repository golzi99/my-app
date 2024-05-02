import {LoginForm} from "../common/LoginForm/LoginForm";

export function Login(props) {

    return (
        <div>
            <LoginForm formik={props.formik}></LoginForm>
        </div>
    );
}