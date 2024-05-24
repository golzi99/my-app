import {addPostActionCreator} from "../../../redux/profile-reducer";
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
                    props.addPost(values.newTextBody);
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
        addPost: (newPost) => {
            dispatch(addPostActionCreator(newPost));
        },
    };
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPostContainer);