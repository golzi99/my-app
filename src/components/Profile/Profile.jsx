import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export function Profile(props) {
    return (
        <div>
            <ProfileInfo profile={props.profile} isAuth={props.isAuth}></ProfileInfo>
            <MyPostsContainer></MyPostsContainer>
        </div>);
}
