import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export function Profile(props) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} isAuth={props.isAuth}
                         updateStatus={props.updateStatus}></ProfileInfo>
            <MyPostsContainer></MyPostsContainer>
        </div>);
}
