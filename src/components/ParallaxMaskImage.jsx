import { useEffect, useRef } from "react";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function ParallaxMaskImage({ src, alt }) {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const updateParallax = () => {
      const wrapper = wrapperRef.current;
      const image = imageRef.current;

      if (!wrapper || !image) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = (viewportCenter - elementCenter) / window.innerHeight;
      const offset = clamp(distance * 70, -36, 36);

      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
    };

    const handleScroll = () => {
      window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="shape-mask-1 react-jarallax">
      <img ref={imageRef} src={src} className="react-jarallax-img" alt={alt} />
    </div>
  );
}

export default ParallaxMaskImage;
