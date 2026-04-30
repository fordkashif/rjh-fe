import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

function RoomPhotoLightbox({
  images,
  activeIndex,
  isOpen,
  onClose,
  onSelect,
  title,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        onSelect((activeIndex + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        onSelect((activeIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length, isOpen, onClose, onSelect]);

  if (!isOpen || images.length === 0) {
    return null;
  }

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="react-room-lightbox" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="react-room-lightbox-backdrop"
        aria-label="Close gallery"
        onClick={onClose}
      />

      <div className="react-room-lightbox-panel">
        <div className="react-room-lightbox-header">
          <div>
            <span className="react-room-lightbox-kicker">Room Gallery</span>
            <strong>{title}</strong>
          </div>
          <button
            type="button"
            className="react-room-lightbox-close"
            aria-label="Close gallery"
            onClick={onClose}
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        <div className="react-room-lightbox-stage">
          {images.length > 1 ? (
            <button
              type="button"
              className="react-room-lightbox-nav is-prev"
              aria-label="Previous photo"
              onClick={() => onSelect((activeIndex - 1 + images.length) % images.length)}
            >
              <ChevronLeft size={22} strokeWidth={2.3} />
            </button>
          ) : null}

          <img
            src={activeImage.image}
            alt={activeImage.alt ?? `${title} photo ${activeIndex + 1}`}
            className="react-room-lightbox-image"
          />

          {images.length > 1 ? (
            <button
              type="button"
              className="react-room-lightbox-nav is-next"
              aria-label="Next photo"
              onClick={() => onSelect((activeIndex + 1) % images.length)}
            >
              <ChevronRight size={22} strokeWidth={2.3} />
            </button>
          ) : null}
        </div>

        <div className="react-room-lightbox-footer">
          <span className="react-room-lightbox-count">
            {activeIndex + 1} / {images.length}
          </span>

          {images.length > 1 ? (
            <div className="react-room-lightbox-thumbs">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image.image}-${index}`}
                  className={
                    index === activeIndex
                      ? "react-room-lightbox-thumb is-active"
                      : "react-room-lightbox-thumb"
                  }
                  aria-label={`View photo ${index + 1}`}
                  onClick={() => onSelect(index)}
                >
                  <img src={image.image} alt={image.alt ?? `${title} thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default RoomPhotoLightbox;
