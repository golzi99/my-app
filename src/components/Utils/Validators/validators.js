import * as Yup from 'yup';

export const PostSchema = Yup.object().shape({
    newTextBody: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required')
});

export const MessageSchema = Yup.object().shape({
    newTextBody: Yup.string()
        .required('Required')
});