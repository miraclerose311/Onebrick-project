import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    brick: {
        id: "",
        amount: 1,
        location: "",
        donor_info: {
            name: "",
            mobile: "",
            email: "",
            pan: "",
            aadhaar: "",
            address: "",
        },
        donor_address: {
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
        increaseAmount: state => {
            state.brick.amount += 1
        },
        decreaseAmount: state => {
            state.brick.amount -= 1
        },
        changeLocation: (state, action) => {
            state.brick.location = action.payload
        },
        add_donor_info: (state, action) => {
            state.brick.donor_info = action.payload
        },
        add_donor_address: (state, action) => {
            state.brick.donor_address = action.payload
        },
        add_dedication: (state, action) => {
            state.brick.dedication = action.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const { increaseAmount, decreaseAmount, changeLocation, add_donor_info, add_donor_address, add_dedication, } = brickSlice.actions;

export default brickSlice.reducer;
