import LoginForm from "../common/LoginForm/LoginForm.tsx";
import {useFormikContext} from "formik";

type PropsType = {
    apiError: any,
    captchaUrl: string | null
}

const Login: React.FC<PropsType> = ({apiError, captchaUrl}) => {

    return (
        <div>
            <LoginForm apiError={apiError} captchaUrl={captchaUrl} {...useFormikContext()}></LoginForm>
        </div>
    );
}

export default Login;