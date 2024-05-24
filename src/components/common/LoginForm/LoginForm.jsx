import LoginFormCss from "./LoginFormCss.module.css"
import {useFormikContext} from "formik";
import {createField} from "../SimpleForms/SimpleForms";

export function LoginForm({apiError}) {

    const formik = useFormikContext();

    let hasErrorEmail = formik.errors.email && formik.touched.email;
    let hasErrorPassword = formik.errors.password && formik.touched.password;

    return (
        <form onSubmit={formik.handleSubmit} className={LoginFormCss.loginForm}>
            <div className={hasErrorEmail && LoginFormCss.error}>
                <label htmlFor="email">Email: </label>
                {createField("email", "email", "email", "","input")}
                {hasErrorEmail && <div>{formik.errors.email}</div>}
            </div>
            <div className={hasErrorPassword && LoginFormCss.error}>
                <label htmlFor="password">Password: </label>
                {createField("password", "password", "password", "", "input")}
                {hasErrorPassword && <div>{formik.errors.password}</div>}
            </div>
            <div>
                <label htmlFor="rememberMe">Remember Me </label>
                {createField("checkbox", "checkbox", "rememberMe")}
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            {apiError ? <div className={LoginFormCss.summaryError}>{apiError}</div> : null}
        </form>
    );
}