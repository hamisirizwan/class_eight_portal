import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function AllPupils() {
  const [pupils, setPupils] = useState([]);

  const handleDelete = async (id) => {
    axios
      .delete(`/pupil/${id}`)
      .then((resp) => {
        console.log(resp);
        alert("pupil deleted successfully");
        fetchpupils();
      })
      .catch((err) => console.log(err.message));
  };

  const fetchpupils = useCallback(async () => {
    try {
      const resp = await axios.get("/pupils");
      setPupils(resp.data.data);
      console.log(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchpupils();
  }, [fetchpupils]);

  return (
    <div className="container-fluid">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5vh",
        }}
      >
        <h5>ALL PUPILS</h5>
      </div>
      <div className="table-responsive ps-4 pe-4">
        <table className="table table-bordered">
          <caption>list of pupils</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Index No</th>
              <th scope="col">Contact</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {pupils.map((pupil) => (
              <tr key={pupil._id}>
                <td>{pupil.name}</td>
                <td>{pupil.index_no}</td>
                <td>{pupil.contact}</td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(pupil._id)}
                    style={{
                      height: "6vh",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllPupils;
