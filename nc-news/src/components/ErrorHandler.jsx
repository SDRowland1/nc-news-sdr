import React from "react";

const ErrorHandler = (props) => {
  console.dir(props.error);

  if (props.error) {
    const { data, status } = props.error.response;
    return (
      <h2>
        Status: {status}, {data}
      </h2>
    );
  } else {
    return <h2>Status: 404, Path not found</h2>;
  }
};

export default ErrorHandler;
