import {addNewPost} from "../../../redux/profile-reducer.ts";
import {connect} from "react-redux";
import MyPosts from "./MyPosts.tsx";
import {Formik} from "formik";
import {PostSchema} from "../../Utils/Validators/validators.js";
import {PostDataType, ProfileType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

type MapStateToPropsType = {
    postsData: Array<PostDataType>,
}

type MapDispatchPropsType = {
    addNewPost: (textPost: string) => void
}

type OwnPropsType = {
    profile: ProfileType
}

type Props = MapStateToPropsType & MapDispatchPropsType & OwnPropsType;

const MyPostContainer: React.FC<Props> = ({postsData, addNewPost, profile}) => {

    return (
        <Formik
            initialValues={{
                newTextBody: ''
            }}
            validationSchema={PostSchema}
            onSubmit={
                (values) => {
                    addNewPost(values.newTextBody);
                    values.newTextBody = '';
                }
            }
        >
            <MyPosts postsData={postsData} profile={profile}></MyPosts>
        </Formik>
    );
}

let mapStateToProps = (state : AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
    };
}

export const MyPostsContainer = connect(mapStateToProps, {addNewPost})(MyPostContainer);