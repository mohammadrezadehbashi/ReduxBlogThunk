import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
// import { client } from "../../api/client";


export const fetchPosts = createAsyncThunk('posts/fetchposts', async () => {
    const response = await fetch('http://localhost:3000/posts')
    // .then(response => response.json())
    // .then(response=>console.log(response));
    const res = await response.json();
    // console.log("posts", res);
    // client.get('posts')

    return res
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (data) => {
    const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    })
    const res = await response.json();
    console.log("users", res);
    return res
}
)

export const increaseReaction = createAsyncThunk('posts/increaseReactions', async ({ postId, reaction }) => {
    // console.log("*********",postId,reaction,`http://localhost:3000/posts/${postId}/author`);
    await fetch(`http://localhost:3000/posts/${postId}/reactions/${reaction}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(),
    })

    return { postId, reaction }
})

export const fetchPostsID = createAsyncThunk('posts/fetchPostsID', async (postId) => {
    const response = await fetch(`http://localhost:3000/posts/${postId}`)
    // .then(response => response.json())
    // .then(response=>console.log(response));
    const res = await response.json();
    // console.log("posts", res);
    // client.get('posts')

    return res
})
//تابع زیر یک سری قابلیت ها میده که با لاگ گرفتنش میتونیم متدها و پراپرتی هاشو ببینیم 
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date - a.date
})
export const {
    selectById: selectPostById,
    selectIds: selectPostId,
    selectAll: selectPostsAll
} = postsAdapter.getSelectors(state => state.posts);

export const selectPostByUser = createSelector(
    selectPostsAll,
    (state, userId) => userId,
    (posts, userId) => posts.filter(post => post.users.id === userId)
)

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
});

const postSlice = createSlice({
    name: 'posts',
    initialState,
    // initialState: {
    //     status: 'idle',
    //     entities: []
    // },
    reducers: {},
    extraReducers:
    // (builder) => {
    //     builder.addCase(fetchPosts().pending, (state) => {
    //         state.status = 'loading'

    //     }).addCase(fetchPosts().fullfilled, (state, action) => {
    //         state.entities = action.payload
    //         state.status = "idle"
    //     }).addCase(fetchPosts().rejected, (state, action) => {
    //         state.status = "idle"
    //         console.log(action.payload);
    //     })
    // }
    {
        [fetchPosts.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {

            postsAdapter.upsertMany(state, action.payload)
            // state.entities = action.payload
            state.status = "success"
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = "error"
            state.error = action.payload
        },
        [addNewPost.fulfilled]: postsAdapter.addOne
        // (state, action) => {
        //     state.entities.push(action.payload)
        //چون از ادپتور استفاده میشه نیازی به روش بالا نیست 
        // }
        , [increaseReaction.fulfilled]: (state, action) => {
            const { reaction, postId } = action.payload
            state.entities[postId].reactions[reaction] += 1
        },
        [fetchPostsID.fulfilled]: (state, action) => {
            postsAdapter.setOne(state, action.payload)
        }
    }

})

export default postSlice.reducer