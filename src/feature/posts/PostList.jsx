import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, selectPostById, selectPostId } from "./postSlice";
import Reactions from "./Reactions";
import PostTimeAgo from "./PostTimeAgo";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PostAuthor from "./PostAuthor";
import { selectUserById } from "../users/userSlice";

function PostExpert({ postId }) {
    // console.log('ppapapapap', postId);
    const post = useSelector(state => selectPostById(state, postId))
    // console.log("posrexpert", post.users?.id);

    return (
        <article className="post-excerpt">
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.users?.id} />
                <PostTimeAgo date={post.date} />
            </div>
            <p className="post-content">{post.content?.substring(0, 70)}</p>
            <Reactions reactions={post.reactions} postId={post.id}/>
            <Link className="button muted-button" to={`/posts/${post.id}`} dideo-checked="true">View Post</Link>
        </article>
    )
}


function PostList(props) {
    const postId = useSelector(selectPostId)
    const status = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    const dispatch = useDispatch();
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts())
        }
    }, [dispatch, status])

    // console.log('postid', postId);
    let content
    if ('loading' === status) {
        content = <div className="loader">loading ...</div>
    } else if ('success' === status) {
        content = postId.map(id => <PostExpert postId={id} key={id} />)
    } else if ('error' === status) {
        content = <div className="error">{error}</div>
    }
    return (
        <section className="posts-list">
            <h2>posts</h2>
            {content}
        </section>
    );
}

export default PostList;