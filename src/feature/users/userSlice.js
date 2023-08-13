import { createAsyncThunk, createSlice , createEntityAdapter} from "@reduxjs/toolkit";
// import { client } from "../../api/client";


export const fetchUsers = createAsyncThunk('users/fetchposts', async () => {
    const response = await fetch('http://localhost:3000/users')
    // .then(response => response.json())
    // .then(response=>console.log(response));
    const res = await response.json();
    console.log("dataaa", res);
    // client.get('posts')

    return res
})

const usersAdapter = createEntityAdapter(
    // {
    // selectId:(user)=>user.id,
    // sortComparer:(a,b)=>a.name.localCompare(b.name)
// }
)

export const {
selectById:selectUserById,
selectAll:selectUserAll
}=usersAdapter.getSelectors(state=>state.users)

const initialState = usersAdapter.getInitialState({
    status: 'idle'
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    // initialState: {
    //     status: 'idle',
    //     entities: []
    // },
    reducers: {},
    extraReducers:

    {
        [fetchUsers.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchUsers.fulfilled]: (state, action) => {
            // state.entities = action.payload
            usersAdapter.upsertMany(state, action.payload)
            state.status = "idle"
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = "idle"
            console.log(action.payload);
        }

    }

})

export default userSlice.reducer