import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AiFillStar, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import "./productCard.css";

import productPlaceholderImg from "../../../assets/images/productPlaceholder.png";

import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCart } from "../../../context/cart";

const ProductCard = ({ product, isTrending, listView }) => {
  // Context
  const [cart, setCart] = useCart();

  const handleBeforeLoadImg = () => {
    return productPlaceholderImg;
  };
  const handleImgError = (event) => {
    // code to handle image load errors
    const { target } = event;
    target.onerror = null;
    target.src = productPlaceholderImg; // set the default image URL if the product image fails to load
    return;
  };

  return (
    <div className={`${isTrending ? "trendingProductCard" : ""} productCard h-100`}>
      <div className={`${isTrending ? "row h-100" : ""}`}>
        <div
          className={`${isTrending ? "col-4" : "mb-20"} ${
            listView ? "pe-sm-4" : ""
          } productImg overflow-hidden`}
        >
          <div className="overflow-hidden position-relative h-100">
            <Link to={`/product/${product?.slug}`}>
              <LazyLoadImage
                src={`${process.env.REACT_APP_API}/product/photo/${product?._id}`}
                onError={handleImgError}
                alt={product?.name}
                effect="blur"
                beforeLoad={handleBeforeLoadImg}
              />
            </Link>
            <div className="position-absolute top-0 end-0 mt-3 me-3">
              <span className="productIcon mb-2" title="Add to wishlist">
                <AiOutlineHeart size={17} />
              </span>
              <span
                className={`productIcon disabled ${
                  cart.filter((item) => item._id === product?._id).length > 0 &&
                  "bgTheme end-0"
                }`}
                title={`${
                  cart.find((item) => item._id === product?._id)
                    ? "Remove from cart"
                    : "Add to cart"
                }`}
                onClick={() => {
                  const exists = cart.find((item) => item._id === product?._id);
                  if (!exists) {
                    setCart([...cart, product]);
                    localStorage.setItem("cart", JSON.stringify([...cart, product]));
                    toast.success("Added to cart");
                  } else {
                    const updatedCart = cart.filter((item) => item?._id !== product?._id);
                    setCart(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    toast.error("Removed from cart.");
                  }
                }}
              >
                <AiOutlineShoppingCart size={16} />
              </span>
            </div>
          </div>
        </div>
        <div
          className={`${isTrending ? "col-8" : ""} ${
            listView ? "ps-sm-5" : ""
          } productDetails`}
        >
          <h4
            className={`${isTrending ? "fs-16" : "fs-18"} ${
              listView ? "fs-18" : ""
            } fw-normal text-capitalize themeColorDark mb-3`}
          >
            <Link className="hoverLine hoverSecondary" to={`/product/${product?.slug}`}>
              {product?.name}
            </Link>
          </h4>
          <div className="mb-4">
            <AiFillStar style={{ color: "#FDCC0D" }} />
            <AiFillStar style={{ color: "#FDCC0D" }} />
            <AiFillStar style={{ color: "#FDCC0D" }} />
            <AiFillStar style={{ color: "#FDCC0D" }} />
            <AiFillStar style={{ color: "#FDCC0D" }} />
            <small className="ms-3 lightColor">
              ({String(product?.rating).padStart(2, "0")})
            </small>
          </div>
          <h4 className="fs-18 fw-normal mb-3">
            <span className="themeColor me-3">
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "BDT",
              })}
            </span>
            <span className="lightColor fs-13 text-decoration-line-through d-none">
              $72.50
            </span>
          </h4>
          <p className="fs-14 lightColor mb-0">{`${String(product?.sold).padStart(
            2,
            0
          )} sold`}</p>
          <p className="fs-14 lightColor mb-0 text-capitalize">
            {product?.shipping === true ? "Free shipping" : ""}
          </p>
          <p className="fs-14 themeColor mb-0">
            {`${
              product?.quantity <= 10
                ? product?.quantity >= 1
                  ? `Stock ${String(product?.quantity - product?.sold).padStart(2, 0)} left`
                  : "Out of stock"
                : ""
            }`}
          </p>
          {listView ? (
            <p className="mt-4 lh-base">
              {product?.description.length > 250
                ? product?.description.substring(0, 250) + "..."
                : product?.description}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
