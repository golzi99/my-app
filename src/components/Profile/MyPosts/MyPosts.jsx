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
                <Post message='Мой первый пост за все время!' likesCount={15}></Post>
                <Post message='Я смогу добавить props в посты' likesCount={27}></Post>
            </div>
        </div>);
}
