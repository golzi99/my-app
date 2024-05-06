import PostSmtCss from "./PostSmtFormCss.module.css"
import React from "react";
import {Field, Form} from "formik";

export function PostSmtFormFormik(props) {

    let hasError = props.touched.newTextBody && props.errors.newTextBody;
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
                {hasError ? <div>{props.errors.newTextBody}</div> : null}
                <button type="submit">Send</button>
            </Form>
        </div>
    );
}