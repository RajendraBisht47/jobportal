import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../store/userDetails";
import { CiEdit } from "react-icons/ci";
function RegisterCompany() {
  const navigate = useNavigate();
  const { company, setCompanyDetail } = useContext(Context);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [companyName, setComapanyName] = useState("");
  const [description, setdescription] = useState("");
  const [website, setwebsite] = useState("");
  const [location, setlocation] = useState("");

  const sendData = async (event) => {
    event.preventDefault();

    const companyData = {
      companyName,
      description,
      website,
      location,
    };

    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://jobportal-fmlh.onrender.com/api/v1/company/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(companyData),
      }
    );

    const res = await response.json();

    setMessage(res.message);
    setSuccess(res.success);
    if (res.success) {
      await setCompanyDetail(res.company);
      navigate("/");
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
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            value={companyName}
            name="companyName"
            required
            type="text"
            className="form-control"
            id="companyName"
            onChange={(event) => {
              setComapanyName(event.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            required
            value={description}
            name="description"
            className="form-control"
            id="bio"
            rows="3"
            onChange={(event) => setdescription(event.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            value={location}
            name="location"
            required
            type="text"
            className="form-control"
            id="companyName"
            onChange={(event) => {
              setlocation(event.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="website" className="form-label">
            Website
          </label>
          <input
            value={website}
            name="website"
            required
            type="text"
            className="form-control"
            id="companyName"
            onChange={(event) => {
              setwebsite(event.target.value);
            }}
          />
        </div>

        <div className="mt-4 buttonContainer">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCompany;
