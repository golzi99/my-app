import * as Yup from 'yup';

export const EmailErrorSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required email'),
    password: Yup.string().required('Required password')
});

export const PostSchema = Yup.object().shape({
    newTextBody: Yup.string()
        .max(100, 'Too Long!')
        .required('Required')
});

export const MessageSchema = Yup.object().shape({
    newTextBody: Yup.string()
        .required('Required')
});