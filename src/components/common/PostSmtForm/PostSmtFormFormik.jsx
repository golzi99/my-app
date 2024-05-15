import PostSmtCss from "./PostSmtFormCss.module.css"
import React from "react";
import {Field, Form, useFormikContext} from "formik";

export function PostSmtFormFormik() {

    const formik = useFormikContext();

    let hasError = formik.touched.newTextBody && formik.errors.newTextBody;
    return (
        <div className={PostSmtCss.sendMessageBox}>
            <Form>
                <Field
                    type="textarea"
                    id="newTextBody"
                    name="newTextBody"
                    placeholder="Enter your message"
                    component="textarea"
                />
                {hasError ? <div>{formik.errors.newTextBody}</div> : null}
                <button type="submit">Send</button>
            </Form>
        </div>
    );
}