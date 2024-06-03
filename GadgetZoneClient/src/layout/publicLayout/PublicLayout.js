import { Fragment, useEffect, useState } from "react";
import TopNav from "../../components/nav/TopNav";
import SearchNav from "../../components/nav/searchNav/SearchNav";
import { Outlet } from "react-router-dom";
import MainMenu from "../../components/nav/MainMenu";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useAuth } from "../../context/auth";

const PublicLayout = () => {
  const { setIsLoading } = useAuth();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/categories`);
        setCategories(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/subcategories`);
        setSubcategories(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Fragment>
      <TopNav />
      <MainMenu categories={categories} subcategories={subcategories} />
      <SearchNav categories={categories} subcategories={subcategories} />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default PublicLayout;
