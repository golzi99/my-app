import LoginFormCss from "./LoginFormCss.module.css"
import {Field, Form} from "formik";

export function LoginForm(props) {

    let hasErrorEmail = props.errors.email && props.touched.email;
    let hasErrorPassword = props.errors.password && props.touched.password;

    return (
        <div>
            <Form className={LoginFormCss.loginForm}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <Field className={hasErrorEmail && LoginFormCss.error}
                           type="email"
                           id="email"
                           name="email"
                           component="input"
                    />
                    {hasErrorEmail && <div>{props.errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <Field className={hasErrorPassword && LoginFormCss.error}
                           type="password"
                           id="password"
                           name="password"
                           component="input"
                    />
                    {hasErrorPassword && <div>{props.errors.password}</div>}
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
            </Form>
        </div>
    );
}