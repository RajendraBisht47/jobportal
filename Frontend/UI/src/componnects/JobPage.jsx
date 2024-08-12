import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
function JobPage() {
  const locations = useLocation();
  const { job } = locations.state || {};

  const [getjob, setjob] = useState({});

  useEffect(() => {
    setjob(job);
  }, []);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const sendData = async (event) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://jobportal-fmlh.onrender.com/api/v1/application/apply/${getjob._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    const res = await response.json();

    setMessage(res.message);
    setSuccess(res.success);
  };

  return (
    <>
      {message !== "" ? (
        <div
          className={`mb-3 alert alert-${success ? "success" : "danger"}`}
          role="alert"
        >
          {message}
        </div>
      ) : null}

      <div className="m-5">
        <div className="mb-3">
          <h5>Job Tittle</h5>
          <p>{getjob.title}</p>
        </div>

        <div className="mb-3">
          <h5>Description</h5>
          <p>{getjob.description}</p>
        </div>

        <div className="mb-3">
          <h5>Requirement</h5>
          <p>{getjob.requirement}</p>
        </div>

        <div className="mb-3">
          <h5>Salay</h5>
          <p>{getjob.salary}</p>
        </div>

        <div className="mb-3">
          <h5>Job Tittle</h5>
          <p>{getjob.title}</p>
        </div>

        <div className="mb-3">
          <h5>Location</h5>
          <p>{getjob.location}</p>
        </div>

        <div className="mb-3">
          <h5>Job Type</h5>
          <p>{getjob.jobType}</p>
        </div>

        <div className="mb-3">
          <h5>Experience required</h5>
          <p>{getjob.experienceLevel}</p>
        </div>

        <div className="mb-3">
          <h5>Positions</h5>
          <p>{getjob.position}</p>
        </div>

        <div className="mt-4 buttonContainer">
          <button type="button" className="btn btn-primary" onClick={sendData}>
            Apply
          </button>
        </div>
        <div className="mt-3 buttonContainer">
          <p className="form-check-label ">
            <Link
              to="/companypage"
              className="link"
              state={{ company: getjob.company }}
            >
              About
            </Link>
            company
          </p>
        </div>
      </div>
    </>
  );
}

export default JobPage;
