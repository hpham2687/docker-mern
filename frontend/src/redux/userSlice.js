import { createSlice } from "@reduxjs/toolkit";

const userSlice =  createSlice({
    name: "user",
    initialState: {
        addPatient: {
            patients: [],
        },
        getImage: {
            images: [],
        }
    },
    reducers: {
        addPatientSuccess: (state, action) => {
            state.addPatient.patients = action.payload;
        },
        getImageSuccess: (state, action) => {
            state.getImage.images = action.payload;
        },
    }
});

export const {
    addPatientSuccess,
    getImageSuccess
} = userSlice.actions;

export default userSlice.reducer;