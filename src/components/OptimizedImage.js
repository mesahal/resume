import { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  placeholder = 'blur',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Generate optimized image paths
  const getOptimizedSrc = (originalSrc) => {
    if (!originalSrc) return '';
    
    // Check if it's already an optimized path
    if (originalSrc.includes('/optimized/')) {
      return originalSrc;
    }
    
    // Convert to optimized path
    const pathParts = originalSrc.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const optimizedPath = originalSrc.replace(fileName, `optimized/${fileName}`);
    return optimizedPath;
  };

  const getWebPSrc = (originalSrc) => {
    if (!originalSrc) return '';
    
    const webpPath = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return getOptimizedSrc(webpPath);
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const optimizedSrc = getOptimizedSrc(src);
  const webpSrc = getWebPSrc(src);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{ width, height }}
        {...props}
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      {...props}
    >
      {/* Placeholder/Blur effect */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {/* WebP Image (preferred) */}
      {isInView && webpSrc && (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={optimizedSrc}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </picture>
      )}
      
      {/* Fallback for when WebP is not supported */}
      {isInView && !webpSrc && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
};

export default OptimizedImage;
