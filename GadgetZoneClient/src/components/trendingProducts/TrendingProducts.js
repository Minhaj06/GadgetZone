import React, { useEffect, useState } from "react";
import "./trendingProducts.css";
import axios from "axios";
import ProductCard from "../cards/productCard/ProductCard";
import OfferCard from "../cards/offerCard/OfferCard";
import { useAuth } from "../../context/auth";

const TrendingProducts = () => {
  const { setIsLoading } = useAuth();

  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    loadTrendingProducts();
  }, []);

  const loadTrendingProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`trending-products`);
      setTrendingProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const products = [
    {
      _id: "64f08b5ea48bf2e08587ebd1",
      name: "Web template",
      slug: "web-template",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      price: 6100,
      rating: 434,
      photo:
        "https://mern-ecom-server.vercel.app/api/v1/product/photo/64fc9ea63a045402c10358a9",
      offerEndDate: "2023-12-28T20:45:13.578Z",
    },
    {
      _id: "64fca5603a045402c1035c1f",
      name: "Web Template 2",
      slug: "web-template-2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      price: 6100,
      rating: 263,
      photo:
        "https://mern-ecom-server.vercel.app/api/v1/product/photo/64fc9ea63a045402c10358a9",
      offerEndDate: "2023-10-09T16:57:38.702Z",
    },
  ];

  return (
    <section style={{ margin: "7rem 0" }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-12">
            <h1 className="text-capitalize pb-3 border-bottom mb-5">Trending products</h1>
          </div>

          <div className="col-12">
            <div className="row g-5">
              <div className="col-lg-4">
                {products.slice(0, 1).map((product) => (
                  <OfferCard product={product} key={product?._id} />
                ))}
              </div>
              <div className="col-lg-8">
                <div className="row g-5">
                  {trendingProducts?.map((product) => (
                    <div className="col-sm-6" key={product?._id}>
                      <ProductCard product={product} isTrending={true} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
