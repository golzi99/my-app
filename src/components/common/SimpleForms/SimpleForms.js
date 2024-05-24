import {Field} from "formik";

export const createField = (type, id, name, placeholder, component) => {
    return (<Field type={type}
                   id={id}
                   name={name}
                   placeholder={placeholder}
                   component={component}/>);
}