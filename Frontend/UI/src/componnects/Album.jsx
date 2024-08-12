import "./Album.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Job from "./Job";
function Album() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://jobportal-fmlh.onrender.com/api/v1/job/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const res = await response.json();
        setJobs(res.jobs);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <div className="serchBarContainer border-bottom">
        <div className="navbar  mt-5 mb-5" style={{ display: "flex" }}>
          <div className="container-fluid">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Job Type"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="center m-2">
        {jobs.length == 0 ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : null}
      </div>
      <div className="album py-5 ">
        <div className="container">
          <div
            className="row row-cols-1 
          row-cols-sm-2 row-cols-md-3 g-3"
          >
            {jobs.map((job) => (
              <Job key={job.updatedAt} job={job}></Job>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Album;
