import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";

const userSearchFormValidate = () => {
    return {};
}

type FormType = {
    term: string,
    friend: "true" | "false" | "null"
}

type OwnPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type PropsType = OwnPropsType;

export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter:FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true"
        }

        onFilterChanged(filter)
        setSubmitting(false); // update this method when it is trying to load info
    }

    return (<div>
        <Formik
            initialValues={{term: '', friend: "null"}}
            validate={userSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>);
})
// in option be attention because send strings can be wrong with api server