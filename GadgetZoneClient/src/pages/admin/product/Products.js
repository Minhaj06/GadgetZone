import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import moment from "moment";
import ImageLazyLoad from "../../../utils/ImageLazyLoad";
import { BiSearch } from "react-icons/bi";
import { AiFillEdit, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { BsFillEyeFill, BsFillTrashFill, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const { auth, setAuth, setIsLoading } = useAuth();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className="d-sm-flex justify-content-between align-items-center gap-5 mb-4">
        <div className="textColor text-nowrap d-flex align-items-center gap-1 mb-4 mb-sm-0">
          <span>Show</span>
          <select
            defaultValue={10}
            name=""
            id=""
            className="brand-color border rounded-4"
            style={{ padding: "0.6rem" }}
            onChange={(e) => console.log(e.target.value)}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={40}>40</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>

          <span>entries</span>
        </div>

        <div className="input-group flex-nowrap" style={{ maxWidth: "40rem" }}>
          <input
            style={{ padding: "0.6rem 1rem" }}
            type="search"
            className="form-control shadow-none"
            placeholder="Search..."
          />
          <button type="submit" className="btn btnPrimary input-group-text px-3">
            <BiSearch size={20} />
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table style={{ minWidth: "100rem" }} className="table table-striped align-middle">
          <thead>
            <tr className="border-bottom border-dark border-1">
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product?._id}>
                <th>{index + 1}</th>
                <td>
                  <ImageLazyLoad
                    style={{ width: "10rem", height: "7rem" }}
                    className="img-thumbnail"
                    src={`${process.env.REACT_APP_API}/product/photo/${product?._id}`}
                    alt={product?.name}
                  />
                </td>
                <td>{product?.name}</td>
                <td>${product?.price}</td>
                <td>
                  <Link
                    to={`${process.env.REACT_APP_AdminBaseURL}/category/${product?.category?.slug}`}
                    className="badge rounded-pill bg-danger bg-opacity-50 text-capitalize border border-danger border-opacity-75 text-dark hoverSecondary"
                  >
                    {product?.category?.name}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`${process.env.REACT_APP_AdminBaseURL}/subcategory/${product?.subcategory?.slug}`}
                    className="badge rounded-pill bg-primary bg-opacity-75 text-capitalize border border-primary"
                  >
                    {product?.subcategory?.name}
                  </Link>
                </td>
                <td>{moment(product?.createdAt).format("DD/ MM/ YYYY")}</td>
                <td>{moment(product?.updatedAt).format("DD/ MM/ YYYY")}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => navigate(`/product/${product?.slug}`)}
                      className="btn btnPrimary btn-lg"
                    >
                      <BsFillEyeFill size={18} />
                    </button>
                    <button className="btn btn-warning btn-lg">
                      <AiFillEdit size={18} />
                    </button>
                    <button className="btn btn-danger btn-lg">
                      <BsFillTrashFill size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
