import { useState } from 'react';

const useFadeTransition = (initialState = true, transitionDuration = 300) => {
    const [fade, setFade] = useState(initialState);

    const applyTransition = (callback) => {
        setFade(false); // Trigger fade-out
        setTimeout(() => {
            callback(); // Perform the action
            setFade(true); // Trigger fade-in
        }, transitionDuration); // Match the CSS transition duration
    };

    return { fade, applyTransition };
};

export default useFadeTransition;
