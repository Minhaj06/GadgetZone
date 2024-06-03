import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { auth, setAuth } = useAuth();

  // state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  // hooks
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      const { firstName, lastName, email, address } = auth.user;

      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/profile", {
        firstName,
        lastName,
        password,
        address,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });

        // Local Storage Update
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data;

        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated");
        if (location.state) {
          navigate(location.state);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-4">
      <form onSubmit={handleSubmit}>
        <div className="row g-4 g-xl-5">
          <div className="col-6">
            <label className="form-label text-uppercase fw-semibold fs-4 mb-3">
              First Name
            </label>
            <input
              type="text"
              className="form-control customInput fs-3"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="col-6">
            <label className="form-label text-uppercase fw-semibold fs-4 mb-3">
              Last Name
            </label>
            <input
              type="text"
              className="form-control customInput fs-3"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="form-label text-uppercase fw-semibold fs-4 mb-3">Email</label>
            <input
              type="text"
              className="form-control customInput fs-3"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </div>
          <div className="col-6">
            <label className="form-label text-uppercase fw-semibold fs-4 mb-3">Password</label>
            <input
              type="password"
              className="form-control customInput fs-3"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label text-uppercase fw-semibold fs-4 mb-3">Address</label>
            <textarea
              className="form-control customInput fs-3"
              rows="5"
              placeholder="Type your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btnPrimary px-4 py-3 rounded-2">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

const UpdatePassword = () => {
  return (
    <div className="row row-cols-2 g-4">
      <div className="col-6">
        <h1>Update Password</h1>
      </div>
    </div>
  );
};

const Profile = () => {
  const items = [
    {
      key: "1",
      label: <h3>Profile Info</h3>,
      children: <UpdateProfile />,
    },
    {
      key: "2",
      label: <h3>Password</h3>,
      children: <UpdatePassword />,
    },
  ];

  return (
    <div>
      <div className="mb-5">
        <h2 className="display-4 fw-medium">Manage Profile</h2>
      </div>

      <Tabs defaultActiveKey="1" items={items} size="large" />
    </div>
  );
};

export default Profile;
