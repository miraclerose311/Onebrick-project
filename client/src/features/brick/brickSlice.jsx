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
    bricks: [],
    soldAmount: 0,
    loading: true,
    clicked: ""
};

export const brickSlice = createSlice({
    name: 'brick',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setBricks: (state, action) => {
            // state.bricks = initialState.bricks;
            [...action.payload].forEach((item, index) => {
                state.bricks.push({
                    index,
                    id: item.brick_id,
                    sold: item.sold,
                    owner: false,
                    clicked: false,
                })
            });
            state.loading = false
        },
        soldBrick: (state, action) => {
            const todo = state.bricks[action.payload.index]
            todo.sold = 1
        },
        setSoldAmount: (state, action) => {
            state.soldAmount = action.payload
        },
        changeClicked: (state, action) => {
            if (state.clicked === action.payload) {
                const todo = state.bricks[action.payload]
                todo.clicked = !todo.clicked
                state.clicked = action.payload
            } else {
                if (state.clicked && state.bricks[state.clicked].clicked == 1) {
                    const prevSelected = state.bricks[state.clicked]
                    prevSelected.clicked = !prevSelected.clicked
                }
                state.clicked = action.payload;
                const todo = state.bricks[action.payload]
                todo.clicked = !todo.clicked
            }
        },
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
        },
        clear_brick: (state) => {
            state.brick = initialState.brick
        }
    },
});

// Action creators are generated for each case reducer function
export const { setBricks, setLoading, soldBrick, setSoldAmount, changeClicked, increaseAmount, decreaseAmount, changeLocation, add_donor_info, add_donor_address, add_dedication, clear_brick } = brickSlice.actions;

export default brickSlice.reducer;

