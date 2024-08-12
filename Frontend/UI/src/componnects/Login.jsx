import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/userDetails";

function Login() {
  const { setUserDetail, user } = useContext(Context);

  const [message, setMeassage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const sendData = async (event) => {
    event.preventDefault();

    const userData = {
      email: event.target.email.value,
      password: event.target.password.value,
      role: event.target.role.value,
    };

    const response = await fetch("http://localhost:8000/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const res = await response.json();
    setMeassage(res.message);
    setSuccess(res.success);

    if (res.success) {
      setUserDetail(res.user);
      navigate("/");
    }
  };

  return (
    <div>
      {message !== "" ? (
        <div className={`alert alert-danger`} role="alert">
          {message}
        </div>
      ) : null}

      <form className="m-5" onSubmit={sendData}>
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
            Login
          </button>
        </div>
        <div className="mt-3 buttonContainer">
          <p className="form-check-label ">
            Click
            <Link style={{ marginLeft: "6px" }} to="/register" className="link">
              register
            </Link>
            to create account
          </p>
        </div>
      </form>
    </div>
  );
}
export default Login;
