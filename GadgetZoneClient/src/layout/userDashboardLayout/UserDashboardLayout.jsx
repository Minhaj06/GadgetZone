import React from "react";
import UserMenu from "../../components/nav/UserMenu";
import { Outlet } from "react-router-dom";

const UserDashboardLayout = () => {
  return (
    <section className="themeColorSecondaryDark" style={{ margin: "7rem 0" }}>
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-3 sticky-lg-top" style={{ height: "fit-content" }}>
            <div className="h-100">
              <UserMenu />
            </div>
          </div>
          <div className="col-lg-9 sticky-lg-top" style={{ height: "fit-content" }}>
            <div className="h-100 px-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboardLayout;
