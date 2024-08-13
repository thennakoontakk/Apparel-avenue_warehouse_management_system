import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      {/* Example product link */}
      <Link to="/product/662cee272237dfc70e3e8d6c">Product 123</Link>
    </div>
  );
};

export default Home;
