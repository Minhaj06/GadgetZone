import React, { useEffect, useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import { ReactComponent as CategoryIcon } from "../../assets/icons/categoryIcon.svg";
import { useAuth } from "../../context/auth";
import axios from "axios";

const CategoryMenu = ({ categories, subcategories }) => {
  const { setIsLoading } = useAuth();

  const [activeCollapse, setActiveCollapse] = useState(null);
  const handleCollapse = (categoryId) => {
    setActiveCollapse(activeCollapse === categoryId ? null : categoryId);
  };

  const [productsCount, setProductsCount] = useState(0);
  const [openCatMenu, setOpenCatMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setOpenCatMenu(true);
    } else {
      setOpenCatMenu(false);
    }
  }, [location.pathname]);

  const filteredSubcategories = (categoryId) =>
    subcategories.filter((subcategory) => subcategory?.category?._id === categoryId);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/products-count`);
        setProductsCount(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div
      className="categoryMenu allDepartments position-absolute top-0 start-0 d-none d-lg-block"
      style={{ width: "30rem", zIndex: 1030 }}
    >
      <div
        className="catMenuHeader bgTheme px-4 py-3 rounded-top-3 d-flex justify-content-between align-items-center"
        style={{ borderBottom: "1px solid var(--themeColor)" }}
      >
        <div>
          <h4 className="fs-16 fw-medium">All Departments</h4>
          <p className="fs-13 mb-0">{`Total ${String(productsCount).padStart(
            2,
            "0"
          )} Products`}</p>
        </div>
        <div>
          <HiOutlineBars3BottomRight
            size={28}
            type="button"
            onClick={() => setOpenCatMenu(!openCatMenu)}
            aria-expanded={openCatMenu}
          />
        </div>
      </div>

      <Collapse in={openCatMenu}>
        <div className="catMenuBody">
          <ul className="list-group catMenuList rounded-0 text-capitalize">
            {categories.map((category) => (
              <li className="list-group-item px-4 py-12" key={category?._id}>
                {filteredSubcategories(category?._id).length > 0 ? (
                  <>
                    <NavLink
                      className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
                      to="#"
                      onClick={() => handleCollapse(category?._id)}
                      aria-expanded={activeCollapse === category?._id}
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
                      {activeCollapse === category?._id ? (
                        <BiChevronDown size={22} />
                      ) : (
                        <BiChevronRight size={22} />
                      )}
                    </NavLink>

                    <Collapse in={activeCollapse === category?._id}>
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
        </div>
      </Collapse>
    </div>
  );
};

export default CategoryMenu;
