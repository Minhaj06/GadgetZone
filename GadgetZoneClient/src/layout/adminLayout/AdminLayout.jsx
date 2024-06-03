import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme } from "antd";

import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Loading from "../../components/routes/Loading";
import { Footer } from "antd/es/layout/layout";
import AdminBreadcrumb from "../../components/breadcrumb/AdminBreadcrumb";
import AdminMenu from "../../components/nav/AdminMenu";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  // state
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, colorPrimary, colorSecondary, colorSecondaryDark },
  } = theme.useToken();

  const handleWindowResize = () => {
    if (window.innerWidth < 576) {
      setSiderWidth("100%");
    } else if (window.innerWidth > 1399) {
      setSiderWidth("280px");
    } else if (window.innerWidth > 991) {
      setSiderWidth("250px");
    } else {
      setSiderWidth("200px");
    }
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const [siderWidth, setSiderWidth] = useState("250px");

  const items1 = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
        width={siderWidth}
        style={{
          maxWidth: "100%",
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="d-flex flex-column">
          <div
            className="demo-logo-vertical d-flex justify-content-between align-items-center py-4 mb-3"
            style={{ marginInline: "4px" }}
          >
            <Link className="d-block" to="/">
              <img
                className="w-100"
                src="https://minhaj06.github.io/AlifaOnline-OkkhoTech/images/logo.svg"
                alt="Logo"
              />
            </Link>

            <Button
              className="bgTheme p-0 d-flex justify-content-center align-items-center d-sm-none"
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 30,
                height: 30,
              }}
            />
          </div>

          <AdminMenu />
        </div>
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 0 : siderWidth,
          transition: "0.3s",
          // marginLeft: siderWidth,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "fixed",
            top: 0,
            left: collapsed ? 0 : siderWidth,
            width: collapsed ? "100%" : `calc(100% - ${siderWidth})`,
            transition: "0.3s",
            zIndex: 1020,
          }}
          className="shadow"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: "64px 16px 0 16px",
            overflow: "initial",
          }}
        >
          <AdminBreadcrumb />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer
          style={{ textAlign: "center", background: colorBgContainer, marginTop: "24px" }}
        >
          © {new Date().getFullYear()} Your Company Name. All Rights Reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
