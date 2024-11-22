import { useEffect } from 'react';


function usePreventZoom(scrollCheck = true, keyboardCheck = true) {
    useEffect(() => {
        const handleKeydown = (e) => {
            if (
                keyboardCheck &&
                e.ctrlKey &&
                (e.keyCode === 61 ||  // '=' Key
                    e.keyCode === 107 || // '+' Key
                    e.keyCode === 173 || // '-' Key (minus on numpad)
                    e.keyCode === 109 || // '-' Key (normal)
                    e.keyCode === 187 || // '=' Key (on keyboard)
                    e.keyCode === 189)   // '-' Key (normal)
            ) {
                e.preventDefault();
            }
        };

        const handleWheel = (e) => {
            if (scrollCheck && e.ctrlKey) {
                e.preventDefault();
            }
        };

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("wheel", handleWheel);
        };
    }, [scrollCheck, keyboardCheck]);
}


export default usePreventZoom;  