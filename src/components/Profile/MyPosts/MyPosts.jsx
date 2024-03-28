import Posts from "./MyPosts.module.css"
import {Post} from "./Post/Post";

export function MyPosts() {
    return (
        <div>My posts
            <div>New Post
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div className={Posts.postList}>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
                <Post></Post>
            </div>
        </div>);
}
