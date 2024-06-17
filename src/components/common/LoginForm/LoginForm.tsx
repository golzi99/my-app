import LoginFormCss from "./LoginFormCss.module.css"
import {FormikProps} from "formik";
import {createField} from "../SimpleForms/SimpleForms.tsx";

interface FormValues {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
}

type OwnPropsType = {
    apiError: any,
    captchaUrl: string | null
}

type PropsType = OwnPropsType & FormikProps<FormValues>;


const LoginForm: React.FC<PropsType> = ({apiError, captchaUrl, ...props}) => {

    // const formik = useFormikContext();

    let hasErrorEmail = props.errors.email && props.touched.email;
    let hasErrorPassword = props.errors.password && props.touched.password;

    return (
        <form onSubmit={props.handleSubmit} className={LoginFormCss.loginForm}>
            <div className={hasErrorEmail && LoginFormCss.error}>
                <label htmlFor="email">Email: </label>
                {createField("email", "email", "email","input", props.values.email, "")}
                {hasErrorEmail && <div>{props.errors.email}</div>}
            </div>
            <div className={hasErrorPassword && LoginFormCss.error}>
                <label htmlFor="password">Password: </label>
                {createField("password", "password", "password", "input", props.values.password, "")}
                {hasErrorPassword && <div>{props.errors.password}</div>}
            </div>
            <div>
                <label htmlFor="rememberMe">Remember Me </label>
                {createField("checkbox", "checkbox", "rememberMe", "", props.values.rememberMe)}
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            {captchaUrl && <img alt={"captcha"} src={captchaUrl}/>}
            {captchaUrl && createField("captchaSymbols", "captcha", "captcha", "input", props.values.captcha, "Enter captcha symbols")}
            {apiError ? <div className={LoginFormCss.summaryError}>{apiError}</div> : null}
        </form>
    );
}

export default LoginForm;