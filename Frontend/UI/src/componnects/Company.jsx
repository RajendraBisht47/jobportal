import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../store/userDetails";
import { CiEdit } from "react-icons/ci";
import "./Company.css";
function Comapany() {
  const navigate = useNavigate();
  const { user, company, setCompanyDetail } = useContext(Context);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [companyName, setComapanyName] = useState(company?.name || "");
  const [description, setdescription] = useState(company?.description || "");
  const [website, setwebsite] = useState(company?.website || "");
  const [location, setlocation] = useState(company?.location || "");

  const [logo, setlogo] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setlogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendData = async (event) => {
    event.preventDefault();

    const companyData = {
      companyName,
      description,
      website,
      location,
      logo,
    };

    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8000/api/v1/company/update/${company._id}`,
      {
        method: "PUT",
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
      const updatedCompany = JSON.parse(JSON.stringify(company));
      updatedCompany.name === companyName;
      updatedCompany.description === description;
      updatedCompany.website === website;
      updatedCompany.location === location;
      await setCompanyDetail(updatedCompany);
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
        <div className="profileContainer  m-3">
          <div className="shadow   bg-body-tertiary rounded-circle ">
            <div className="profileImage">
              <img className="image" src={logo || company?.logo || ""} alt="" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="file" className="form-label m-2">
              <CiEdit /> Edit Logo
            </label>

            <input
              required
              type="file"
              className="form-control phofileimage"
              id="file"
              onChange={handleFileChange}
            />
          </div>
        </div>

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
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Comapany;
