import {Field} from "formik";

export const createField = (type, id, name, placeholder, component, value) => {
    let checked;
    if (type === "checkbox") {
        checked = value;
    }

    return (
        <div>
            <Field type={type}
                   id={id}
                   name={name}
                   placeholder={placeholder}
                   value={value || ""}
                   checked={checked}
                   component={component}/>
        </div>
);
}