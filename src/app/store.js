import { configureStore } from "@reduxjs/toolkit"
import postSlice from "../feature/posts/postSlice"
import userSlice from "../feature/users/userSlice"


const store=configureStore({
    reducer:{
        posts: postSlice,
        users:userSlice
    }
})

export default store