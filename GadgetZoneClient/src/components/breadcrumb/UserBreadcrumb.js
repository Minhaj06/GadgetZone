import { HomeOutlined } from "@ant-design/icons";
import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const UserBreadcrumb = ({ items }) => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <Link to="/">
        <HomeOutlined /> Home
      </Link>
    </Breadcrumb.Item>
    {items.map((item, index) =>
      item?.link ? (
        <Breadcrumb.Item key={index} onClick={item?.onClick}>
          <Link to={item.link}>{item?.title}</Link>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item key={index} onClick={() => item?.onClick}>
          {item?.title}
        </Breadcrumb.Item>
      )
    )}
  </Breadcrumb>
);

export default UserBreadcrumb;
