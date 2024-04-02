import Posts from "./MyPosts.module.css"
import {Post} from "./Post/Post";

export function MyPosts(props) {
    const avatar = props.avatar;

    let postsElements = props.postsData.map((p) => {
        return (<Post message={p.message} likesCount={p.likesCount} id={p.id} avatar={avatar}></Post>)
    })

    return (
        <div className={Posts.postsBlock}>
            <h3>My posts</h3>
            <div>New Post
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={Posts.postList}>
                {postsElements}
                {/*<Post message='Мой первый пост за все время!' likesCount={15}></Post>*/}
                {/*<Post message='Я смогу добавить props в посты' likesCount={27}></Post>*/}
            </div>
        </div>);
}
