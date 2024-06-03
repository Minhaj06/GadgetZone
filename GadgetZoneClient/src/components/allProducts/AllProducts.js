import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../cards/productCard/ProductCard";
import { useAuth } from "../../context/auth";

const AllProducts = () => {
  const { isLoading, setIsLoading } = useAuth();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

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
      const { data } = await axios.get(`list-products/${page}/${perPage}`);
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

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

  return (
    <>
      <section style={{ margin: "7rem 0" }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-12">
              <h1 className="text-capitalize pb-3 border-bottom mb-5">
                Explore Our Range{" "}
                <sub className="fs-14 fw-normal themeColorSecondaryDark">{`(${products.length} out of ${total})`}</sub>
              </h1>
            </div>

            <div className="col-12">
              <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3 g-sm-4 g-xxl-5">
                {products?.map((product) => (
                  <div className="col" key={product?._id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 text-center mt-40">
              <button
                className="btn btnPrimary fs-3 px-50 py-3"
                disabled={isLoading ? isLoading : products.length === total ? true : isLoading}
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
      </section>
    </>
  );
};

export default AllProducts;
