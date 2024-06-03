import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineShareAlt } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import "./productCard.css";
import productPlaceholderImg from "../../../assets/images/productPlaceholder.png";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useCart } from "../../../context/cart";
import Stars from "../../stars/Stars";
import { Modal } from "antd";
import { addToCart } from "../../../utils/cart";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductCard = ({ product, isTrending, listView, fullWidth }) => {
  // Context
  const [cart, setCart] = useCart();

  // state
  const [addToCartModalOpen, setAddToCartModalOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);

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
    <>
      <div
        style={{
          border: "1px solid var(--bs-gray-300)",
        }}
        className={`bgLight2 shadow rounded-4 ${isTrending && "trendingProductCard"} 
      ${fullWidth && "fullWidthWrapper"} productCard h-100`}
      >
        <div className={`${isTrending ? "row h-100" : ""}`}>
          <div
            className={`${isTrending ? "col-4" : "mb-20"} ${fullWidth && "fullWidthImg"} ${
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
                <span className="productIcon" title="Add to wishlist">
                  <AiOutlineHeart size={17} />
                </span>
                <span
                  style={{ top: "3rem" }}
                  className={`productIcon disabled ${
                    cart.filter((item) => item._id === product?._id).length > 0 &&
                    "bgTheme end-0"
                  }`}
                  title={`${
                    cart.find((item) => item._id === product?._id)
                      ? "Update quantity"
                      : "Add to cart"
                  }`}
                  onClick={() => {
                    const foundItem = cart.find((item) => item._id === product?._id);
                    if (foundItem) {
                      setCartQuantity(foundItem.cartQuantity);
                    }
                    setAddToCartModalOpen(true);
                  }}
                >
                  <AiOutlineShoppingCart size={16} />
                </span>
                <span style={{ top: "6rem" }} className="productIcon" title="Share">
                  <AiOutlineShareAlt size={17} />
                </span>
              </div>
            </div>
          </div>
          <div
            className={`p-4 ${isTrending ? "col-8" : "pt-0"} ${
              fullWidth && "fullWidthDesc flex-grow-1"
            } ${listView ? "ps-sm-5" : ""} productDetails`}
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
            <div className="mb-2">
              <Stars />
              <small className="ms-3 lightColor">
                ({String(product?.rating).padStart(2, "0")})
              </small>
            </div>
            <h4 className="fs-18 fw-normal mt-4">
              <span className="themeColor me-3">
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
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
              <>
                <p className="mt-2 lh-base">
                  {product?.description.length > 250
                    ? product?.description.substring(0, 250) + "..."
                    : product?.description}
                </p>
                <div className="btn-group">
                  <button className="btn btnDark fs-4 d-flex align-items-start gap-2 py-2">
                    <IoBagCheckOutline size={22} />
                    <span>Checkout</span>
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Modal
        title={<span className="fs-2">Add to cart</span>}
        centered
        open={addToCartModalOpen}
        okText={`${
          cart.find((item) => item._id === product?._id) ? "Update quantity" : "Add to cart"
        }`}
        onOk={() => {
          addToCart(product, cartQuantity, cart, setCart);
          setAddToCartModalOpen(false);
          setCartQuantity(1);
        }}
        onCancel={() => {
          setAddToCartModalOpen(false);
          setCartQuantity(1);
        }}
      >
        <div
          style={{ maxWidth: "25rem" }}
          className="d-flex mx-auto align-items-center text-nowrap border px-3 py-2 rounded-pill my-5"
        >
          <button
            onClick={() => setCartQuantity((prevQuantity) => prevQuantity - 1)}
            disabled={cartQuantity < 2}
            style={{ width: "3.5rem", height: "3.5rem" }}
            className="btn bgLight2 rounded-circle flex-shrink-0 d-flex justify-content-center align-items-center hoverable"
          >
            <FaMinus />
          </button>
          <input
            type="number"
            min={0}
            max={100}
            className="form-control text-center border-0 shadow-none fs-2"
            value={cartQuantity}
            onChange={(e) => setCartQuantity(parseInt(e.target.value))}
            readOnly
          />
          <button
            onClick={() => setCartQuantity((prevQuantity) => prevQuantity + 1)}
            disabled={cartQuantity > 99}
            style={{ width: "3.5rem", height: "3.5rem" }}
            className="btn bgLight2 rounded-circle flex-shrink-0 d-flex justify-content-center align-items-center hoverable"
          >
            <FaPlus />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
