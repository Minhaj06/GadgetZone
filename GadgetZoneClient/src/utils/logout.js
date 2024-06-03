const logout = (auth, setAuth, navigate) => {
  setAuth({ ...auth, user: null, token: "" });
  localStorage.removeItem("auth");
  navigate("/login");
};

export default logout;
