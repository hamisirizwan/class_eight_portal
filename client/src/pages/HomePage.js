import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Link to="/home">
        <button type="button" className="btn btn-success">
          ENTER CLASS 8 PORTAL
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
