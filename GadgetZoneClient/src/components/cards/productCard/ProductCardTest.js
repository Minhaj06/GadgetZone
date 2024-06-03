import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import LazyLoad from "react-lazyload";
import productPlaceholderImg from "../../../assets/images/productPlaceholder.avif";

const ProductCard = ({ product, isTrending }) => {
  return (
    <div className="trendingProductCard productCard h-100">
      <div className={`${isTrending ? "row h-100" : ""}`}>
        <div className={`${isTrending ? "col-4" : "mb-20"} trendingProductImg productImg`}>
          <Link to={`/product/${product?.slug}`}>
            <LazyLoad
              height={200}
              once
              fadein={true}
              placeholder={
                <img
                  src={productPlaceholderImg}
                  style={{ objectFit: "cover", minHeight: isTrending ? "12rem" : "" }}
                />
              }
            >
              <img
                className="w-100 h-100"
                style={{ objectFit: "cover", minHeight: isTrending ? "12rem" : "" }}
                src={`${process.env.REACT_APP_API}/product/photo/${product?._id}`}
                alt={product?.name}
              />
            </LazyLoad>
          </Link>
        </div>
        <div className={`${isTrending ? "col-8" : ""} trendingProductDetails productDetails`}>
          <h4 className="fs-16 fw-normal text-capitalize themeColorDark mb-3">
            <Link className="hoverLine hoverSecondary" to={`/product/${445}`}>
              {product?.name}
            </Link>
          </h4>
          <div className="mb-4">
            {/* {(() => {
                                const startRating = [];
                                for (let i = 0; i < product?.rating; i++) {
                                  startRating.push(
                                    <AiFillStar key={i} style={{ color: "#FF9529" }} />
                                  );
                                }
                                return startRating;
                              })()} */}
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
            {/* Stock: 14 left */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

<ProductCard product={product} isTrending={true} />;
{
  /* <div className="trendingProductCard productCard h-100">
                        <div className="row h-100">
                          <div className="col-4 trendingProductImg productImg">
                            <Link to={`/product/${product?.slug}`}>
                              <img
                                className="w-100 h-100"
                                style={{ objectFit: "cover", minHeight: "12rem" }}
                                src={`${process.env.REACT_APP_API}/product/photo/${product?._id}`}
                                alt={product?.name}
                              />
                            </Link>
                          </div>
                          <div className="col-8 trendingProductDetails productDetails">
                            <h4 className="fs-16 fw-normal text-capitalize themeColorDark mb-3">
                              <Link
                                className="hoverLine hoverSecondary"
                                to={`/product/${445}`}
                              >
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
                            <p className="fs-14 lightColor mb-0">{`${String(
                              product?.sold
                            ).padStart(2, 0)} sold`}</p>
                            <p className="fs-14 lightColor mb-0 text-capitalize">
                              {product?.shipping === true ? "Free shipping" : ""}
                            </p>
                            <p className="fs-14 themeColor mb-0">
                              {`${
                                product?.quantity <= 10
                                  ? product?.quantity >= 1
                                    ? `Stock ${String(
                                        product?.quantity - product?.sold
                                      ).padStart(2, 0)} left`
                                    : "Out of stock"
                                  : ""
                              }`}
                            </p>
                          </div>
                        </div>
                      </div> */
}

JSON.parse(localStorage.getItem("cart")).filter((item) => item._id === product?._id).length >
  0 && "bgTheme end-0";
