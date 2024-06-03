import React from "react";
import subscribeBannerImg from "../../assets/images/subscribe-banner.png";
import { GrSend } from "react-icons/gr";
import { Link } from "react-router-dom";

// subscribe-banner.png
const SubscribeSection = () => {
  const subscribeContainerStyle = {
    backgroundImage: `url(${subscribeBannerImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    textAlign: "center",
    borderRadius: "1rem",
    minHeight: "35rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <section style={{ margin: "7rem 0" }}>
      <div className="container" style={subscribeContainerStyle}>
        <div className="d-flex justify-content-center align-items-center p-4">
          <div className="text-capitalize">
            <h2 className="themeColorSecondaryDark fs-35 fw-normal lh-lg">do you sign up?</h2>

            <h3 className="fs-1 fw-normal textColor mb-5">
              sign up & connect to alifa online
            </h3>

            <form className="mb-5">
              <div className="d-flex justify-content-center gap-4">
                <div className="d-inline-block d-flex align-items-center gap-3 text-color bg-white border-0 px-4 py-3 rounded-3">
                  <GrSend size={20} />
                  <input
                    className="border-0 py-1 email-input fs-3"
                    type="email"
                    placeholder="Your email address..."
                    style={{ width: "32rem", maxWidth: "32rem" }}
                  />
                </div>
                <button className="btn btnSecondary rounded-4 px-sm-5">subscribe</button>
              </div>
            </form>

            <p className="fs-4 textColor mb-4">
              Will be used in accordance with our{" "}
              <Link
                className="text-decoration-underline themeColorSecondaryDark fw-medium hoverable"
                to="privacy-policy"
              >
                Privacy Policy
              </Link>
            </p>

            <div className="fs-1">
              <a className="mx-2" href="">
                <span>
                  <i className="fa-brands fa-facebook-f"></i>
                </span>
              </a>
              <a className="mx-2" href="">
                <span>
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </a>
              <a className="mx-2" href="">
                <span>
                  <i className="fa-brands fa-twitter"></i>
                </span>
              </a>
              <a className="mx-2" href="">
                <span>
                  <i className="fa-brands fa-linkedin-in"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
