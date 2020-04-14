import React from "react";

const User = (props) => {
  return (
    <div className="User">
      <p>user logged in: {props.username}</p>
    </div>
  );
};

export default User;
