import { useEffect } from 'react';

/*
  Warms the cache for images the panel shows on open. Without it nothing is
  requested until the relevant tab renders, so everything pops in — the cost is
  the round trip, not the bytes. Run during the loading screen.
*/
const usePreloadImages = (sources) => {
    useEffect(() => {
        // Held so the requests are not garbage collected mid-flight
        const images = sources.map((src) => {
            const image = new Image();
            image.decoding = 'async';
            image.src = src;
            return image;
        });

        return () => { images.length = 0; };
    }, [sources]);
};


export default usePreloadImages;
