import React from "react";

const User = (props) => {
  return (
    <div className="User">
      <h5>user: {props.username}</h5>
    </div>
  );
};

export default User;
