import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useInsertionEffect, useState } from "react";

function Register() {
  const [message, setMeassage] = useState("");
  const [success, setSuccess] = useState(false);
  const nevigate = useNavigate();
  const sendFormData = async (event) => {
    event.preventDefault();

    const userData = {
      fullname: event.target.fullname.value,
      phoneNumber: event.target.phoneNumber.value,
      email: event.target.email.value,
      password: event.target.password.value,
      role: event.target.role.value,
    };
    //sending data to api
    const response = await fetch("https://jobportal-fmlh.onrender.com/api/v1/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const res = await response.json();
    setMeassage(res.message);
    setSuccess(res.success);
    if (res.success) {
      nevigate("/login");
    }
  };

  return (
    <div>
      {message !== "" ? (
        <div
          className={`alert alert-${success ? "success" : "danger"}`}
          role="alert"
        >
          {message}
        </div>
      ) : null}
      <form className="m-5" onSubmit={sendFormData}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Full Name
          </label>
          <input
            name="fullname"
            required
            type="text"
            className="form-control"
            id="fullname"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            required
            type="tel"
            className="form-control"
            pattern="[0-9]{10}"
            maxLength="10"
            id="phoneNumber"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            required
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            required
            type="password"
            className="form-control"
            id="password"
          />
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="role1"
            value="student"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Student
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="role2"
            value="recruiter"
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Recruiter
          </label>
        </div>

        <div className="mt-4 buttonContainer">
          <button type="submit" className="btn btn-primary ">
            Register
          </button>
        </div>
        <div className="mt-3 buttonContainer">
          <p className="form-check-label ">
            <Link to="/login" className="link">
              longin
            </Link>
            if user account already created
          </p>
        </div>
      </form>
    </div>
  );
}
export default Register;
