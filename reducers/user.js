import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: { pseudonyme: null, token: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.pseudonyme = action.payload.pseudonyme;
        },
        logout: (state, action) => {
            
            state.value.token = null;
            state.value.pseudonyme = null;
        },
        updatePseudo: (state, action) => {
            state.value.pseudonyme = action.payload
        }

    }
})


export const { login, logout, updatePseudo } = userSlice.actions;
export default userSlice.reducer;