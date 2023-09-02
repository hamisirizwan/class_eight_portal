import React, { useState } from "react";
// import { useNavigate } from "react-router";
import axios from "axios";

function AddExamModal() {
  // const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //write logic to save
    axios
      .post("/exam", { title: name })
      .then((response) => {
        setLoading(false);
        setSuccess(true);

        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              ADD EXAM
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            {!success ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Exam
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                  <div id="emailHelp" className="form-text">
                    The exam name should be include exam and term.
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "please wait..." : "save"}
                </button>
              </form>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h5 className="text-success">EXAM SAVED SUCCESSFULLY</h5>
                <h6 className="text-success">you can close the modal</h6>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              disabled={loading}
              onClick={() => {
                setSuccess(false);
                setName("");
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddExamModal;
