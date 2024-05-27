import * as Yup from 'yup';

export const LoginErrorSchema = Yup.object().shape({
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

// export const WebSiteSchema = Yup.object().shape({
//     contacts: Yup.object().shape({
//         facebook: Yup.string().url("Wrong url!").nullable(),
//         website: Yup.string().url("Wrong url!").nullable(),
//         vk: Yup.string().url("Wrong url!").nullable(),
//         twitter: Yup.string().url("Wrong url!").nullable(),
//         instagram: Yup.string().url("Wrong url!").nullable(),
//         youtube: Yup.string().url("Wrong url!").nullable(),
//         github: Yup.string().url("Wrong url!").nullable(),
//         mainLink: Yup.string().url("Wrong url!").nullable(),
//     })
// });

export const WebSiteSchema = Yup.object().shape({
        facebook: Yup.string().url("Wrong url!").nullable(),
        website: Yup.string().url("Wrong url!").nullable(),
        vk: Yup.string().url("Wrong url!").nullable(),
        twitter: Yup.string().url("Wrong url!").nullable(),
        instagram: Yup.string().url("Wrong url!").nullable(),
        youtube: Yup.string().url("Wrong url!").nullable(),
        github: Yup.string().url("Wrong url!").nullable(),
        mainLink: Yup.string().url("Wrong url!").nullable(),
});