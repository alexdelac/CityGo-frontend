import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: {pseudonyme: null, token: null},
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
    }
})


export const { addUser, login }= userSlice.actions;
export default userSlice.reducer;