import React from "react";
import "./styles.css";

const Container = (props) => {
  const { children, className } = props;

  return <div className={`container ${className}`}>{children}</div>;
};

export default Container;
