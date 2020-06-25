import React from "react";

const Like = props => {
  let className = "fa fa-heart";
  if (!props.isLiked) className += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      className={className}
      aria-hidden="true"
      onClick = {props.onClick}
    ></i>
  );
};

export default Like;
