import { useAuth } from "../../context/auth";

const UserDashboard = () => {
  // context
  const { auth, setAuth } = useAuth();

  return (
    <>
      <div>
        <h1>Dashboard</h1>
      </div>
    </>
  );
};

export default UserDashboard;
