function LoadingSkeleton() {
  return (
    <div className="product-card product-skeleton" aria-hidden="true">
      <div className="product-card-media product-skeleton-block" />
      <div className="product-card-body">
        <div className="product-skeleton-line product-skeleton-short" />
        <div className="product-skeleton-line product-skeleton-title" />
        <div className="product-skeleton-line product-skeleton-short" />
        <div className="product-skeleton-line" />
        <div className="product-skeleton-line" />
      </div>
      <div className="product-card-footer">
        <div className="product-skeleton-line product-skeleton-price" />
        <div className="product-skeleton-buy product-skeleton-block" />
      </div>
    </div>
  );
}

export default LoadingSkeleton;
