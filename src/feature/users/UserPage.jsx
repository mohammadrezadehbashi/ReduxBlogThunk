import { useSelector } from "react-redux";
import { selectPostByUser, selectPostsAll } from "../posts/postSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function UserPage() {
    let userId = useParams()

    const userPosts = useSelector(selectPostsAll)
    // const user = useSelector(selectUserAll)
    console.log('zzz',userId.id,userPosts)

    function accessUserPosts() {
        // const response = userPosts??[0].filter(i => i.users.id === Number(userId.id))
        const response = userPosts.filter(i => i.users.id === Number(userId.id))

        return response
    }
    const postLinks = accessUserPosts().map(post =>
        <li>
                    {/* {console.log("HAAA",post.id)} */}

            <Link key={post.id} to={`/posts/${post.id}`} dideo-checked="true">
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