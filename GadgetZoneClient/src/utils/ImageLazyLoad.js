import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import productPlaceholderImg from "../../src/assets/images/productPlaceholder.png";

const handleBeforeLoadImg = () => {
  return productPlaceholderImg;
};
const handleImgError = (event) => {
  const { target } = event;
  target.onerror = null;
  target.src = productPlaceholderImg;
  return;
};

const ImageLazyLoad = ({ src, alt, className, style }) => {
  return (
    <LazyLoadImage
      style={style}
      className={className}
      src={src}
      onError={handleImgError}
      alt={alt}
      effect="blur"
      beforeLoad={handleBeforeLoadImg}
    />
  );
};

export default ImageLazyLoad;
