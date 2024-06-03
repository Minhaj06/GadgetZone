import LoadingGIF from "../../assets/images/loading.gif";

import React from "react";

const Loading = () => {
  // // state
  // const [count, setCount] = useState(3);

  // // hooks
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((currentCount) => --currentCount);
  //   }, 1000);

  //   // Redirect once count is equal to 0
  //   count === 0 &&
  //     navigate(`/${path}`, {
  //       state: location.pathname,
  //     });

  //   // cleanup
  //   return () => clearInterval(interval);
  // }, [count]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <img src={LoadingGIF} alt="Loading" style={{ width: "400px" }} />
    </div>
  );
};

export default Loading;
