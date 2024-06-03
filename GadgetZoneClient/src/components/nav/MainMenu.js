import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { FaSitemap } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import MegaMenu from "../megaMenu/MegaMunu";
import { useCart } from "../../context/cart";
import { Collapse, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { ReactComponent as CategoryIcon } from "../../assets/icons/categoryIcon.svg";
import { BsChevronRight } from "react-icons/bs";
import ImageLazyLoad from "../../utils/ImageLazyLoad";
import { IoClose } from "react-icons/io5";
import { removeFromCart } from "../../utils/cart";

const mainMenuItems = [
  { _id: 1, label: "Home", to: "/" },
  { _id: 2, label: "Shop", to: "/shop" },
  { _id: 4, label: "Women", to: "/category/women", megaMenu: true },
  { _id: 5, label: "Men", to: "/category/men" },
  { _id: 6, label: "Sports", to: "/category/sports" },
  { _id: 7, label: "Calculate", to: "/calculate" },
];

const MainMenu = ({ categories, subcategories }) => {
  // Context
  const [cart, setCart] = useCart();

  // state
  const [showMenuOffcanvas, setShowMenuOffcanvas] = useState(false);
  const [showCartOffcanvas, setShowCartOffcanvas] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeSubcategoryCollapse, setActiveSubcategoryCollapse] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmenuActive = (id) => {
    if (activeSubmenu === id) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(id);
    }
  };

  const handleSubcategoryCollapse = (categoryId) => {
    setActiveSubcategoryCollapse(activeSubcategoryCollapse === categoryId ? null : categoryId);
  };

  const filteredSubcategories = (categoryId) =>
    subcategories.filter((subcategory) => subcategory?.category?._id === categoryId);

  useEffect(() => {
    const totalAmount = parseFloat(
      cart.reduce((total, product) => total + product?.price * product?.cartQuantity, 0)
    );
    setTotalPrice(totalAmount);
  }, [cart]);

  // const mediaQueryThreshold = 768;
  // const handleWindowResize = () => {
  //   const windowWidth = window.innerWidth;

  //   setShowMenuOffcanvas(windowWidth < mediaQueryThreshold);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, []);

  return (
    <>
      {/* Menu & Category Offcanvas */}
      <Offcanvas
        show={showMenuOffcanvas}
        onHide={() => setShowMenuOffcanvas(false)}
        responsive="lg"
      >
        <Offcanvas.Header
          className="px-4 pt-4 justify-content-end"
          closeButton
        ></Offcanvas.Header>
        <Offcanvas.Body className="px-0">
          <div className="d-flex gap-4 mb-4 px-4">
            <button
              onClick={() => setShowCategories(!showCategories)}
              style={{ padding: "7px" }}
              className={`btn ${
                showCategories ? "btnPrimaryOutline" : "btnPrimary"
              } w-50 d-flex justify-content-center align-items-center gap-3 fw-medium`}
            >
              <FaSitemap className="flex-shrink-0" size={18} />
              <span className="text-uppercase">Menu</span>
            </button>
            <button
              onClick={() => setShowCategories(!showCategories)}
              style={{ padding: "7px" }}
              className={`btn ${
                showCategories ? "btnPrimary" : "btnPrimaryOutline"
              } w-50 d-flex justify-content-center align-items-center gap-3 fw-medium`}
            >
              <BiCategory className="flex-shrink-0" size={18} />
              <span className="text-uppercase">Categories</span>
            </button>
          </div>
          <hr />
          <div className="px-4 mt-4">
            {showCategories ? (
              <ul className="text-capitalize">
                {categories.map((category) => (
                  <li className="py-12" key={category?._id}>
                    {filteredSubcategories(category?._id).length > 0 ? (
                      <>
                        <NavLink
                          className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
                          to="#"
                          onClick={() => handleSubcategoryCollapse(category?._id)}
                          aria-expanded={activeSubcategoryCollapse === category?._id}
                        >
                          <span className="d-flex align-items-center">
                            {category?.icon ? (
                              <img
                                className="me-3"
                                style={{ width: "1.6rem" }}
                                src={category.icon}
                                alt=""
                              />
                            ) : (
                              <CategoryIcon style={{ width: "2.1rem" }} className="me-2" />
                            )}

                            {category?.name}
                          </span>
                          {activeSubcategoryCollapse === category?._id ? (
                            <BiChevronDown size={22} />
                          ) : (
                            <BiChevronRight size={22} />
                          )}
                        </NavLink>

                        <Collapse in={activeSubcategoryCollapse === category?._id}>
                          <div>
                            <ul className="pt-2 ps-20">
                              {filteredSubcategories(category?._id).map((subcategory) => (
                                <li key={subcategory?._id}>
                                  <NavLink
                                    className="d-block hoverableOp px-4 py-2"
                                    to={`/category/subcategory/${subcategory?.slug}`}
                                  >
                                    {subcategory.name}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Collapse>
                      </>
                    ) : (
                      <NavLink
                        className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
                        to={`/category/${category?.slug}`}
                      >
                        <span className="d-flex align-items-center">
                          {category?.icon ? (
                            <img
                              className="me-3"
                              style={{ width: "1.6rem" }}
                              src={category.icon}
                              alt=""
                            />
                          ) : (
                            <CategoryIcon style={{ width: "2.1rem" }} className="me-2" />
                          )}

                          {category?.name}
                        </span>
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="fs-3">
                {mainMenuItems.map((item) => (
                  <li className="py-3" key={item?._id}>
                    {item?.megaMenu ? (
                      <>
                        <Link
                          onClick={() => handleSubmenuActive(item?._id)}
                          className="nav-link d-flex justify-content-between align-items-center"
                          to="#"
                          aria-current="page"
                        >
                          {item?.label}
                          {item?.megaMenu && <BsChevronRight size={18} />}
                        </Link>

                        <Collapse in={activeSubmenu === item?._id}>
                          <div className="p-3">
                            <h4>Subcategory</h4>
                            <h4>Subcategory</h4>
                            <h4>Subcategory</h4>
                          </div>
                        </Collapse>
                      </>
                    ) : (
                      <NavLink
                        onClick={() => handleSubmenuActive(item?._id)}
                        className="nav-link d-flex justify-content-between align-items-center"
                        to={item.to}
                        aria-current="page"
                      >
                        {item?.label}
                        {item?.megaMenu && <BsChevronRight size={18} />}
                      </NavLink>
                    )}
                  </li>
                ))}
                <li className="py-3">
                  <NavLink
                    className="nav-link d-flex justify-content-between align-items-center"
                    to="/blog"
                    aria-current="page"
                  >
                    Blog
                  </NavLink>
                </li>
                <li className="py-3">
                  <NavLink
                    className="nav-link d-flex justify-content-between align-items-center"
                    to="/featured-products"
                    aria-current="page"
                  >
                    Featured Products
                  </NavLink>
                </li>
                <li className="py-3">
                  <NavLink
                    className="nav-link d-flex justify-content-between align-items-center"
                    to="/wishlist"
                    aria-current="page"
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li className="py-3">
                  <div className="menuIcons d-flex align-items-center mt-2 mt-lg-0">
                    <div className="topbar-icon-group me-20">
                      <span
                        role="button"
                        className="floating-text-icon d-inline-block position-relative hoverable"
                      >
                        <AiOutlineHeart size={22} />
                        <span className="floating-num">0</span>
                      </span>
                    </div>
                    <div className="topbar-icon-group me-20">
                      <span
                        onClick={() => {
                          setShowMenuOffcanvas(false);
                          setShowCartOffcanvas(true);
                        }}
                        role="button"
                        className="floating-text-icon d-inline-block position-relative hoverable"
                      >
                        <AiOutlineShoppingCart size={22} />
                        <span className="floating-num">{cart.length}</span>
                      </span>
                    </div>
                    <div className="totalAmount">
                      <small className="fs-14 lightColor">Total</small>
                      <h5 className="fs-14">${totalPrice.toFixed(2)}</h5>
                    </div>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Cart Offcanvas */}
      <Offcanvas
        show={showCartOffcanvas}
        onHide={() => setShowCartOffcanvas(false)}
        placement="end"
      >
        <Offcanvas.Header className="p-20 border-bottom" closeButton>
          <Offcanvas.Title className="fs-2 fw-medium lightColor">{`${String(
            cart.length
          ).padStart(2, "0")} items in cart`}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-20">
          <div>
            {cart.length > 0 ? (
              cart.map((product) => (
                <div className="d-flex justify-content-between gap-4 mb-20" key={product?._id}>
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
                  <div className="d-flex align-items-center gap-3">
                    <span className="fs-3 fontPoppins fw-semibold">
                      {(product?.price * product?.cartQuantity).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                    <span
                      onClick={() => removeFromCart(product._id, cart, setCart)}
                      className="p-2 hoverableOp"
                      role="button"
                    >
                      <IoClose size={22} />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="text-center fs-1">No product in cart. 😔</h2>
            )}
          </div>

          <div className="border-top pt-4 mt-5">
            <h4 className="fw-normal themeColorSecondaryDark">Subtotal</h4>
            <h1 className="fw-bold">
              {totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h1>

            <Link
              onClick={() => setShowCartOffcanvas(!showCartOffcanvas)}
              to="/checkout"
              className="btn btnPrimary w-100 py-10 rounded-pill mt-5"
            >
              Checkout
            </Link>
            <Link
              onClick={() => setShowCartOffcanvas(!showCartOffcanvas)}
              to="/cart"
              className="btn btnDark w-100 py-10 rounded-pill mt-3"
            >
              View cart
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Navbar
        className="mb-3 mb-sm-4 position-sticky top-0 start-0 static-lg"
        bg="white"
        expand="lg"
        style={{ zIndex: 1020 }}
      >
        <Container>
          <Navbar.Brand className="me-5">
            <Link to="/">
              <img
                src="https://minhaj06.github.io/AlifaOnline-OkkhoTech/images/logo.svg"
                alt="Logo"
              />
            </Link>
          </Navbar.Brand>
          <span
            onClick={() => setShowMenuOffcanvas(true)}
            className="hoverableOp d-lg-none"
            role="button"
          >
            <HiOutlineBars3BottomRight size={32} className="themeColorSecondaryDark" />
          </span>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-lg-4">
              {mainMenuItems.map((item, index) => (
                <li
                  className={`nav-item text-center${item?.megaMenu ? " megaMenuLink" : ""}`}
                  key={index}
                >
                  <NavLink className="nav-link" to={item.to} aria-current="page">
                    {item?.label}
                    {item?.megaMenu && <BiChevronRight size={20} />}
                  </NavLink>
                  {item?.megaMenu && <MegaMenu />}
                </li>
              ))}
            </Nav>

            <div className="menuIcons d-flex justify-content-center align-items-center mt-2 mt-lg-0">
              <div className="topbar-icon-group me-20">
                <span
                  role="button"
                  className="floating-text-icon d-inline-block position-relative hoverable"
                >
                  <AiOutlineHeart size={22} />
                  <span className="floating-num">0</span>
                </span>
              </div>
              <div className="topbar-icon-group me-20">
                <span
                  onClick={() => setShowCartOffcanvas(true)}
                  role="button"
                  className="floating-text-icon d-inline-block position-relative hoverable"
                >
                  <AiOutlineShoppingCart size={22} />
                  <span className="floating-num">{cart.length}</span>
                </span>
              </div>
              <div className="totalAmount">
                <small className="fs-14 lightColor">Total</small>
                <h5 className="fs-14">${totalPrice.toFixed(2)}</h5>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainMenu;
