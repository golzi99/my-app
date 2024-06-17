import PostSmtCss from "./PostSmtFormCss.module.css"
import React from "react";
import {Field, Form, FormikProps, useFormikContext} from "formik";

interface FormValues {
    newTextBody: string;
}

type PropsType = FormikProps<FormValues>;

const PostedForm: React.FC<PropsType> = () => {

    const formik = useFormikContext<FormValues>();

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

export default PostedForm;