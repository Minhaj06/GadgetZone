import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Dropdown } from "react-bootstrap";

// Icons
import { BiUserCircle } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { GiArchiveRegister, GiWallet } from "react-icons/gi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import logout from "../../utils/logout";

const TopNav = () => {
  // hooks
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  // const logout = () => {
  //   setAuth({ ...auth, user: null, token: "" });
  //   localStorage.removeItem("auth");
  //   navigate("/login");
  // };

  const navProfileImg = {
    width: "3.5rem",
    height: "3.5rem",
    borderRadius: "50%",
    cursor: "pointer",
  };

  return (
    <div className="topNav">
      <div className="container pt-3 pb-2 pb-sm-3 text-capitalize">
        <div className="d-sm-flex justify-content-between align-items-center fs-14 themeColorSecondaryDark">
          <div className="topNavLeft d-none d-sm-block">
            <ul>
              <li className="nav-item d-inline-block me-20">
                <NavLink className="nav-link themeColorSecondaryDark" to="/blog">
                  Blog
                </NavLink>
              </li>
              <li className="nav-item d-inline-block me-20">
                <NavLink className="nav-link themeColorSecondaryDark" to="/featured-products">
                  Featured Products
                </NavLink>
              </li>
              <li className="nav-item d-inline-block me-20">
                <NavLink className="nav-link themeColorSecondaryDark" to="/wishlist">
                  Wishlist
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="topNavRight d-flex justify-content-between align-items-center">
            <ul>
              <li className="nav-item d-inline-block s-20">
                <Form.Select
                  aria-label="Default select example"
                  className="fs-14 themeColorSecondaryDark ps-1"
                >
                  <option value="bdt">BDT</option>
                  <option value="usd">USD</option>
                  <option value="sa">SA</option>
                </Form.Select>
              </li>
              <li className="nav-item d-inline-block ms-2">
                <Form.Select
                  aria-label="Default select example"
                  className="fs-14 themeColorSecondaryDark"
                >
                  <option value="english">English</option>
                  <option value="japanese">Japanese</option>
                  <option value="arabic">Arabic</option>
                </Form.Select>
              </li>
              {/* <li className="nav-item d-inline-block ms-aut">
                
              </li> */}
            </ul>
            <div>
              <Dropdown>
                <Dropdown.Toggle as={"div"} type={"button"} className="removeToggleIcon">
                  {!auth?.user ? (
                    <BiUserCircle size={30} />
                  ) : auth?.user?.photo ? (
                    <img
                      style={navProfileImg}
                      src="https://minhaj06.github.io/SMM-Panel-OkkhoTech/smm-admin/images/user-profile-img.jpg"
                      type="button"
                      alt="Profile Image"
                    />
                  ) : (
                    <BiUserCircle size={30} />
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="rounded-3">
                  <Dropdown.Header>
                    <div className="px-20 py-2 text-nowrap text-center">
                      {!auth?.user ? (
                        <h4 className="fs-16 themeColorSecondaryDark mb-2">Start Shopping</h4>
                      ) : (
                        <>
                          <h4 className="fs-16 themeColorSecondaryDark mb-2">
                            {`${auth?.user?.firstName} ${auth?.user?.lastName}`}
                          </h4>
                          {auth?.user.role === 1 ? (
                            <h5 className="fs-12">
                              <Link className="lightColor" to="/dashboard/user/admin">
                                Admin
                              </Link>
                            </h5>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                  </Dropdown.Header>

                  {!auth?.user ? (
                    <>
                      <Dropdown.Item
                        as={NavLink}
                        to="/login"
                        className="border-top p-3 fs-14 d-flex align-items-center"
                      >
                        <FiLogIn className="me-4" size={18} />
                        <span>Login</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={NavLink}
                        to="/register"
                        className="border-top p-3 fs-14 d-flex align-items-center"
                      >
                        <GiArchiveRegister className="me-4" size={18} />
                        <span>Register</span>
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item
                        as={NavLink}
                        to="/dashboard/user/profile"
                        className="border-top p-3 fs-14 d-flex align-items-center"
                      >
                        <BiUser className="me-4" size={18} />
                        <span>profile</span>
                      </Dropdown.Item>

                      <Dropdown.Item
                        as={NavLink}
                        to="/dashboard/user/orders"
                        className="border-top p-3 fs-14 d-flex align-items-center"
                      >
                        <TbTruckDelivery className="me-4" size={18} />
                        <span>Orders</span>
                      </Dropdown.Item>

                      <Dropdown.Item
                        as={NavLink}
                        to="/dashboard/user/transactions"
                        className="border-top p-3 fs-14 d-flex align-items-center"
                      >
                        <GiWallet className="me-4" size={18} />
                        <span>Transactions</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={NavLink}
                        to="/login"
                        className="border-top p-3 fs-14 d-flex align-items-center"
                        onClick={() => logout(auth, setAuth, navigate)}
                      >
                        <FiLogOut className="me-4" size={18} />
                        <span>Logout</span>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
