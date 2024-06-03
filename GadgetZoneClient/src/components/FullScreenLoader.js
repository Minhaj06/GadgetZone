import React, { Fragment, useEffect } from "react";
import { useAuth } from "../context/auth";

const FullScreenLoader = () => {
  const { isLoading, setIsLoading } = useAuth();

  return (
    <Fragment>
      <div className={`LoadingOverlay${isLoading ? "" : " d-none"}`}>
        <div className="Line-Progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default FullScreenLoader;
