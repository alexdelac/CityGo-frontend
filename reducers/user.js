import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: { pseudonyme: null, token: null },
    like: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.value.pseudonyme = action.payload.pseudonyme;
            state.value.token = action.payload.token
        },
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.pseudonyme = action.payload.pseudonyme;
        },
        logout: (state, action) => {
            
            state.value.token = null;
            state.value.pseudonyme = null;
        },
        changeLike: (state, action)=>{
            state.like = !state.like
        }

    }
})


export const { addUser, login, logout, changeLike } = userSlice.actions;
export default userSlice.reducer;