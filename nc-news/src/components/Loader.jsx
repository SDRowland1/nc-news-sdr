import React from "react";
import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div className="Loader">
      <h3>
        Loading, please wait...
        <ReactLoading type="cylon" color="black" height={667} width={375} />
      </h3>
    </div>
  );
};

export default Loader;
