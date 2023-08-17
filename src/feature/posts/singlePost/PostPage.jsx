import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchPostsID, selectPostById } from '../postSlice';
// import { selectUserById } from '../../users/userSlice';
import { Link } from 'react-router-dom';
import Reactions from "../Reactions";
import PostTimeAgo from "../PostTimeAgo";
import PostAuthor from "../PostAuthor";

function PostPage(props) {
    let postId = useParams()

    console.log("postID",postId.id);

    const post = useSelector(state => selectPostById(state, postId.id))

    // const dispatch = useDispatch();
    // useEffect(() => {
        // dispatch(fetchPostsID())
    // }, [dispatch])

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <div>
                    <PostAuthor userId={post.users?.id} />
                    <PostTimeAgo date={post.date} />
                </div>
                <p className="post-content">{post.content}</p>
                <Reactions reactions={post.reactions} postId={post.id} />
                
                <Link className="button" to={'/users/'} dideo-checked="true">Back</Link>
            </article>
        </section>
    );
}

export default PostPage;