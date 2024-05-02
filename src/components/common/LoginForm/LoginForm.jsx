export function LoginForm(props) {

    const formik = props.formik;

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && <div>{formik.errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && <div>{formik.errors.password}</div>}
                </div>
                <div>
                    <label htmlFor="rememberMe">Remember Me</label>
                    <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        onChange={formik.handleChange}
                        value={formik.values.rememberMe}
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}