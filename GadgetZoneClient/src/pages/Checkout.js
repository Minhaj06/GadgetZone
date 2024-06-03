import React, { useEffect, useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import UserBreadcrumb from "../components/breadcrumb/UserBreadcrumb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { ShoppingCartOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import ImageLazyLoad from "../utils/ImageLazyLoad";

const Checkout = () => {
  const { auth } = useAuth();

  const [cart] = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  const billingAddress = location?.state?.billingAddress;
  const discountPercentage = location?.state?.discountPercentage;
  const shippingCharge = location?.state?.shippingCharge;

  // State
  const [shippingAddress, setShippingAddress] = useState({
    email: "",
    firstName: "",
    lastName: "",
    division: "",
    district: "",
    postalCode: "",
    streetAddress: "",
    phoneNumber: "443",
  });

  useEffect(() => {
    if (billingAddress) {
      setShippingAddress({
        // email: auth?.user?.email,
        // firstName: auth?.user?.firstName,
        // lastName: auth?.user?.lastName,
        // address: auth?.user?.address,
        // phoneNumber: auth?.user?.phoneNumber,
        division: billingAddress?.division,
        district: billingAddress?.district,
        postalCode: billingAddress?.postalCode,
      });
    } else {
      navigate("/cart");
    }
  }, [location, auth?.user]);

  const inputFields = [
    { label: "Email", name: "email", type: "email" },
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Division", name: "division", readOnly: true, disabled: true },
    { label: "District", name: "district", readOnly: true, disabled: true },
    {
      label: "Zip/Postal Code",
      name: "postalCode",
      readOnly: true,
      disabled: true,
      type: "text",
    },
    { label: "Street Address", name: "streetAddress" },
    { label: "Phone Number", name: "phoneNumber", type: "tel" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const numericValue = value.replace(/\D/g, "");
      setShippingAddress((prevAddress) => ({
        ...prevAddress,
        [name]: numericValue,
      }));
    } else {
      setShippingAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      firstName,
      lastName,
      division,
      district,
      postalCode,
      streetAddress,
      phoneNumber,
    } = shippingAddress;

    if (!email) {
      toast.error("Email cannot be empty!");
      return;
    }

    if (!firstName) {
      toast.error("First Name cannot be empty!");
      return;
    }
    if (!lastName) {
      toast.error("Last Name cannot be empty!");
      return;
    }
    if (!division) {
      toast.error("Division cannot be empty!");
      return;
    }
    if (!district) {
      toast.error("District cannot be empty!");
      return;
    }
    if (!postalCode) {
      toast.error("Postal Code cannot be empty!");
      return;
    }
    if (!streetAddress) {
      toast.error("Street address cannot be empty!");
      return;
    }
    if (!phoneNumber) {
      toast.error("Phone Number cannot be empty!");
      return;
    }

    navigate("/checkout/payment", {
      state: {
        shippingAddress: shippingAddress,
        discountPercentage: discountPercentage,
        shippingCharge: shippingCharge,
      },
    });
  };

  return (
    <section style={{ marginTop: "5rem", marginBottom: "7rem" }}>
      <div className="container">
        <div className="mb-5">
          <UserBreadcrumb
            items={[
              {
                title: (
                  <>
                    <ShoppingCartOutlined /> <span>Cart</span>
                  </>
                ),
                link: "/cart",
                onClick: () => {
                  navigate("/cart", { state: { billingAddress: billingAddress } });
                },
              },
              {
                title: (
                  <>
                    <FaShippingFast /> <span>Checkout</span>
                  </>
                ),
              },
            ]}
          />
          <h1 className="display-4 fontPoppins fw-bold mt-2">Checkout</h1>
        </div>

        <div className="row g-5">
          <div className="col-lg-6 sticky-lg-top" style={{ height: "fit-content" }}>
            <div className="shadow px-5 py-50 bg-light">
              <h1 className="display-4 fontPoppins mb-5">Shipping Address</h1>

              <form onSubmit={handleSubmit}>
                {inputFields.map((field) => (
                  <div className="mb-5" key={field.name}>
                    <label className="label-control mb-2">
                      {field.label} <span className="text-danger fs-3">*</span>
                    </label>
                    <input
                      type={field?.type || "text"}
                      className="form-control shadow-sm px-4 py-2"
                      name={field.name}
                      value={shippingAddress[field.name] || ""}
                      onChange={handleInputChange}
                      readOnly={field?.readOnly}
                      disabled={field?.disabled}
                    />
                  </div>
                ))}
                <div className="text-center mt-50">
                  <button className="btn btnPrimary rounded-pill px-50 py-4">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6 sticky-lg-top" style={{ height: "fit-content" }}>
            <div className="px-5 py-50">
              <div className="row border-top">
                <div className="col-xl-8 col-xxl-7">
                  <div className="border-bottom border-dark py-5">
                    <h2 className="display-4 fontPoppins fw-bold text-center mb-5">
                      Order Summary
                    </h2>

                    <div className="d-flex justify-content-between align-items-center text-nowrap mb-3">
                      <span className="fs-3 textColor">Subtotal</span>
                      <span className="fs-3 fw-medium">$2,000</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center text-nowrap mb-3">
                      <span className="fs-3 textColor">Discount</span>
                      <span className="fs-3 fw-medium">-$100</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center text-nowrap mb-5">
                      <span className="fs-3 textColor">Shipping</span>
                      <span className="fs-3 fw-medium">$10</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center text-nowrap">
                      <span className="fs-3 textColor">TOTAL</span>
                      <span className="display-4 fw-medium fw-bold">$1910</span>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="pt-50">
                    {cart.map((product) => (
                      <div
                        className="d-flex justify-content-between gap-4 mb-20"
                        key={product?._id}
                      >
                        <div>
                          <Link to={`/product/${product?.slug}`}>
                            <ImageLazyLoad
                              style={{ width: "8rem", height: "8rem", borderRadius: "3px" }}
                              src={`${process.env.REACT_APP_API}/product/photo/${product?._id}`}
                              alt={product?.name}
                            />
                          </Link>
                        </div>
                        <div className="flex-grow-1">
                          <h4 className="fw-medium mb-20">
                            <Link
                              className="hoverLine hoverSecondary"
                              to={`/product/${product?.slug}`}
                            >
                              {product?.name}
                            </Link>
                          </h4>

                          <div>
                            <span className="fw-normal position-relative fs-3">
                              ${product?.price}
                              <span
                                style={{
                                  top: "-1.2rem",
                                  right: "-3rem",
                                  width: "2.8rem",
                                  lineHeight: 1,
                                  padding: "2px",
                                }}
                                className="bgTheme position-absolute fs-12 lightColor2 text-center rounded-1"
                              >
                                {product?.cartQuantity}x
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="fs-3 fontPoppins fw-semibold">
                          {(product?.price * product?.cartQuantity).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
