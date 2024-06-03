import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Loading from "./Loading";

const AdminRoute = () => {
  // context
  const { auth, setAuth } = useAuth();

  // state
  const [ok, setOk] = useState(false);

  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminCheck = async () => {
      try {
        const { data } = await axios.get(`/admin-check`);

        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate(-1, {
            state: location.pathname,
          });
        }
      } catch (err) {
        console.log(err);
        navigate(-1, {
          state: location.pathname,
        });
      }
    };

    if (auth?.token) adminCheck();
    else
      setTimeout(() => {
        navigate("/login", {
          state: location.pathname,
        });
      }, 3000);
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading />;
};

export default AdminRoute;
