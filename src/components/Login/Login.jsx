import {LoginForm} from "../common/LoginForm/LoginForm";

export function Login(props) {

    return (
        <div>
            <LoginForm errors={props.errors} touched={props.touched}></LoginForm>
        </div>
    );
}