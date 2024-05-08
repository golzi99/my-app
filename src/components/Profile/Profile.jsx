import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export function Profile(props) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} initialized={props.initialized}
                         updateStatus={props.updateStatus}></ProfileInfo>
            <MyPostsContainer></MyPostsContainer>
        </div>);
}
