import React from "react";

const StatusBadge = ({ status, statusText, bordered, rounded, fullWidth }) => {
  return (
    <>
      {status.toLowerCase() === "not processed" && (
        <span
          className={`badge bg-dark text-dark border-dark bg-opacity-25 py-2 ${
            rounded ? "rounded-pill" : ""
          } ${bordered ? "border" : "py-8"} ${fullWidth ? "d-block py-8" : ""}`}
        >
          {statusText || status}
        </span>
      )}
      {status.toLowerCase() === "processing" && (
        <span
          className={`badge bg-warning text-dark border-warning bg-opacity-25 py-2 ${
            rounded ? "rounded-pill" : ""
          } ${bordered ? "border" : "py-8"} ${fullWidth ? "d-block py-8" : ""}`}
        >
          {statusText || status}
        </span>
      )}
      {status.toLowerCase() === "shipped" && (
        <span
          className={`badge bg-primary text-primary border-primary bg-opacity-25 py-2 ${
            rounded ? "rounded-pill" : ""
          } ${bordered ? "border" : "py-8"} ${fullWidth ? "d-block py-8" : ""}`}
        >
          {statusText || status}
        </span>
      )}
      {status.toLowerCase() === "delivered" && (
        <span
          className={`badge bg-success border-success text-success bg-opacity-25 py-2 ${
            rounded ? "rounded-pill" : ""
          } ${bordered ? "border" : "py-8"} ${fullWidth ? "d-block py-8" : ""}`}
        >
          {statusText || status}
        </span>
      )}

      {status.toLowerCase() === "cancelled" && (
        <span
          className={`badge bg-danger text-danger border-danger bg-opacity-25 py-2 ${
            rounded ? "rounded-pill" : ""
          } ${bordered ? "border" : "py-8"} ${fullWidth ? "d-block py-8" : ""}`}
        >
          {statusText || status}
        </span>
      )}

      {status.toLowerCase() === "primary" && (
        <span
          className={`badge bg-primary text-primary border-primary bg-opacity-25 py-2 ${
            rounded ? "rounded-pill" : ""
          } ${bordered ? "border" : "py-8"} ${fullWidth ? "d-block py-8" : ""}`}
        >
          {statusText || status}
        </span>
      )}
      {status.toLowerCase() === "success" && (
        <span
          className={`badge bg-success border-success text-success bg-opacity-25 py-2 ${
            rounded ? "rounded-pill" : ""
          } ${bordered ? "border" : "py-8"} ${fullWidth ? "d-block py-8" : ""}`}
        >
          {statusText || status}
        </span>
      )}

      {status.toLowerCase() === "warning" && (
        <span
          className={`badge bg-warning text-dark border-warning bg-opacity-25 py-2 ${
            rounded ? "rounded-pill" : ""
          } ${bordered ? "border" : "py-8"} ${fullWidth ? "d-block py-8" : ""}`}
        >
          {statusText || status}
        </span>
      )}

      {status.toLowerCase() === "failed" && (
        <span
          className={`badge bg-danger text-danger border-danger bg-opacity-25 py-2 ${
            rounded ? "rounded-pill" : ""
          } ${bordered ? "border" : "py-8"} ${fullWidth ? "d-block py-8" : ""}`}
        >
          {statusText || status}
        </span>
      )}
    </>
  );
};

export default StatusBadge;
