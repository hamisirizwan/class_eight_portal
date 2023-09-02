import React from "react";

function ButtonCard(props) {
  return (
    <div
      className="p-1"
      style={{
        border: "2px solid #adadc9",
        backgroundColor: "#63c5da",
        borderRadius: "20px",
      }}
      data-bs-toggle={props.customBStoggle}
      data-bs-target={props.customBStarget}
    >
      <h6 style={{ textAlign: "center" }}>{props.text}</h6>
    </div>
  );
}

export default ButtonCard;
