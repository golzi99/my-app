import {addPostActionCreator} from "../../../redux/profile-reducer";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";
import {useFormik} from "formik";
import {PostSchema} from "../../Utils/Validators/validators";

export function MyPostContainer(props) {


    let formik = useFormik({
        initialValues: {
            newTextBody: ''
        },
        validationSchema: PostSchema,
        onSubmit: (values) => {
            props.addPost(values.newTextBody);
            values.newTextBody = '';
        },
    });

    return (
        <div>
            <MyPosts {...props} formik={formik}></MyPosts>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        avatars: state.avatars.avatarsStore,
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPost) => {
            dispatch(addPostActionCreator(newPost));
        },
    };
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostContainer);