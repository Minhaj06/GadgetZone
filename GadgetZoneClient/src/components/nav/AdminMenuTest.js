import React from "react";
import { Menu } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const admin = "/dashboard/admin";

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  };

  const items = [
    getItem("Option 1", "1", <UserOutlined />),
    getItem("Option 2", "2", <LaptopOutlined />),
    getItem("User", "sub1", <NotificationOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
  ];

  // const menuItems = [
  //   {
  //     key: "1",
  //     icon: <UserOutlined />,
  //     label: "Dashboard",
  //     link: admin + "dashboard",
  //   },
  //   {
  //     key: "2",
  //     icon: <LaptopOutlined />,
  //     label: "Category",
  //     items: [
  //       {
  //         key: "2-1",
  //         label: "Create Category",
  //         link: admin + "category/create",
  //       },
  //       {
  //         key: "2-2",
  //         label: "Manage Category",
  //         link: admin + "category/manage",
  //       },
  //       {
  //         key: "2-3",
  //         label: "Subcategory",
  //         items: [
  //           {
  //             key: "2-3-1",
  //             label: "Create Subcategory",
  //             link: admin + "category/subcategory/create",
  //           },
  //           {
  //             key: "2-3-2",
  //             label: "Manage Subcategory",
  //             link: admin + "category/subcategory/manage",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     key: "3",
  //     icon: <NotificationOutlined />,
  //     label: "Product",
  //     items: [
  //       {
  //         key: "3-1",
  //         label: "Create Product",
  //         link: admin + "/product/create",
  //       },
  //       {
  //         key: "3-2",
  //         label: "All Products",
  //         link: admin + "/products",
  //       },
  //     ],
  //   },
  // ];

  return (
    // <Menu
    //   className="flex-grow-1"
    //   theme="dark"
    //   mode="inline"
    //   defaultSelectedKeys={["1"]}
    //   defaultOpenKeys={["2-3"]} // Open the "Subcategory" submenu by default
    // >
    //   {renderMenuItems(menuItems)}
    // </Menu>
    <Menu
      className="flex-grow-1"
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["2-3"]} // Open the "Subcategory" submenu by default
      items={items}
    />
  );
};

export default AdminMenu;
