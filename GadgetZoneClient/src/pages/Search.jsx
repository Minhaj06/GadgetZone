import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/cards/productCard/ProductCard";
import NoProductImg from "../assets/images/noData.png";
import Form from "react-bootstrap/Form";
import { RiLayoutGridFill } from "react-icons/ri";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../context/auth";

const Search = () => {
  const { setIsLoading } = useAuth();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [isGridView, setIsGridView] = useState(true); // List/Grid View

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  useEffect(() => {
    if (keyword || category) {
      loadSearchedProducts();
    }
  }, [keyword, category]);

  const loadSearchedProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/products/search", {
        params: {
          keyword: keyword,
          category: category,
        },
      });

      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
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
      <section>
        <div className="container position-relative">
          <div className="row g-5">
            <div className="col-lg-12">
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
                      <div className="col-sm-6 col-md-4 col-xl-3" key={product?._id}>
                        <ProductCard product={product} />
                      </div>
                    ))
                  ) : (
                    products?.map((product) => (
                      <div className="col-12" key={product?._id}>
                        <ProductCard
                          product={product}
                          isTrending={true}
                          listView={true}
                          fullWidth={true}
                        />
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
              </div>
            </div>

            <div className="col-lg-3">
              <div className="bgLight2 h-100"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
