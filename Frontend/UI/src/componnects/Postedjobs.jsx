import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

function Postedjobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8000/api/v1/job/getadminjobs",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

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
    <table className="table  mt-4">
      <thead>
        <tr className="table-primary">
          <th scope="col">Job Tittle</th>
          <th scope="col">Applied At</th>
          <th scope="col">No of applicants</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job._id} className={"table-info"}>
            <td>
              <Link
                state={{ job: job }}
                to={"/jobPage"}
                type="button"
                className="btn btn-primary"
              >
                {job.title}
              </Link>
            </td>
            <td>{job.createdAt}</td>
            <td>
              {job.application.length}
              <Link
                style={{ marginLeft: "10px" }}
                state={{ job: job }}
                to={"/getapplicants"}
                type="button"
                className="btn btn-primary"
              >
                Check
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Postedjobs;
