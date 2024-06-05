import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext"; // Adjust the import path as needed

const Test = () => {
  const { setIsLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Social Login
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleLoginWithGoogle = () => {
    setIsLoading(true);

    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        const saveUser = {
          firstName: getFirstName(loggedUser.displayName),
          lastName: getLastName(loggedUser.displayName),
          email: loggedUser.email || prompt("Please enter your email:"),
        };

        const { data } = await axios.post("/users", saveUser);
        console.log(data);

        setIsLoading(false);
        navigate(from, { replace: true });
        toast.success("Successfully Logged In");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const handleLoginWithFacebook = () => {
    setIsLoading(true);

    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        const saveUser = {
          firstName: getFirstName(loggedUser.displayName),
          lastName: getLastName(loggedUser.displayName),
          email: loggedUser.email || prompt("Please enter your email:"),
        };

        const { data } = await axios.post("/users", saveUser);
        console.log(data);

        setIsLoading(false);
        navigate(from, { replace: true });
        toast.success("Successfully Logged In");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  // Function to get the first name
  const getFirstName = (displayName) => {
    if (!displayName) return "";
    const nameArray = displayName.split(" ");
    nameArray.pop();
    return nameArray.join(" ");
  };

  // Function to get the last name
  const getLastName = (displayName) => {
    if (!displayName) return "";
    const nameArray = displayName.split(" ");
    return nameArray.pop();
  };

  return (
    <div>
      <button onClick={handleLoginWithGoogle}>Login with Google</button>
      <button onClick={handleLoginWithFacebook}>Login with Facebook</button>
    </div>
  );
};

export default Test;
