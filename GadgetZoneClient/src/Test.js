import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import TopNav from "./components/nav/TopNav";
import Menu from "./components/nav/Menu";
import SearchNav from "./components/nav/SearchNav";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Shop from "./pages/Shop";
import PrivateRoute from "./components/routes/PrivateRoute";
import UserDashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Secret from "./pages/Secret";
import AdminRoute from "./components/routes/AdminRoute";
import AdminCategory from "./pages/admin/Category";
import Search from "./pages/Search";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Toaster /> {/* Place the Toaster component here */}
        <Routes>
          <Route element={<PublicRoutes />} />
          <Route element={<DashboardRoutes />} />
          <Route path="*" element={<PageNotFound />} replace />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

const PublicRoutes = () => {
  return (
    <Fragment>
      <TopNav />
      <Menu />
      <SearchNav />
      <Outlet />
    </Fragment>
  );
};

const DashboardRoutes = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

const UserDashboardRoutes = () => {
  return <Route path="/dashboard/user" element={<UserDashboard />} />;
};

const AdminDashboardRoutes = () => {
  return <Route path="/dashboard/admin" element={<AdminDashboard />} />;
};

const AdminCategoryRoutes = () => {
  return <Route path="/dashboard/admin/category" element={<AdminCategory />} />;
};

const AppRoutes = () => {
  return (
    <Fragment>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/search" element={<Search />} />
      <Route path="/dashboard" element={<PrivateRoute />} />
      <Route path="/dashboard/user" element={<UserDashboardRoutes />} />
      <Route path="/dashboard/user/secret" element={<Secret />} />
      {/* Add more routes for user dashboard */}
      <Route path="/dashboard/admin" element={<AdminRoute />} />
      <Route path="/dashboard/admin" element={<AdminDashboardRoutes />} />
      <Route path="/dashboard/admin/category" element={<AdminCategoryRoutes />} />
      {/* Add more routes for admin dashboard */}
    </Fragment>
  );
};

export default App;
