import React, { useState } from 'react';
// import { bricks } from '../utils';
import { getBricks, initialBricks } from '../actions/brick';
import { useDispatch, useSelector } from 'react-redux';

function Test() {
    const dispatch = useDispatch();
    const bricks = useSelector(state => state.brick.bricks);
    console.log("bricks", bricks);
    const handleClick = () => {
        console.log("button clicked")
        dispatch(initialBricks());
    }
    return (
        <div className='flex flex-wrap'>
            {/* {
                brickIds.map((brickId) => {
                    return <div className='w-20 h-5 border border' key={brickId}>{brickId}</div>
                })
            } */}
            <button className='border border-black p-5 mx-auto my-32' onClick={handleClick}>Initial Bricks</button>
        </div>
    );
}

export default Test;