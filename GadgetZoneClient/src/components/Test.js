import React, { useEffect, useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { BiCategory, BiChevronRight, BiChevronUpSquare } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import axios from "axios";

const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`/categories`);

      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadSubcategories = async (categoryId) => {
    try {
      // const { data } = await axios.get(`/subcategories-by-categoryId/${categoryId}`);
      const { data } = await axios.get(`/subcategories`);

      setSubcategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  // const filteredSubcategories = async (categoryId) => {
  //   subcategories.filter((subcategory) => subcategory);
  // };

  const filteredSubcategories = async (categoryId) => {
    try {
      subcategories.filter((subcategory) => subcategory?.category?._id === categoryId);
    } catch (err) {
      console.log(err);
    }
  };

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  // const [open3, setOpen3] = useState(false);
  // const [open4, setOpen4] = useState(false);
  // const [open5, setOpen5] = useState(false);

  return (
    <div
      className="categoryMenu allDepartments position-absolute top-0 start-0"
      style={{ width: "30rem" }}
    >
      <div className="catMenuHeader bgTheme px-4 py-3 rounded-top-3 d-flex justify-content-between align-items-center">
        <div>
          <h4 className="fs-16 fw-medium">All Departments</h4>
          <p className="fs-13 mb-0">Total 1022 Products</p>
        </div>
        <div>
          <HiOutlineBars3BottomRight size={28} type="button" />
        </div>
      </div>

      <div className="catMenuBody">
        <ul class="list-group catMenuList rounded-0">
          {categories.map((category) => (
            <li class="list-group-item px-4 py-12" key={category._id}>
              <NavLink
                className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
                to="#"
                onClick={() => setOpen1(!open1)}
                aria-expanded={open1}
              >
                <span className="d-flex align-items-center">
                  {/* <BiCategory className="me-4" size={18} /> */}
                  <img
                    className="me-3"
                    style={{ width: "1.4rem" }}
                    src={category.icon}
                    alt=""
                  />
                  {category.name}
                </span>
                <BiChevronRight size={20} />
              </NavLink>

              {/* {loadSubcategories(category._id)} */}

              <Collapse in={open1}>
                <div>
                  <ul className="pt-2">
                    <li>
                      <NavLink className="d-block px-4 py-2" to="/category">
                        Category 1
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="d-block px-4 py-2" to="/category">
                        Category 2
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="d-block px-4 py-2" to="/category">
                        Category 3
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </li>
          ))}
        </ul>
        {/* <ul class="list-group catMenuList rounded-0">
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="#"
              onClick={() => setOpen1(!open1)}
              aria-expanded={open1}
            >
              <span className="d-flex align-items-center">
                <BiCategory className="me-4" size={18} />
                Beauty
              </span>
              <BiChevronRight size={20} />
            </NavLink>

            <Collapse in={open1}>
              <div>
                <ul className="pt-2">
                  <li>
                    <NavLink className="d-block px-4 py-2" to="/category">
                      Category 1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="d-block px-4 py-2" to="/category">
                      Category 2
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="d-block px-4 py-2" to="/category">
                      Category 3
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="#"
              onClick={() => setOpen2(!open2)}
              aria-expanded={open2}
            >
              <span className="d-flex align-items-center">
                <BiChevronUpSquare className="me-4" size={18} />
                Home & kitchen
              </span>
              <BiChevronRight size={20} />
            </NavLink>

            <Collapse in={open2}>
              <div>
                <ul className="pt-2">
                  <li>
                    <NavLink className="d-block px-4 py-2" to="/category">
                      Category 1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="d-block px-4 py-2" to="/category">
                      Category 2
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="d-block px-4 py-2" to="/category">
                      Category 3
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="/category"
            >
              <span className="d-flex align-items-center">
                <HiOutlineBars3BottomRight className="me-4" size={18} />
                Electronic
              </span>
              <BiChevronRight size={20} />
            </NavLink>
          </li>
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="/category"
            >
              <span className="d-flex align-items-center">
                <HiOutlineBars3BottomRight className="me-4" size={18} />
                Women's Fashion
              </span>
              <BiChevronRight size={20} />
            </NavLink>
          </li>
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="/category"
            >
              <span className="d-flex align-items-center">
                <BiCategory className="me-4" size={18} />
                Men's Fashion
              </span>
            </NavLink>
          </li>
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="/category"
            >
              <span className="d-flex align-items-center">
                <BiCategory className="me-4" size={18} />
                Gift's Fashion
              </span>
            </NavLink>
          </li>
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="/category"
            >
              <span className="d-flex align-items-center">
                <BiCategory className="me-4" size={18} />
                Boy's Fashion
              </span>
            </NavLink>
          </li>
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="/category"
            >
              <span className="d-flex align-items-center">
                <BiCategory className="me-4" size={18} />
                Health & Household
              </span>
              <BiChevronRight size={20} />
            </NavLink>
          </li>
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="/category"
            >
              <span className="d-flex align-items-center">
                <BiCategory className="me-4" size={18} />
                Home & kitchen
              </span>
            </NavLink>
          </li>
          <li class="list-group-item px-4 py-12">
            <NavLink
              className="d-block hoverableOp d-flex justify-content-between align-items-center blackColor"
              to="/category"
            >
              <span className="d-flex align-items-center">
                <BiCategory className="me-4" size={18} />
                Health & Household
              </span>

              <BiChevronRight size={20} />
            </NavLink>
          </li>
        </ul> */}
      </div>
    </div>
  );
};

export default CategoryMenu;
