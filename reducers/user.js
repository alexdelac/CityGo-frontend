import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: {pseudonyme: null, token: null},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.value.pseudo = action.payload.pseudo;
            state.value.token = action.payload.token
        }
    }
})


export const { addUser }= userSlice.actions;
export default userSlice.reducer;