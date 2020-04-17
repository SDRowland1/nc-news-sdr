import React from "react";
import { Link } from "@reach/router";

const Home = () => {
  return (
    <div className="Home">
      <Link className="HomeLink" to="/">
        <p>Home</p>
      </Link>
    </div>
  );
};

export default Home;
