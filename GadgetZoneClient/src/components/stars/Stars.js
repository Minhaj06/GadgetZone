import { AiFillStar } from "react-icons/ai";

// #FDCC0D

const Stars = ({ size }) => {
  return (
    <>
      <AiFillStar size={size} style={{ color: "#f59c3a" }} />
      <AiFillStar size={size} style={{ color: "#f59c3a" }} />
      <AiFillStar size={size} style={{ color: "#f59c3a" }} />
      <AiFillStar size={size} style={{ color: "#f59c3a" }} />
      <AiFillStar size={size} style={{ color: "#f59c3a" }} />
    </>
  );
};

export default Stars;
