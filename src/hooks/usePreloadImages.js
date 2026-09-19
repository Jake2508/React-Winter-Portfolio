import { useEffect } from 'react';

/*
  Warms the browser cache for images the panel shows the moment it opens.

  Without this nothing is requested until the panel mounts and the relevant tab
  renders, so every image visibly pops in — even the 889-byte PDF icon, because
  the cost is the round trip rather than the bytes. Called during the loading
  screen, which gives these several seconds to land before the panel can open.
*/
const usePreloadImages = (sources) => {
    useEffect(() => {
        // Held in an array so the requests are not garbage collected mid-flight
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
