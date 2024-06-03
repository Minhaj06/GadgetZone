import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Loading from "./Loading";

const PrivateRoute = () => {
  // context
  const { auth, setAuth } = useAuth();

  // state
  const [ok, setOk] = useState(false);

  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`/auth-check`);

      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
        navigate("/login", {
          state: location.pathname,
        });
      }
    };

    if (auth?.token) authCheck();
    else
      setTimeout(() => {
        navigate("/login", {
          state: location.pathname,
        });
      }, 3000);
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
