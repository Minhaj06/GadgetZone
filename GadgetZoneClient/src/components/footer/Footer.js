import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { GrAppleAppStore } from "react-icons/gr";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { Link } from "react-router-dom";

import paymentMethod1 from "../../assets/images/paymentMethodImages/payment-method-1.png";
import paymentMethod2 from "../../assets/images/paymentMethodImages/payment-method-2.png";
import paymentMethod3 from "../../assets/images/paymentMethodImages/payment-method-3.png";
import paymentMethod4 from "../../assets/images/paymentMethodImages/payment-method-4.png";
import paymentMethod5 from "../../assets/images/paymentMethodImages/payment-method-5.png";
import paymentMethod6 from "../../assets/images/paymentMethodImages/payment-method-6.png";
import paymentMethod7 from "../../assets/images/paymentMethodImages/payment-method-7.png";
import paymentMethod8 from "../../assets/images/paymentMethodImages/payment-method-8.png";
import paymentMethod9 from "../../assets/images/paymentMethodImages/payment-method-9.png";
import paymentMethod10 from "../../assets/images/paymentMethodImages/payment-method-10.png";
import paymentMethod11 from "../../assets/images/paymentMethodImages/payment-method-11.png";
import paymentMethod12 from "../../assets/images/paymentMethodImages/payment-method-12.png";
import paymentMethod13 from "../../assets/images/paymentMethodImages/payment-method-13.png";
import paymentMethod14 from "../../assets/images/paymentMethodImages/payment-method-14.png";
import paymentMethod15 from "../../assets/images/paymentMethodImages/payment-method-15.png";
import paymentMethod16 from "../../assets/images/paymentMethodImages/payment-method-16.png";
import paymentMethod17 from "../../assets/images/paymentMethodImages/payment-method-17.png";
import paymentMethod18 from "../../assets/images/paymentMethodImages/payment-method-18.png";

const paymentMethodImages = [
  paymentMethod1,
  paymentMethod2,
  paymentMethod3,
  paymentMethod4,
  paymentMethod5,
  paymentMethod6,
  paymentMethod7,
  paymentMethod8,
  paymentMethod9,
  paymentMethod10,
  paymentMethod11,
  paymentMethod12,
  paymentMethod13,
  paymentMethod14,
  paymentMethod15,
  paymentMethod16,
  paymentMethod17,
  paymentMethod18,
];

const Footer = () => {
  return (
    <footer className="footer bgLight2 mt-50 pt-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 py-5 border-bottom border-secondary">
            <div className="row g-5 text-capitalize text-center text-sm-start">
              <div className="col-12 col-sm-6 col-lg-3">
                <div>
                  <Link to="/" className="d-block">
                    <img
                      src="https://minhaj06.github.io/AlifaOnline-OkkhoTech/images/logo.svg"
                      alt="Logo"
                      className="img-fluid h-auto mb-5"
                    />
                  </Link>

                  <div className="d-flex justify-content-center justify-content-sm-start gap-2 textColor icon-text mb-3">
                    <div className="icon">
                      <span>
                        <ImLocation2 size={18} />
                      </span>
                    </div>
                    <div className="text">
                      <p className="text-capitalize lh-base">
                        Chapainawabganj, Rajshahi, Bangladesh.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center justify-content-sm-start gap-2 textColor icon-text mb-3">
                    <div className="icon">
                      <span>
                        <ImLocation2 size={18} />
                      </span>
                    </div>
                    <div className="text">
                      <p className="text-lowercase lh-base" style={{ wordBreak: "break-all" }}>
                        milonmdminhajkobir@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center justify-content-sm-start gap-2 textColor icon-text mb-3">
                    <div className="icon">
                      <span>
                        <ImLocation2 size={18} />
                      </span>
                    </div>
                    <div className="text">
                      <p className="text-lowercase lh-base">+8801303-148457</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div>
                  <h1 className="themeColorSecondaryDark border-bottom pb-3 mb-5">
                    my account
                  </h1>

                  <ul>
                    <li className="mb-4">
                      <Link className="textColor text-decoration-underline fs-3" to="/login">
                        login
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link
                        className="textColor text-decoration-underline fs-3"
                        to="/wish-list"
                      >
                        wish list
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link
                        className="textColor text-decoration-underline fs-3"
                        to="/order-history"
                      >
                        Order History
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link
                        className="textColor text-decoration-underline fs-3"
                        to="/order-tracking"
                      >
                        Order Tracking
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div>
                  <h1 className="themeColorSecondaryDark border-bottom pb-3 mb-5">konw us</h1>

                  <ul>
                    <li className="mb-4">
                      <Link className="textColor fs-3" to="/privacy-policy">
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link className="textColor fs-3" to="/shipping-policy">
                        Shipping Policy
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link className="textColor fs-3" to="/payment-policy">
                        Payment Policy
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link className="textColor fs-3" to="/return-policy">
                        Returns & Refunds
                      </Link>
                    </li>
                    <li className="mb-4">
                      <Link className="textColor fs-3" to="/terms-conditions">
                        Terms & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div>
                  <p className="mb-4 textColor lh-base">download ecommerce apps</p>

                  <div className="d-flex flex-wrap gap-4 mb-5">
                    <Link
                      to="/"
                      className="btn btn-lg flex-grow-1 bgThemeSecondaryDark whiteColor hoverableOp"
                    >
                      <GrAppleAppStore className="me-2" size={20} />
                      App Store
                    </Link>

                    <Link
                      to=""
                      className="btn btn-lg flex-grow-1 bg-transparent textColor border border-secondary hoverableOp"
                    >
                      <IoLogoGooglePlaystore className="me-2" size={20} />
                      Playstore
                    </Link>
                  </div>

                  <p className="fw-500 textColor mb-4">we accept payment by-</p>

                  <div>
                    {paymentMethodImages.map((imageSrc, index) => (
                      <img
                        key={index}
                        className="img-fluid me-2 mb-2"
                        src={`${imageSrc}`}
                        alt="Payment Method Logo"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 py-5">
            <div className="row">
              <div className="col-8 text-lg-end">
                <p className="text-capitalize textColor">
                  © all rights reserved terms conditions-{" "}
                  <Link
                    className="fw-medium themeColorSecondaryDark hoverable"
                    to="privacy-policy"
                  >
                    privacy policy
                  </Link>
                </p>
              </div>
              <div className="col-4 text-end">
                <div className="d-flex justify-content-end flex-wrap gap-4 fs-1">
                  <Link to="">
                    <FaFacebook className="textColor hoverable" />
                  </Link>
                  <Link to="">
                    <FaInstagram className="textColor hoverable" />
                  </Link>
                  <Link to="">
                    <FaTwitter className="textColor hoverable" />
                  </Link>
                  <Link to="">
                    <FaLinkedin className="textColor hoverable" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
