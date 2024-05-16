import {LoginForm} from "../common/LoginForm/LoginForm";

export function Login({apiError}) {

    return (
        <div>
            <LoginForm apiError={apiError}></LoginForm>
        </div>
    );
}