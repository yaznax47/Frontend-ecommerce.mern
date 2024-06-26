import { createSlice } from "@reduxjs/toolkit";

const UserSlicer = createSlice({
    name: "User",
    initialState: {
        loggedInUser: null,
        testMsg: null
    },
    reducers: {
        helloTest: (state, action) =>{
            state.testMsg = action.payload
        },
        setLoggedInUser: (state, action) => {
            // console.log(action.payload)
            state.loggedInUser= action.payload
        }
    }
})

export const {helloTest, setLoggedInUser} = UserSlicer.actions
export default UserSlicer.reducer;