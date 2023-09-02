import React from "react";
import { Link } from "react-router-dom";
import ButtonCard from "./ButtonCard";

function ExamCard(props) {
  return (
    <div className="card mb-3 rounded">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">exam code</h6>

        {/* <a href="#" className="card-link">
        view exam
      </a> */}
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={`/results/${props.id}`} style={{ textDecoration: "none" }}>
            <ButtonCard text="view exam" />
          </Link>
          <button className="btn btn-danger">delete</button>
        </div> */}
        <Link to={`/results/${props.id}`} style={{ textDecoration: "none" }}>
          <ButtonCard text="view exam" />
        </Link>
      </div>
    </div>
  );
}

export default ExamCard;
