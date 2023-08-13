import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserAll } from "../users/userSlice";
import { addNewPost } from "./postSlice";

function AddPost(props) {

    const [title, setTitle] = useState('')
    const [userId, setUserId] = useState()
    const [content, setContent] = useState('')
    const [status, setStatus] = useState('idle')

    const dispatch = useDispatch()
    const user = useSelector(selectUserAll)
console.log('UU',user,userId);
    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeUserId = e => setUserId(e.target.value);
    const onChangeContent = e => setContent(e.target.value);



  

    const onSubmit = async () => {
        setStatus('pending')
        //body handling
        const users = { "id": Number(userId) }
          const authorAccess=()=>{
           
         const N= user.filter(item=> item.id ===Number(userId))
   // f=N.filter(i=>i===userId)
//    const author=(user.map(item=>item.id))
// const authoeT=author.filter(i=>i===Number(userId))
// const x=authoeT[0]
// const y=user.filter((i,ind)=>i.id===Number(userId)&&i.lastName[0])
          return N
       }
       console.log(authorAccess().map(i=>typeof(i.lastName)),
    //    ,author,authoeT,x,y,
    authorAccess()[0].lastName,
       "NNNN");
let author= authorAccess()[0].lastName
        const reactions = {
            "eyes": 0,
            "heart": 0,
            "hooray": 0,
            "rocket": 0,
            "thumbsUp": 0
        }
        //
        dispatch(addNewPost({ title,author, content,date: Date.now(), reactions: reactions ,users: users}))

        setStatus('idle')
        setTitle('')
        setContent('')
        setUserId('')
    }

   const cancelSubmit=()=>{
return [title,userId,content].every(Boolean) && status==="idle"
}
    const userOption = user.map(user => <option key={user.id} value={user.id}>{user.lastName}</option>)
    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input value={title} onChange={onChangeTitle} type="text" id="postTitle" name="postTitle" placeholder="What's on your mind?" />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onChangeUserId}>
                    <option value=""></option>
                    {userOption}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea value={content} onChange={onChangeContent} id="postContent" name="postContent"></textarea>
                <button type="button" onClick={onSubmit} disabled={!cancelSubmit()}>
                    Save Post
                </button>
            </form>
        </section>
    );
}

export default AddPost;