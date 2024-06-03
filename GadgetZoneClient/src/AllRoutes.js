import React, { Fragment, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LazyLoader from "./components/LazyLoader";
// import Calculate from "./pages/Calculate";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const Calculate = lazy(() => import("./pages/Calculate"));
const Profile = lazy(() => import("./pages/user/Profile"));
const Orders = lazy(() => import("./pages/user/Orders"));
const Transactions = lazy(() => import("./pages/user/Transactions"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const Invoices = lazy(() => import("./pages/user/Invoices"));

const PrivateRoute = lazy(() => import("./components/routes/PrivateRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Secret = lazy(() => import("./pages/Secret"));
const Search = lazy(() => import("./pages/Search"));
const PublicLayout = lazy(() => import("./layout/publicLayout/PublicLayout"));
const UserDashboardLayout = lazy(() =>
  import("./layout/userDashboardLayout/UserDashboardLayout")
);
const AdminLayout = lazy(() => import("./layout/adminLayout/AdminLayout"));
const ProductDetails = lazy(() => import("./pages/productDetails/ProductDetails"));

const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const Category = lazy(() => import("./pages/admin/Category"));
const Product = lazy(() => import("./pages/admin/product/Product"));
const Products = lazy(() => import("./pages/admin/product/Products"));

const AllRoutes = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<LazyLoader />}>
          <Routes>
            {/* Public Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route element={<PrivateRoute />}>
                <Route path="/checkout" element={<Checkout />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/checkout/payment" element={<Payment />} />
              </Route>
              <Route path="/calculate" element={<Calculate />} />
              <Route path="/search" element={<Search />} />
              <Route path="/product/:slug" element={<ProductDetails />} />

              {/* Private Route */}
              <Route path="/dashboard/user" element={<PrivateRoute />}>
                <Route element={<UserDashboardLayout />}>
                  <Route path="" element={<UserDashboard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="transactions" element={<Transactions />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="invoices" element={<Invoices />} />
                  <Route path="secret" element={<Secret />} />
                </Route>
              </Route>
            </Route>

            {/* Admin Layout */}
            <Route path="/dashboard/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="" element={<AdminDashboard />} />
                <Route path="category" element={<Category />} />

                <Route path="product" element={<Product />} />
                <Route path="products" element={<Products />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
};

export default AllRoutes;
