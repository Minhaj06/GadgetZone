import React, { useEffect, useState } from "react";
import { ShoppingCartOutlined, CloseOutlined } from "@ant-design/icons";
import UserBreadcrumb from "../components/breadcrumb/UserBreadcrumb";
import { useCart } from "../context/cart";
import ImageLazyLoad from "../utils/ImageLazyLoad";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const QtyUpdate = ({ product }) => {
  const [cart, setCart] = useCart();

  // state
  const [cartQuantity, setCartQuantity] = useState(product?.cartQuantity || 1);

  const handleDecrease = () => {
    const newQuantity = cartQuantity - 1;
    setCartQuantity(newQuantity);
    addToCart(product, newQuantity, cart, setCart);
  };

  const handleIncrease = () => {
    const newQuantity = cartQuantity + 1;
    setCartQuantity(newQuantity);
    addToCart(product, newQuantity, cart, setCart);
  };

  return (
    <div
      style={{ maxWidth: "15rem" }}
      className="d-flex align-items-center text-nowrap border px-3 py-2 rounded-pill my-5"
    >
      <button
        onClick={handleDecrease}
        disabled={cartQuantity < 2}
        style={{ width: "3rem", height: "3rem" }}
        className="btn bgLight2 rounded-circle flex-shrink-0 d-flex justify-content-center align-items-center hoverable"
      >
        <FaMinus size={13} />
      </button>
      <input
        type="number"
        min={0}
        max={100}
        className="form-control text-center border-0 px-3 py-2-none fs-3 p-0"
        value={cartQuantity}
        onChange={(e) => setCartQuantity(parseInt(e.target.value))}
        readOnly
      />
      <button
        onClick={handleIncrease}
        disabled={cartQuantity > 99}
        style={{ width: "3rem", height: "3rem" }}
        className="btn bgLight2 rounded-circle flex-shrink-0 d-flex justify-content-center align-items-center hoverable"
      >
        <FaPlus size={13} />
      </button>
    </div>
  );
};

const CouponBilling = () => {
  const { auth, setIsLoading } = useAuth();

  // Context
  const [cart, setCart] = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  const billingAddress = location.state?.billingAddress;

  // state
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(10);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddressCheck, setShippingAddressCheck] = useState(false);

  useEffect(() => {
    const totalAmount = parseFloat(
      cart.reduce((total, product) => total + product?.price * product?.cartQuantity, 0)
    );
    setTotalPrice(totalAmount);
  }, [cart]);

  useEffect(() => {
    if (billingAddress) {
      setDivision(billingAddress?.division);
      setDistrict(billingAddress?.district);
      setPostalCode(billingAddress?.postalCode);
    }
  }, [location, billingAddress]);

  // useEffect(() => {
  //   if (division.toLowerCase() !== "dhaka") {
  //     setShippingCharge(15);
  //   } else {
  //     setShippingCharge(10);
  //   }
  // }, [division]);

  const districtsByDivision = {
    Dhaka: [
      "Dhaka",
      "Gazipur",
      "Tangail",
      "Madaripur",
      "Munshiganj",
      "Rajbari",
      "Shariatpur",
      "Narayanganj",
      "Narsingdi",
      "Manikganj",
      "Faridpur",
      "Gopalganj",
      "Kishoreganj",
    ],
    Chittagong: [
      "Chittagong",
      "Cox's Bazar",
      "Comilla",
      "Feni",
      "Brahmanbaria",
      "Chandpur",
      "Lakshmipur",
      "Noakhali",
      "Rangamati",
      "Khagrachari",
      "Bandarban",
    ],
    Khulna: [
      "Khulna",
      "Jessore",
      "Satkhira",
      "Bagerhat",
      "Chuadanga",
      "Jhenaidah",
      "Kushtia",
      "Magura",
      "Meherpur",
      "Narail",
    ],
    Rajshahi: [
      "Rajshahi",
      "Bogra",
      "Pabna",
      "Jaipurhat",
      "Naogaon",
      "Natore",
      "Chapainawabganj",
    ],
    Barishal: ["Barishal", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur"],
    Sylhet: ["Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"],
    Rangpur: [
      "Rangpur",
      "Lalmonirhat",
      "Kurigram",
      "Nilphamari",
      "Gaibandha",
      "Dinajpur",
      "Thakurgaon",
      "Panchagarh",
    ],
    Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };

  const handleDivisionChange = (event) => {
    const divisionValue = event.target.value;
    setDivision(divisionValue);

    // Reset  district when division changes
    setDistrict("");
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();

    const couponCode = e.target.couponInput.value;
    if (!couponCode) {
      toast.error("Coupon cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.get(`/coupons/${couponCode}`);
      setCouponDiscountPercentage(data.discountPercentage);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="bgLight2 pb-50">
        {/* Coupon Input */}
        <form onSubmit={handleCouponSubmit}>
          <div className="input-group mb-50">
            <input
              type="text"
              name="couponInput"
              className="form-control border border-dark border-2 rounded-0 px-20"
              placeholder="Enter coupon"
            />
            <button
              type="submit"
              className="btn btn-dark text-white input-group-text rounded-0 px-25 py-4"
            >
              Apply
            </button>
          </div>
        </form>

        <div className="px-4 px-xl-5">
          {/* Select Division */}
          <div className="mb-5">
            <label className="form-label fontPoppins fw-medium">DIVISION</label>
            <select
              className="form-select shadow px-3 py-2"
              aria-label="Select Division"
              value={division}
              onChange={handleDivisionChange}
            >
              <option value="" disabled>
                Select Division
              </option>

              {Object.keys(districtsByDivision).map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          {/* Select District */}
          <div className="mb-5">
            <label className="form-label fontPoppins fw-medium ">DISTRICT</label>
            <select
              className="form-select shadow px-3 py-2"
              aria-label="Select District"
              value={district}
              onChange={handleDistrictChange}
              disabled={!division}
            >
              <option value="" disabled>
                Select District
              </option>
              {division &&
                districtsByDivision[division].map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          </div>

          {/* Postal Code Input */}
          <div>
            <label className="form-label fontPoppins fw-medium">ZIP/POSTAL CODE</label>
            <input
              onBlur={(e) => setPostalCode(e.target.value)}
              type="text"
              className="form-control shadow px-3 py-2"
              defaultValue={postalCode}
            />
          </div>
        </div>
      </div>
      <div className="bgLight3 pt-50 pb-5 px-20">
        <div className="d-flex justify-content-between align-items-center text-nowrap mb-3">
          <span className="fs-3 fw-medium">Subtotal</span>
          <span className="fs-3">
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center text-nowrap mb-3">
          <span className="fs-3 fw-medium">Discount</span>
          <span className="fs-3">
            {((totalPrice / 100) * couponDiscountPercentage * -1).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center text-nowrap mb-5">
          <span className="fs-3 fw-medium">Shipping</span>
          <span className="fs-3">${shippingCharge}</span>
        </div>
        <div className="d-flex justify-content-between align-items-baseline text-nowrap">
          <span className="fs-3 fw-medium">TOTAL</span>
          <span className="fs-1 fw-bold">
            {(
              totalPrice +
              shippingCharge -
              (totalPrice / 100) * couponDiscountPercentage
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
        </div>

        {/* Checkout Button */}
        {auth?.user ? (
          <div className="mt-50">
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="shippingAddressCheck"
                onChange={() => setShippingAddressCheck(!shippingAddressCheck)}
              />
              <label className="form-check-label" htmlFor="shippingAddressCheck">
                Add Shipping Address
              </label>
            </div>
            {shippingAddressCheck ? (
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      billingAddress: { division, district, postalCode },
                      discountPercentage: couponDiscountPercentage,
                      shippingCharge: shippingCharge,
                    },
                  })
                }
                className="btn btnDark w-100 py-12 rounded-pill"
                disabled={!division || !district || !postalCode || !cart.length ? true : false}
              >
                Checkout
              </button>
            ) : auth?.user?.address ? (
              <button
                onClick={() =>
                  navigate("/checkout/payment", {
                    state: {
                      billingAddress: { division, district, postalCode },
                      discountPercentage: couponDiscountPercentage,
                      shippingCharge: shippingCharge,
                    },
                  })
                }
                className="btn btnDark w-100 py-12 rounded-pill"
                disabled={!cart.length}
              >
                Checkout
              </button>
            ) : (
              <button
                onClick={() =>
                  navigate("/dashboard/user/profile", {
                    state: "/cart",
                  })
                }
                className="btn btnDark w-100 py-12 rounded-pill"
                disabled={!cart.length}
              >
                Update Address
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={() =>
              navigate("/login", {
                state: "/cart",
              })
            }
            className="btn btnDark w-100 py-12 rounded-pill mt-50"
          >
            Login to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

const Cart = () => {
  const [cart, setCart] = useCart();

  return (
    <section style={{ marginTop: "5rem", marginBottom: "7rem" }}>
      <div className="container">
        <div className="mb-5">
          <UserBreadcrumb
            items={[
              {
                title: (
                  <>
                    <ShoppingCartOutlined />
                    <span>Cart</span>
                  </>
                ),
              },
            ]}
          />
          <h1 className="display-4 fontPoppins fw-bold mt-2">Shopping Cart</h1>
        </div>

        <div className="row g-5">
          <div className="col-lg-8 sticky-lg-top" style={{ height: "fit-content" }}>
            <div className="table-responsive">
              <table className="table align-middle fs-14" style={{ minWidth: "70rem" }}>
                <thead className="bgLight2">
                  <tr>
                    <th className="py-20 ps-20">Item</th>
                    <th className="py-20">Price</th>
                    <th className="py-20">Quantity</th>
                    <th className="py-20">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length > 0 ? (
                    cart.map((product) => (
                      <tr key={product?._id}>
                        <td className="py-4">
                          <div className="d-flex align-items-center gap-4">
                            <div>
                              <ImageLazyLoad
                                style={{ width: "8rem", height: "8rem" }}
                                className="img-thumbnail"
                                src={`${process.env.REACT_APP_API}/product/photo/${product?._id}`}
                                alt={product?.name}
                              />
                            </div>

                            <div>
                              <a className="d-block mb-3" href="#">
                                <h4 className="fs-14">THE TERRY SHORTS (UNISEX)</h4>
                              </a>

                              <div>
                                <span className="fs-13 fst-italic">Navy / XS</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="fw-semibold">
                            {product?.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </span>
                        </td>
                        <td className="py-4">
                          <QtyUpdate product={product} />
                        </td>
                        <td className="py-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-semibold pe-4">
                              {(product?.price * product?.cartQuantity).toLocaleString(
                                "en-US",
                                {
                                  style: "currency",
                                  currency: "USD",
                                }
                              )}
                            </span>
                            <IoClose
                              onClick={() => removeFromCart(product._id, cart, setCart)}
                              role="button"
                              className="hoverableOp"
                              size={24}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center fs-1">
                      <td className="fs-1 py-5" colSpan={4}>
                        No product in cart. 😔
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-4 sticky-lg-top" style={{ height: "fit-content" }}>
            <CouponBilling />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
