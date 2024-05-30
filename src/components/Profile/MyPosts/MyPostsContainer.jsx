import {addPost} from "../../../redux/profile-reducer.ts";
import {connect} from "react-redux";
import {MyPosts} from "./MyPosts";
import {Formik} from "formik";
import {PostSchema} from "../../Utils/Validators/validators";

export function MyPostContainer(props) {
    return (
        <Formik
            initialValues={{
                newTextBody: ''
            }}
            validationSchema={PostSchema}
            onSubmit={
                (values) => {
                    props.addNewPost(values.newTextBody);
                    values.newTextBody = '';
                }
            }
        >
            <MyPosts {...props}></MyPosts>
        </Formik>
    );
}

let mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
        profilePhoto: state.profilePage.profile.photos.small
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        addNewPost: (newPost) => {
            dispatch(addPost(newPost));
        },
    };
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostContainer);