import React, { useState } from 'react';
// import { bricks } from '../utils';
import { getBricks, initialBricks } from '../actions/brick';
import { logout } from '../features/auth/authSlice';
import { googleLogin } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Test() {
    const dispatch = useDispatch();
    // const {currentUser} = useSelector(state => state.auth);
    const user = localStorage.getItem('user')
    const navigate = useNavigate()
    
    return (
        <div className='flex flex-wrap'>
            {/* {
                brickIds.map((brickId) => {
                    return <div className='w-20 h-5 border border' key={brickId}>{brickId}</div>
                })
            } */}
            <button className='bg-yellow-300 p-5 mx-auto my-32' onClick={e => navigate('/login')}>login</button>
            <button className='bg-yellow-300 p-5 mx-auto my-32' onClick={e => dispatch(logout())}>logout</button>
        </div>
    );
}

export default Test;