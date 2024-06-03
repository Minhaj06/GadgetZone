import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { MdDashboard } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { FaShippingFast, FaRegHeart, FaFileInvoice } from "react-icons/fa";
import logout from "../../utils/logout";
import { FiLogOut } from "react-icons/fi";

const UserMenu = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const menu = [
    { label: "Dashboard", link: "", icon: <MdDashboard /> },
    { label: "Profile", link: "/profile", icon: <ImProfile /> },
    { label: "Orders", link: "/orders", icon: <FaShippingFast /> },
    { label: "Transactions", link: "/transactions", icon: <AiOutlineTransaction /> },
    { label: "Wishlist", link: "/wishlist", icon: <FaRegHeart /> },
    { label: "Invoices", link: "/invoices", icon: <FaFileInvoice /> },
  ];

  return (
    <aside>
      <div className="userMenuTop d-flex gap-4">
        <div>
          <img
            style={{ width: "5rem", height: "5rem" }}
            className="img-thumbnail rounded-circle"
            src="https://minhaj06.github.io/AlifaOnline-OkkhoTech/images/avatar.png"
            alt="Profile Photo"
          />
        </div>
        <div>
          <h3 className="mb-0">
            {auth?.user?.firstName} {auth?.user?.lastName}
          </h3>
          <h5 className="textColor">{auth?.user?.email}</h5>
        </div>
      </div>
      <hr />

      <div className="mt-5">
        <ul className="d-flex flex-column">
          {menu.map((item, index) => (
            <li key={index} className="fs-3 mb-20">
              <NavLink
                end
                to={`${process.env.REACT_APP_UserBaseURL + item.link}`}
                className={({ isActive }) =>
                  `d-block textColor hoverableOp d-flex gap-3 align-items-center ${
                    isActive ? "darkColor fw-medium" : ""
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            </li>
          ))}
          <li className="fs-3 mb-20">
            <span
              role="button"
              onClick={() => logout(auth, setAuth, navigate)}
              className="d-block textColor hoverableOp d-flex gap-3 align-items-center"
            >
              <FiLogOut /> Logout
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default UserMenu;
