import PostSmtCss from "./PostSmtFormCss.module.css"
import React from "react";

export function PostSmtFormFormik(props) {

    const formik = props.formik;

    return (
        <div className={PostSmtCss.sendMessageBox}>
            <form onSubmit={formik.handleSubmit}>
                <textarea
                    type="textarea"
                    id="newTextBody"
                    name="newTextBody"
                    onChange={formik.handleChange}
                    value={formik.values.newTextBody}
                />
                {formik.touched.newTextBody && formik.errors.newTextBody ? <div>{formik.errors.newTextBody}</div> : null}
                <button type="submit">Send</button>
            </form>
        </div>
    );
}