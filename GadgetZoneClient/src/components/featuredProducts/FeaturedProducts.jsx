import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../cards/productCard/ProductCard";
import { useAuth } from "../../context/auth";

const FeaturedProducts = () => {
  const { setIsLoading } = useAuth();

  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`featured-products`);
      setFeaturedProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <section style={{ margin: "7rem 0" }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-12">
            <h1 className="text-capitalize pb-3 border-bottom mb-5">Featured products</h1>
          </div>

          <div className="col-12">
            <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3 g-sm-4 g-xxl-5">
              {featuredProducts?.map((product) => (
                <div className="col" key={product?._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
