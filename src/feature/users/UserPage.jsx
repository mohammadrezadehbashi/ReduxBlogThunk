import { useSelector } from "react-redux";
import { selectPostByUser, selectPostsAll } from "../posts/postSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function UserPage() {
    let userId = useParams()

    const userPosts = useSelector(selectPostsAll)

    console.log('userId.id',userId.id)


    function accessUserPosts() {
        // const response = userPosts??[0].filter(i => i.users.id === Number(userId.id))
        // const response = userPosts.filter(i =>i.users.id  === Number(userId.id!=="undefined" ? userId.id : num))
        const response = userPosts.filter(i =>i.users.id  === Number( userId.id ))


        return response
    }
    const postLinks = accessUserPosts().map(post =>
        <li key={post.id}>
            <Link  to={`/posts/${post.id}`} dideo-checked="true">
                {post.title}
            </Link>
        </li>
    )

    return (
        <section>
            <ul>
                {postLinks}
            </ul>
        </section>
    );
}

export default UserPage;