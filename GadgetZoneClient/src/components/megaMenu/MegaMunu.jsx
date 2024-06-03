import React from "react";
import "./megaMenu.css";
import megaMenuWomenImg from "../../assets/images/megaMenuWomen.jpg";
import { BsArrowRightShort } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const MegaMenu = () => {
  return (
    <div className="megaMenu">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-3">
                <div className="">
                  <h5 className="text-uppercase fw-semibold text-color-2 mb-4">
                    Women clothing
                  </h5>

                  <ul className="text-capitalize">
                    <li className="mb-4">
                      <NavLink to="">Dresses</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Coats & Jackets</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Tops & Tess</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Dresses</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Coats & Jackets</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Tops & Tess</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Dresses</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Tops & Tess</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Dresses</NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="">
                  <h5 className="text-uppercase fw-semibold text-color-2 mb-4">Jwelery</h5>

                  <ul className="text-capitalize">
                    <li className="mb-4">
                      <NavLink to="">Accessories</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Bags & purses</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Rings</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Earrings</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Accessories</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Bags & purses</NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="">
                  <h5 className="text-uppercase fw-semibold text-color-2 mb-4">Beauty</h5>

                  <ul className="text-capitalize">
                    <li className="mb-4">
                      <NavLink to="">Bath accessories</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Makeup & cosmetics</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Skin care</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Hair care</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Essential oils</NavLink>
                    </li>
                    <li className="mb-4">
                      <NavLink to="">Facemask & coverrings</NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="">
                  <h5 className="text-uppercase fw-semibold text-color-2 mb-4">Top brands</h5>

                  <ul className="text-capitalize">
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Nike</NavLink>
                    </li>
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Louis vuitton</NavLink>
                    </li>
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Hermes</NavLink>
                    </li>
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Gucci</NavLink>
                    </li>
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Zalando</NavLink>
                    </li>
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Tiffany & Co.</NavLink>
                    </li>
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Nike</NavLink>
                    </li>
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Louis vuitton</NavLink>
                    </li>
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Hermes</NavLink>
                    </li>
                    <li className="float-start w-50 mb-4">
                      <NavLink to="">Gucci</NavLink>
                    </li>
                  </ul>
                  <NavLink className="d-inline-block fw-semibold py-2 hoverable" to="/brands">
                    <span className="me-3">View all brands</span>
                    <BsArrowRightShort size={22} />
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="overflow-hidden">
              <NavLink to="/" className="d-block">
                <img className="w-100 megaMenuImg mb-4" src={megaMenuWomenImg} alt="" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
