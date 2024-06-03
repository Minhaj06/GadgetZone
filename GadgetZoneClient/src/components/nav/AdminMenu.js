import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { BiCategory, BiAddToQueue } from "react-icons/bi";
import { MdManageSearch } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { FaBoxOpen } from "react-icons/fa";

const AdminMenu = () => {
  const admin = "/dashboard/admin";
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    const pathToKeyMapping = {
      [admin]: "1",
      [admin + "/category"]: "2",
      [admin + "/categories"]: "3",
      [admin + "/subcategory"]: "4",
      [admin + "/subcategories"]: "5",
      [admin + "/brand"]: "6",
      [admin + "/brand"]: "7",
      [admin + "/product"]: "8",
      [admin + "/products"]: "9",
    };
    const currentPathKey = pathToKeyMapping[location.pathname];

    if (currentPathKey) {
      setSelectedKeys([currentPathKey]);

      const parentKey = getParentKey(currentPathKey);
      if (parentKey) {
        setOpenKeys([parentKey]);
      }
    }
  }, [location.pathname]);

  const getParentKey = (key) => {
    // Define a mapping of submenu keys to their parent keys
    const submenuParentMapping = {
      2: "sub1",
      3: "sub1",
      4: "sub2",
      5: "sub2",
      6: "sub3",
      7: "sub3",
      8: "sub4",
      9: "sub4",
    };
    return submenuParentMapping[key];
  };

  const getItem = (label, key, icon, children, onClick) => {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    };
  };

  const items = [
    getItem("Dashboard", "1", <UserOutlined />, null, () => {
      navigate(admin);
    }),
    getItem("Category", "sub1", <BiCategory size={18} />, [
      getItem("Create Category", "2", <BiAddToQueue size={18} />, null, () => {
        navigate(admin + "/category");
      }),
      getItem("All Categories", "3", <MdManageSearch size={18} />, null, () => {
        navigate(admin + "/categories");
      }),

      getItem("Subcategory", "sub2", <BiCategory size={18} />, [
        getItem("Create Subcategory", "4", <BiAddToQueue size={18} />, null, () => {
          navigate(admin + "/subcategory");
        }),
        getItem("All Subcategories", "5", <MdManageSearch size={18} />, null, () => {
          navigate(admin + "/subcategories");
        }),
      ]),
    ]),
    getItem("Brand", "sub3", <SiBrandfolder size={18} />, [
      getItem("Create Brand", "6", <BiAddToQueue size={18} />, null, () => {
        navigate(admin + "/brand");
      }),
      getItem("All Brands", "7", <MdManageSearch size={18} />, null, () => {
        navigate(admin + "/brands");
      }),
    ]),
    getItem("Product", "sub4", <FaBoxOpen size={18} />, [
      getItem("Create Product", "8", <BiAddToQueue size={18} />, null, () => {
        navigate(admin + "/product");
      }),
      getItem("All Products", "9", <MdManageSearch size={18} />, null, () => {
        navigate(admin + "/products");
      }),
    ]),
  ];

  return (
    <Menu
      className="flex-grow-1"
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      items={items}
    />
  );
};

export default AdminMenu;
