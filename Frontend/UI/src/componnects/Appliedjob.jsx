import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

function AppliedJob() {
  const [applications, setapplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://jobportal-fmlh.onrender.com/api/v1/application/get",
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
        if (res.success) {
          setapplications(res.applications);
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);
  return (
    <table className="table  mt-4">
      <thead>
        <tr className="table-primary">
          <th scope="col">Job Tittle</th>
          <th scope="col">Applied At</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr
            key={application._id}
            className={
              application.status === "pending"
                ? "table-warning"
                : application.status === "rejected"
                ? "table-danger"
                : "table-success"
            }
          >
            <td>
              <Link
                state={{ job: application.job }}
                to={"/jobPage"}
                type="button"
                className="btn btn-primary"
              >
                {application.job.title}
              </Link>
            </td>
            <td>{application.createdAt}</td>
            <td>{application.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default AppliedJob;
