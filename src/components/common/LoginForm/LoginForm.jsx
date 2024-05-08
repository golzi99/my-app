import LoginFormCss from "./LoginFormCss.module.css"
import {Field, useFormikContext} from "formik";

export function LoginForm(props) {

    const formik = useFormikContext();

    let hasErrorEmail = formik.errors.email && formik.touched.email;
    let hasErrorPassword = formik.errors.password && formik.touched.password;

    return (
        <form onSubmit={formik.handleSubmit} className={LoginFormCss.loginForm}>
            <div>
                <label htmlFor="email">Email: </label>
                <Field className={hasErrorEmail && LoginFormCss.error}
                       type="email"
                       id="email"
                       name="email"
                       component="input"
                />
                {hasErrorEmail && <div>{formik.errors.email}</div>}
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <Field className={hasErrorPassword && LoginFormCss.error}
                       type="password"
                       id="password"
                       name="password"
                       component="input"
                />
                {hasErrorPassword && <div>{formik.errors.password}</div>}
            </div>
            <div>
                <label htmlFor="rememberMe">Remember Me </label>
                <Field
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            {props.apiError ? <div className={LoginFormCss.summaryError}>{props.apiError}</div> : null}
        </form>
    );
}