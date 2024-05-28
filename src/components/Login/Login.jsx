import {LoginForm} from "../common/LoginForm/LoginForm";

export function Login({apiError, captchaUrl}) {

    return (
        <div>
            <LoginForm apiError={apiError} captchaUrl={captchaUrl}></LoginForm>
        </div>
    );
}