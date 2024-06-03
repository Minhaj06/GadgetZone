import React, { useEffect } from "react";
import AllRoutes from "./AllRoutes";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import FullScreenLoader from "./components/FullScreenLoader";
import { SkeletonTheme } from "react-loading-skeleton";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff6b6b",
          colorSecondary: "#794afa",
          colorSecondaryDark: "#453c5c",
        },
      }}
    >
      <SkeletonTheme color="#cac9c9" baseColor="#dad9d9" highlightColor="#e6e6e6">
        <FullScreenLoader />
        <Toaster />
        <AllRoutes></AllRoutes>
      </SkeletonTheme>
    </ConfigProvider>
  );
};

export default App;
