const fallbackImage = "/fallback-product.svg";

function SafeImage({ src, alt, className }) {
  function handleError(e) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallbackImage;
  }

  return (
    <img
      src={src || fallbackImage}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}

export default SafeImage;
