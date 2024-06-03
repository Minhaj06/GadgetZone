import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import TopNav from "./components/nav/TopNav";
import Menu from "./components/nav/Menu";
// import TestMenu from "./components/nav/TestMenu";

import SearchNav from "./components/nav/SearchNav";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Shop from "./pages/Shop";
import PrivateRoute from "./components/routes/PrivateRoute";
import UserDashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import PageNotFouond from "./pages/PageNotFouond";
import Secret from "./pages/Secret";
import AdminRoute from "./components/routes/AdminRoute";
import AdminCategory from "./pages/admin/Category";
import Search from "./pages/Search";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <TopNav />
        {/* <TestMenu /> */}
        <Menu />
        <SearchNav />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/search" element={<Search />}></Route>

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="secret" element={<Secret />} />
            <Route path="profile" element={""} />
            <Route path="orders" element={""} />
            <Route path="transactions" element={""} />
          </Route>

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/category" element={<AdminCategory />} />
            {/* <Route path="admin/product" element={<AdminProduct />} /> */}
          </Route>

          <Route path="*" element={<PageNotFouond />} replace />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
