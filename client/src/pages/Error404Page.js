import React from "react";

function Error404Page() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>404</h1>

        <h1>PAGE NOT FOUND</h1>
      </div>
    </div>
  );
}

export default Error404Page;
