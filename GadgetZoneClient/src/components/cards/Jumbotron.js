import React from "react";

const Jumbotron = ({ title, subtitle = "Welcome to my first react ecommerce" }) => {
  return (
    <div
      className="container-fluid jumbotron bg-info d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "20rem" }}
    >
      <div className="row">
        <div className="col">
          <h1 className="fw-bold display-3 text-danger">{title}</h1>
          <p className="lead fw-semibold">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
