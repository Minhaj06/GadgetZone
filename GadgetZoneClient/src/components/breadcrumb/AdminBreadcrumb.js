import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

const AdminBreadcrumb = () => {
  const location = useLocation();

  // Extract the pathname from the location object
  const { pathname } = location;

  // Split the pathname into individual segments
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <>
      <div className="my-5 text-capitalize">
        <h1>
          {pathSegments[pathSegments.length - 1] === "admin"
            ? pathSegments[pathSegments.length - 2]
            : pathSegments[pathSegments.length - 1]}
        </h1>
        <Breadcrumb>
          {pathSegments.map((segment, index) => (
            <Breadcrumb.Item key={index}>{segment}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    </>
  );
};

export default AdminBreadcrumb;
