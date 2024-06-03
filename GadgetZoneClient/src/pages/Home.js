import React from "react";
// import Jumbotron from "../components/cards/Jumbotron";
import HomeCarousel from "../components/homeCarousel/HomeCarousel";
import { useAuth } from "../context/auth";
import TrendingProducts from "../components/trendingProducts/TrendingProducts";
import FeaturedProducts from "../components/featuredProducts/FeaturedProducts";
import AllProducts from "../components/allProducts/AllProducts";
import SubscribeSection from "../components/subscribeSection/SubscribeSection";

const Home = () => {
  const { auth, setAuth } = useAuth();

  return (
    <>
      <HomeCarousel />
      <TrendingProducts />
      <FeaturedProducts />
      <AllProducts />
      <SubscribeSection />
    </>
  );
};

export default Home;
