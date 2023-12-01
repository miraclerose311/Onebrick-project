import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    brick: {
        id: "",
        amount: 1,
        location: "",
        donor: {
            name: "",
            mobile: "",
            email: "",
            PAN: "",
            aadhaar_id: "",
            address: "",
            country: "",
            state: "",
            PIN: ""
        },
        dedication: {
            name: "",
            relationship: "",
            message: "",
            image: ""
        }
    },
    bricks: []
};

export const brickSlice = createSlice({
    name: 'brick',
    initialState,
    reducers: {
        add_donor_info: (state, action) => {
            state.brick.donor = action.payload
        },
        increaseAmount: (state, action) => {
            state.brick.amount += 1
        },
        decreaseAmount: (state, action) => {
            state.brick.amount -= 1
        },
        changeLocation: (state, action) => {
            state.brick.location = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { add_donor_info, increaseAmount, decreaseAmount, changeLocation } = brickSlice.actions;

export default brickSlice.reducer;
