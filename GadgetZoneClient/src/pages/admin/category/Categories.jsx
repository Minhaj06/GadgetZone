import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import moment from "moment";
import ImageLazyLoad from "../../../utils/ImageLazyLoad";
import { BiSearch } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { BsFillEyeFill, BsFillTrashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import StatusBadge from "../../../components/statusBadge/StatusBadge";
import Skeleton from "react-loading-skeleton";
import { Popconfirm } from "antd";
import Swal from "sweetalert2";
import { ReactComponent as CategoryIcon } from "../../../assets/icons/categoryIcon.svg";

const Categories = () => {
  const { isLoading, setIsLoading } = useAuth();

  // Hooks
  const navigate = useNavigate();

  // States
  const [categories, setCategories] = useState([]);

  // Load all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/categories");
        console.log("Categories => ", data);
        setCategories(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {};

  return (
    <div>
      <div className="d-sm-flex justify-content-between align-items-center gap-5 mb-4">
        <div className="textColor text-nowrap d-flex align-items-center gap-1 mb-4 mb-sm-0">
          <span>Show</span>
          <select
            defaultValue={10}
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
        <table style={{ minWidth: "95rem" }} className="table table-striped align-middle">
          <thead>
            <tr className="border-bottom border-dark border-1">
              <th>#</th>
              <th>Icon</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length ? (
              categories.map((category, index) => (
                <tr key={category?._id}>
                  <th>{index + 1}</th>
                  <td>
                    {/* <ImageLazyLoad
                      style={{ width: "10rem", height: "7rem" }}
                      className="img-thumbnail"
                      src={`${process.env.REACT_APP_API}/category/photo/${category?._id}`}
                      alt={category?.name}
                    /> */}
                    {category?.icon ? (
                      <img
                        style={{ width: "3.3rem", height: "3.3rem" }}
                        src={category.icon}
                        alt=""
                      />
                    ) : (
                      <CategoryIcon
                        style={{ width: "3.3rem", height: "3.3rem" }}
                        className="me-2"
                      />
                    )}
                  </td>
                  <td>{category?.name}</td>
                  <td>{moment(category?.createdAt).format("DD/ MM/ YYYY")}</td>
                  <td>{moment(category?.updatedAt).format("DD/ MM/ YYYY")}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        onClick={() => navigate(`/category/${category?.slug}`)}
                        className="btn btnPrimary btn-lg"
                      >
                        <BsFillEyeFill size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`../category/${category?.slug}`)}
                        className="btn btn-warning btn-lg"
                      >
                        <AiFillEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category?._id)}
                        className="btn btn-danger btn-lg"
                      >
                        <BsFillTrashFill size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : isLoading ? (
              [0, 1, 2, 3, 4, 5].map((item) => (
                <tr key={item}>
                  <td>
                    <Skeleton width={20} height={20} />
                  </td>
                  <td>
                    <Skeleton width={100} height={70} />
                  </td>
                  <td>
                    <Skeleton width={150} />
                    <Skeleton width={120} />
                  </td>
                  <td>
                    <Skeleton width={70} />
                  </td>
                  <td>
                    <Skeleton borderRadius={1000} width={110} bordered />
                  </td>
                  <td>
                    <Skeleton borderRadius={1000} width={80} />
                  </td>

                  <td>
                    <Skeleton width={120} />
                  </td>
                  <td>
                    <Skeleton width={120} />
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Skeleton borderRadius={5} width={35} height={35} />
                      <Skeleton borderRadius={5} width={35} height={35} />
                      <Skeleton borderRadius={5} width={35} height={35} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-50">
                  <div className="text-center py-50">
                    <h2 className="h1">No categories available</h2>
                    <p>It seems like you haven't created any categories yet.</p>
                    <Link to="/cart" className="btn btnDark py-3 px-5 mt-4">
                      Create a Category
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
