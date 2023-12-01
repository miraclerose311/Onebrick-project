import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function Example() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
        if (count / 2) {
            notify();
        }
    };

    const notify = () => {
        toast("Default Notification !");

        toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER
        });

        toast.error("Error Notification !", {
            position: toast.POSITION.TOP_LEFT
        });

        toast.warn("Warning Notification !", {
            position: toast.POSITION.BOTTOM_LEFT
        });

        toast.info("Info Notification !", {
            position: toast.POSITION.BOTTOM_CENTER
        });

        toast("Custom Style Notification with css class!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar'
        });
    };

    return (
        <>
            <button className='border p-4 mx-10' onClick={e => increment()}>{count}</button>
            <ToastContainer />
        </>
    );
}

export default Example;