import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonCard from "../components/ButtonCard";
import ExamCard from "../components/ExamCard";
// import { Link } from "react-router-dom";
import AddExamModal from "../components/AddExamModal";
import AddPupilModal from "../components/AddPupilModal";
import { Link } from "react-router-dom";
import currentDate from "../utilities/generateDate";

//on page loads, get all exams and renders them

function ExamsView() {
  const [exams, setExams] = useState([]);

  //fetch all exams
  useEffect(() => {
    // console.log("am running");
    axios
      .get("/exam")
      .then((response) => {
        // console.log(response.data.data);
        setExams(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      {/* topbar */}
      <div
        className="px-4 pt-4"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h4>WELCOME TO CLASS 8 2023</h4>
        <h4>{currentDate()}</h4>
      </div>

      <div
        className="pt-4 px-4"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="d-flex" style={{ justifyContent: "space-around" }}>
          <ButtonCard
            text="ADD EXAMS"
            customBStoggle="modal"
            customBStarget="#staticBackdrop"
          />

          <ButtonCard
            text="ADD PUPIL"
            customBStoggle="modal"
            customBStarget="#pupilModal"
          />

          <Link to="/pupils" style={{ textDecoration: "none", color: "black" }}>
            <ButtonCard text="ALL PUPILS" />
          </Link>
        </div>

        <div className="pt-4 px-4">
          {exams.map((exam) => (
            <div key={exam._id}>
              <ExamCard title={exam.title} id={exam._id} />
            </div>
          ))}
        </div>
      </div>

      {/* modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <AddExamModal />
      </div>

      {/* pupil modal */}
      <div
        className="modal fade"
        id="pupilModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <AddPupilModal />
      </div>
    </div>
  );
}

export default ExamsView;
