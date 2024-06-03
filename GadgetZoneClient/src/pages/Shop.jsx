import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/cards/productCard/ProductCard";
import { RiLayoutGridFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { HiOutlineChevronRight, HiOutlineChevronDown } from "react-icons/hi";
import { FaFilter } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import NoProductImg from "../assets/images/noData.png";
import { ReactComponent as CategoryIcon } from "../assets/icons/categoryIcon.svg";
import { Collapse } from "react-bootstrap";

import { Slider } from "antd";
import { useAuth } from "../context/auth";

const Shop = () => {
  const { isLoading, setIsLoading } = useAuth();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [total, setTotal] = useState([]);

  // Filtered Products
  const [categoryChecked, setCategoryChecked] = useState([]);
  const [subcategoryChecked, setSubcategoryChecked] = useState([]);
  const [priceRange, setPriceRange] = useState(0);

  // Collapse Expand
  const [isGridView, setIsGridView] = useState(true);
  const [open, setOpen] = useState([]);
  const [toggleFilterMenu, setToggleFilterMenu] = useState(["categoryFilter", "priceFilter"]);

  useEffect(() => {
    if (!categoryChecked.length || !priceRange.length) {
      loadProducts();
      getTotal();
    }
  }, []);

  useEffect(() => {
    if (categoryChecked.length) loadFilteredProducts();
  }, [categoryChecked]);
  useEffect(() => {
    if (subcategoryChecked.length) loadFilteredProducts();
  }, [subcategoryChecked]);
  useEffect(() => {
    if (priceRange.length) loadFilteredProducts();
  }, [priceRange]);

  const getTotal = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/list-products/${page}/${perPage}`);
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/list-products/${page}/${perPage}`);
      setProducts([...products, ...data]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const loadFilteredProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/filtered-products", {
        categoryChecked,
        subcategoryChecked,
        priceRange,
      });
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };
  const handleToggle = (id) => {
    if (open.includes(id)) {
      setOpen((prevState) => prevState.filter((x) => x !== id));
    } else {
      setOpen((prevState) => [...prevState, id]);
    }
  };
  const handleFilterMenu = (id) => {
    if (toggleFilterMenu.includes(id)) {
      setToggleFilterMenu((prevState) => prevState.filter((x) => x !== id));
    } else {
      setToggleFilterMenu((prevState) => [...prevState, id]);
    }
  };

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/categories`);
      setCategories(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const loadSubcategories = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/subcategories`);
      setSubcategories(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const filteredSubcategories = (categoryId) =>
    subcategories.filter((subcategory) => subcategory?.category?._id === categoryId);

  const handleInStock = (e) => {
    console.log(e.target.checked);
  };

  const handleCategoryCheck = (value, id) => {
    // console.log(value, id);
    let all = [...categoryChecked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCategoryChecked(all);
  };
  const handleSubcategoryCheck = (value, id) => {
    // console.log(value, id);
    let all = [...subcategoryChecked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setSubcategoryChecked(all);
  };

  const sortProducts = (event) => {
    const value = event.target.value;
    if (value === "dateNewToOld") {
      const sortedProducts = [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProducts(sortedProducts);
    } else if (value === "dateOldToNew") {
      const sortedProducts = [...products].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setProducts(sortedProducts);
    } else if (value === "featured") {
      const sortedProducts = [...products].sort((a, b) => b.isFeatured - a.isFeatured);
      setProducts(sortedProducts);
      console.log(sortedProducts.map((item) => item.isFeatured));
    } else if (value === "bestSelling") {
      const sortedProducts = [...products].sort((a, b) => b.sold - a.sold);
      setProducts(sortedProducts);
    } else if (value === "priceLowToHight") {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    } else if (value === "priceHighToLow") {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    } else if (value === "alphabetically_A_Z") {
      const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
      setProducts(sortedProducts);
    } else if (value === "alphabetically_Z_A") {
      const sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
      setProducts(sortedProducts);
    }
  };

  return (
    <>
      <section style={{ margin: "7rem 0" }}>
        <div className="container position-relative">
          {/* <pre>
            {JSON.stringify({ categoryChecked, subcategoryChecked, priceRange }, null, 4)}
          </pre> */}
          <div className="row g-5">
            <div className="col-lg-3 sticky-lg-top" style={{ height: "fit-content" }}>
              <div className="bgLight2 rounded py-4 border mb-5">
                <h2 className="d-flex justify-content-between align-items-center px-4">
                  <span>Filter</span>
                  <FaFilter size={15} />
                </h2>
              </div>

              <div className="bgLight2 rounded p-4 border mb-5">
                <div className="stockFilterArea">
                  <Form.Check
                    onChange={handleInStock}
                    type="checkbox"
                    label="In Stock"
                    id="stockFilterCheck"
                    htmlFor="stockFilterCheck"
                  />
                </div>
              </div>

              <div className="bgLight2 rounded py-4 border mb-5">
                <div className="priceFilterArea">
                  <h4
                    className="themeColorSecondaryDark fs-16 d-flex justify-content-between align-items-center px-4 mb-0"
                    role="button"
                    onClick={() => handleFilterMenu(`priceFilter`)}
                    aria-expanded={toggleFilterMenu.includes(`priceFilter`)}
                  >
                    Filter By Price
                    {toggleFilterMenu.includes(`priceFilter`) ? (
                      <HiOutlineChevronDown size={20} />
                    ) : (
                      <HiOutlineChevronRight size={20} />
                    )}
                  </h4>
                  <Collapse in={toggleFilterMenu.includes(`priceFilter`)}>
                    <div className="px-4">
                      <div className="pt-4">
                        <Slider
                          className="custom-slider"
                          range={{ draggableTrack: true }}
                          defaultValue={[100, 60000]}
                          min={100}
                          max={150000}
                          onAfterChange={(newPriceRange) => setPriceRange(newPriceRange)}
                        />
                        <h4 className="themeColor mt-4">৳100 - ৳150,000</h4>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>

              <div className="bgLight2 rounded py-4 border mb-5">
                <div className="categoryFilterArea">
                  <h4
                    className="themeColorSecondaryDark fs-16 d-flex justify-content-between align-items-center px-4 mb-0"
                    role="button"
                    onClick={() => handleFilterMenu(`categoryFilter`)}
                    aria-expanded={toggleFilterMenu.includes(`categoryFilter`)}
                  >
                    Filter By Categories
                    {toggleFilterMenu.includes(`categoryFilter`) ? (
                      <HiOutlineChevronDown size={20} />
                    ) : (
                      <HiOutlineChevronRight size={20} />
                    )}
                  </h4>
                  <Collapse in={toggleFilterMenu.includes(`categoryFilter`)}>
                    <ul className="catMenuList rounded-0 text-capitalize pt-4">
                      {categories.map((category) => (
                        <li className="px-4 py-12" key={category?._id}>
                          {filteredSubcategories(category?._id).length > 0 ? (
                            <>
                              <div className="d-flex align-items-center gap-3">
                                <Form.Check
                                  type="checkbox"
                                  id={`catId${category?._id}`}
                                  key={category?._id}
                                  onChange={(e) =>
                                    handleCategoryCheck(e.target.checked, category?._id)
                                  }
                                />
                                <div
                                  role="button"
                                  className="d-flex justify-content-between align-items-center w-100"
                                  onClick={() => handleToggle(`catId${category?._id}`)}
                                  aria-expanded={open.includes(`catId${category?._id}`)}
                                >
                                  <span className="d-flex align-items-center">
                                    {category?.icon ? (
                                      <img
                                        className="me-3"
                                        style={{ width: "1.2rem" }}
                                        src={category.icon}
                                        alt=""
                                      />
                                    ) : (
                                      <CategoryIcon
                                        style={{ width: "1.7rem" }}
                                        className="me-2"
                                      />
                                    )}

                                    {category?.name}
                                  </span>
                                  {open.includes(`catId${category?._id}`) ? (
                                    <AiOutlineMinus className="themeColor" />
                                  ) : (
                                    <AiOutlinePlus className="themeColor" />
                                  )}
                                </div>
                              </div>
                              <Collapse in={open.includes(`catId${category?._id}`)}>
                                <div>
                                  <ul className="pt-2 ps-5">
                                    {filteredSubcategories(category?._id).map(
                                      (subcategory) => (
                                        <li
                                          className="py-2 d-flex align-items-center gap-3"
                                          key={subcategory?._id}
                                        >
                                          <Form.Check
                                            type="checkbox"
                                            key={subcategory?._id}
                                            onChange={(e) =>
                                              handleSubcategoryCheck(
                                                e.target.checked,
                                                subcategory?._id
                                              )
                                            }
                                          />
                                          <span>{subcategory.name}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </Collapse>
                            </>
                          ) : (
                            <div className="d-flex align-items-center gap-3">
                              <Form.Check
                                type="checkbox"
                                id={`catId${category?._id}`}
                                onChange={(e) =>
                                  handleCategoryCheck(e.target.checked, category?._id)
                                }
                              />
                              <div
                                role="button"
                                className="d-flex justify-content-between align-items-center w-100"
                              >
                                <span className="d-flex align-items-center">
                                  {category?.icon ? (
                                    <img
                                      className="me-3"
                                      style={{ width: "1.2rem" }}
                                      src={category.icon}
                                      alt=""
                                    />
                                  ) : (
                                    <CategoryIcon
                                      style={{ width: "1.7rem" }}
                                      className="me-2"
                                    />
                                  )}

                                  {category?.name}
                                </span>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row gx-4 gx-xxl-5 gy-5">
                <div className="col-12">
                  <div className="bgLight2 p-4 rounded border">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span
                          type="button"
                          className="fs-3 hoverableOp d-flex align-items-center gap-3"
                          onClick={() => toggleView()}
                        >
                          {isGridView ? (
                            <>
                              <FaBars size={20} /> List View
                            </>
                          ) : (
                            <>
                              <RiLayoutGridFill size={20} /> Grid View
                            </>
                          )}
                        </span>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <span className="text-nowrap">Sort by</span>
                        <Form.Select className="fs-4" onChange={sortProducts}>
                          <option value="dateNewToOld">Date, new to old</option>
                          <option value="dateOldToNew">Date, old to new</option>
                          <option value="featured">Featured</option>
                          <option value="bestSelling">Best selling</option>
                          <option value="priceLowToHight">Price, low to hight</option>
                          <option value="priceHighToLow">Price, hight to low</option>
                          <option value="alphabetically_A_Z">Alphabetically, A-Z</option>
                          <option value="alphabetically_Z_A">Alphabetically, Z-A</option>
                        </Form.Select>
                      </div>
                    </div>
                  </div>
                </div>

                {products.length > 0 ? (
                  isGridView ? (
                    products?.map((product) => (
                      <div className="col-sm-6 col-md-4" key={product?._id}>
                        <ProductCard product={product} />
                      </div>
                    ))
                  ) : (
                    products?.map((product) => (
                      <div className="col-12" key={product?._id}>
                        <ProductCard product={product} isTrending={true} listView={true} />
                      </div>
                    ))
                  )
                ) : (
                  <div className="col-12 text-center">
                    <img
                      className="w-auto"
                      style={{ maxHeight: "60rem" }}
                      src={NoProductImg}
                      alt="img"
                    />
                  </div>
                )}
                <div className="col-12 text-center mt-40">
                  <button
                    className="btn btnPrimary fs-3 px-50 py-3"
                    disabled={
                      isLoading ? isLoading : products.length === total ? true : isLoading
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {isLoading
                      ? "Loading..."
                      : products.length === total
                      ? "No More Products"
                      : "Load More"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
