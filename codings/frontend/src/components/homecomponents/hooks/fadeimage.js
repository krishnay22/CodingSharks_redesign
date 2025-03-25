import { useState, useEffect } from "react";

const useFadeInImage = (src) => {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    setImageSrc(src);
  }, [src]);

  return {
    style: {
      opacity: loaded ? 1 : 0,
      transition: "opacity 1s ease-in-out",
    },
    src: imageSrc,
  };
};

export default useFadeInImage;
