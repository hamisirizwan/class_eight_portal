import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router";

function ResultsPage() {
  const params = useParams();
  const id = params.id;
  const [results, setResults] = useState([]);
  const [performance, setPerformance] = useState({
    math: "",
    eng: "",
    kis: "",
    sci: "",
    sst: "",
  });

  const handleChange = (e) => {
    setPerformance({ ...performance, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    if (parseInt(performance.math) < 100 || isNaN(parseInt(performance.math))) {
      return false;
    }
    if (performance.eng > 100 || isNaN(performance.eng)) {
      return false;
    }
    if (performance.kis > 100 || isNaN(performance.kis)) {
      return false;
    }
    if (performance.sci > 100 || isNaN(performance.sci)) {
      return false;
    }
    if (performance.sst > 100 || isNaN(performance.sst)) {
      return false;
    }
  };
  const handleSave = async (id) => {
    // e.preventDefault();
    // const valid = validateFields();
    // alert(valid);
    axios
      .put(`/result/${id}`, performance)
      .then((resp) => {
        setPerformance({
          math: "",
          eng: "",
          kis: "",
          sci: "",
          sst: "",
        });
        alert(resp.data.message);
        fetchresults();
      })
      .catch((err) => {
        alert("an error occurred");
        console.log(err.message);
      });
  };

  const sendExamResults = async () => {
    alert(id);
    axios.get(`/sendresult/${id}`).then((resp) => {
      console.log(resp.data);
      alert("results sent successfully");
    });
  };
  const fetchresults = useCallback(async () => {
    try {
      const results = await axios.get(`/result/uncomplete/${id}`);
      setResults(results.data.results);
      //   console.log(results.data.results);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchresults();
  }, [fetchresults]);
  return (
    <div className="container-fluid">
      {/* top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5vh",
        }}
      >
        <h5>UPLOAD RESULTS</h5>
      </div>

      {results.length < 1 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20vh",
          }}
        >
          <button className="btn btn-primary" onClick={() => sendExamResults()}>
            SEND RESULTS
          </button>
        </div>
      ) : (
        <div className="table-responsive ps-4 pe-4">
          <table className="table table-bordered">
            <caption>list of pupils</caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Math</th>
                <th scope="col">Eng</th>
                <th scope="col">Kis</th>
                <th scope="col">Sci</th>
                <th scope="col">sst</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id}>
                  <td>{result.pupil_id.name}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="math"
                      onChange={handleChange}
                      value={performance.math}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="eng"
                      onChange={handleChange}
                      value={performance.eng}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="kis"
                      onChange={handleChange}
                      value={performance.kis}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="sci"
                      onChange={handleChange}
                      value={performance.sci}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="sst"
                      onChange={handleChange}
                      value={performance.sst}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSave(result._id)}
                      style={{
                        height: "6vh",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ResultsPage;
