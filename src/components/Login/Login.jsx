import {LoginForm} from "../common/LoginForm/LoginForm";

export function Login(props) {

    return (
        <div>
            <LoginForm apiError={props.apiError}></LoginForm>
        </div>
    );
}