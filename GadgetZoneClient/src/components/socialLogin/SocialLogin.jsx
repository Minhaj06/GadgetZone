import React from "react";
import { useAuth } from "../../context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import app from "../../firebase/firebase.config";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { Button, Divider } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";

const SocialLogin = () => {
  const { auth, setAuth, setIsLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Social Login
  const fireAuth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleLoginWithGoogle = () => {
    setIsLoading(true);

    signInWithPopup(fireAuth, googleProvider)
      .then(async (result) => {
        const loggedUser = result.user;

        const saveUser = {
          firstName: "",
          lastName: "",
          email: loggedUser.email,
          password: "MINHAJ@DESKTOP-F7N5FEH",
        };

        // Extract first and last names from displayName
        const displayNameArray = loggedUser.displayName.split(" ");
        saveUser.lastName = displayNameArray.pop();
        saveUser.firstName = displayNameArray.join(" ");

        const { data } = await axios.post("/firebase-login", saveUser);
        console.log("data=>", data);
        if (data?.error) {
          toast.error(data.error);
          setIsLoading(false);
        } else {
          localStorage.setItem("auth", JSON.stringify(data));
          setAuth({ ...auth, token: data.token, user: data.user });

          setIsLoading(false);
          navigate(from, { replace: true });
          toast.success("Successfully Logged In");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const handleLoginWithFacebook = () => {
    setIsLoading(true);

    signInWithPopup(fireAuth, facebookProvider)
      .then((result) => {
        const user = result.user;
        setIsLoading(false);
        navigate(from, { replace: true });
        toast.success("Successfully Logged In");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Divider
        style={{
          borderColor: "var(--lightColor)",
          borderWidth: "2px",
        }}
      >
        OR
      </Divider>

      <div>
        <Button
          onClick={handleLoginWithGoogle}
          className="d-flex justify-content-center align-items-center w-100 mb-4"
          size="large"
        >
          <GoogleOutlined style={{ color: "#0F9D58" }} />
          <span>Login With Google</span>
        </Button>

        <Button
          onClick={handleLoginWithFacebook}
          className="d-flex justify-content-center align-items-center w-100"
          size="large"
        >
          <FacebookOutlined style={{ color: "#4267B2" }} />
          <span>Login With Facebook</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;
