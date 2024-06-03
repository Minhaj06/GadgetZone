import React, { useEffect, useState } from "react";
import UserBreadcrumb from "../components/breadcrumb/UserBreadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Payment = () => {
  // context
  const { auth, setAuth, isLoading, setIsLoading } = useAuth();
  const [cart, setCart] = useCart();

  // state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  const billingAddress = location?.state?.billingAddress;
  const shippingAddress = location?.state?.shippingAddress;
  const discountPercentage = location?.state?.discountPercentage;
  const shippingCharge = location?.state?.shippingCharge;

  useEffect(() => {
    if (auth?.token) getClientToken();
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("/braintree/token");
      setClientToken(data?.clientToken);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleBuy = async () => {
    try {
      setIsLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
        shippingAddress: shippingAddress,
        discountPercentage: discountPercentage,
        shippingCharge: shippingCharge,
      });
      console.log("buy response", data);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment successful");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
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
                  navigate("/cart", {
                    state: { billingAddress: shippingAddress || billingAddress },
                  });
                },
              },
              {
                title: (
                  <>
                    <FaShippingFast /> <span>Checkout</span>
                  </>
                ),
                link: "/checkout",
                onClick: () => {
                  navigate("/checkout", {
                    state: { billingAddress: shippingAddress || billingAddress },
                  });
                },
              },
              {
                title: (
                  <>
                    <MdOutlinePayments /> <span>Payment</span>
                  </>
                ),
              },
            ]}
          />
          <h1 className="display-4 fontPoppins fw-bold mt-2">Payment</h1>
        </div>

        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="bgLight2 border shadow p-5">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      //   paypal: {
                      //     flow: "vault",
                      //   },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    onClick={handleBuy}
                    className="btn btnDark p-3 col-12 rounded-pill mt-2"
                    disabled={!auth?.user?.address || !instance || isLoading}
                  >
                    {isLoading ? "Processing..." : "Buy"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
