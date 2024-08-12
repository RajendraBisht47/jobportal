import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../store/userDetails";
import { LiaRupeeSignSolid } from "react-icons/lia";
function Post() {
  const navigate = useNavigate();
  const { user, company } = useContext(Context);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [requirement, setrequirement] = useState("");
  const [salary, setsalary] = useState("");
  const [location, setlocation] = useState("");
  const [jobType, setjobType] = useState("");
  const [experienceLevel, setexperienceLevel] = useState("");
  const [position, setposition] = useState("");

  const sendData = async (event) => {
    event.preventDefault();
    const jobData = {
      title,
      description,
      requirement,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId: company._id,
    };

    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8000/api/v1/job/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(jobData),
    });

    const res = await response.json();

    setMessage(res.message);
    setSuccess(res.success);
    if (res.success) {
      setsalary(0);
      setdescription("");
      settitle("");
      setrequirement("");
      setjobType("");
      setlocation("");
      setexperienceLevel(0);
      setposition(0);
    }
  };
  return (
    <div>
      {message !== "" ? (
        <div
          className={`mb-3 alert alert-${success ? "success" : "danger"}`}
          role="alert"
        >
          {message}
        </div>
      ) : null}

      <form className="m-5" onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Job Tittle
          </label>
          <input
            value={title}
            name="title"
            required
            type="text"
            className="form-control"
            id="title"
            onChange={(event) => {
              settitle(event.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            value={description}
            name="description"
            required
            type="text"
            className="form-control"
            id="description"
            onChange={(event) => {
              setdescription(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="requirement" className="form-label">
            Requirement
          </label>
          <input
            value={requirement}
            name="requirement"
            required
            type="text"
            className="form-control"
            id="requirement"
            onChange={(event) => {
              setrequirement(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobType" className="form-label">
            JobType
          </label>
          <input
            value={jobType}
            name="jobType"
            required
            type="text"
            className="form-control"
            id="jobType"
            onChange={(event) => {
              setjobType(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Loacation
          </label>
          <input
            value={location}
            name="location"
            required
            type="text"
            className="form-control"
            id="location"
            onChange={(event) => {
              setlocation(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="experienceLevel" className="form-label">
            Required Experience
          </label>
          <input
            value={experienceLevel}
            name="experienceLevel"
            required
            type="number"
            className="form-control"
            id="experienceLevel"
            onChange={(event) => {
              setexperienceLevel(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label m-1">
            Salary
          </label>
          <LiaRupeeSignSolid />
          <input
            value={salary}
            name="salary"
            required
            type="number"
            className="form-control"
            id="salary"
            onChange={(event) => {
              setsalary(event.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Positions
          </label>
          <input
            value={position}
            name="position"
            required
            type="number"
            className="form-control"
            id="position"
            onChange={(event) => {
              setposition(event.target.value);
            }}
          />
        </div>
        <div className="mt-4 buttonContainer">
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Post;
