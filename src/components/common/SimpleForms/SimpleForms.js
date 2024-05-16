import {Field} from "formik";

export const createField = (type, id, name, component) => {
    return (<Field type={type}
                   id={id}
                   name={name}
                   component={component}/>);
}