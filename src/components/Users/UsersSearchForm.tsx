import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors.ts";

const userSearchFormValidate = () => {
    return {};
}

type FriendFormType = "true" | "false" | "null";
type FormType = {
    term: string,
    friend: FriendFormType
}

type OwnPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type PropsType = OwnPropsType;

export const UsersSearchForm: React.FC<PropsType> = React.memo(({onFilterChanged}) => {


    const filter = useSelector(getUsersFilter);

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
            enableReinitialize={true}
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
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