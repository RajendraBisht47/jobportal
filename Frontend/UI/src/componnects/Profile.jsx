import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../store/userDetails";
import "./Profile.css";
import { CiEdit } from "react-icons/ci";

function Profile() {
  const navigate = useNavigate();
  const { setUserDetail, user } = useContext(Context);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [fullname, setFullname] = useState(user.fullname || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [email, setEmail] = useState(user.email || "");
  const [skills, setSkills] = useState(user?.profile?.skills.join(", ") || "");
  const [bio, setBio] = useState(user?.profile?.bio || "");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendData = async (event) => {
    event.preventDefault();

    const userData = {
      fullname,
      phoneNumber,
      email,
      skills,
      bio,
      profilePhoto,
    };

    const token = localStorage.getItem("token");

    const response = await fetch(
      "https://jobportal-fmlh.onrender.com/api/v1/user/profile/update",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(userData),
      }
    );

    const res = await response.json();

    setMessage(res.message);
    setSuccess(res.success);
    if (res.success) {
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
      <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
        <form className="mt-5" onSubmit={sendData}>
          <div className="profileContainer  m-3">
            <div className="shadow   bg-body-tertiary rounded-circle ">
              <div className="profileImage">
                <img
                  className="image"
                  src={
                    profilePhoto ||
                    user?.profile?.profilePhoto ||
                    "/userlogo.png"
                  }
                  alt=""
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="file" className="form-label m-2">
                <CiEdit /> Edit Profile
              </label>

              <input
                style={{ display: "none" }}
                type="file"
                className="form-control"
                id="file"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Name
            </label>
            <input
              value={fullname}
              name="fullname"
              required
              type="text"
              className="form-control"
              id="fullname"
              onChange={(event) => setFullname(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              value={email}
              name="email"
              required
              type="email"
              className="form-control"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              value={phoneNumber}
              name="phoneNumber"
              required
              type="tel"
              className="form-control"
              pattern="[0-9]{10}"
              maxLength="10"
              id="phoneNumber"
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="skills" className="form-label">
              Skills
            </label>
            <input
              value={skills}
              name="skills"
              required
              type="text"
              className="form-control"
              id="skills"
              placeholder="Please separate all skills with a comma"
              onChange={(event) => setSkills(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              required
              value={bio}
              name="bio"
              className="form-control"
              id="bio"
              rows="3"
              onChange={(event) => setBio(event.target.value)}
            ></textarea>
          </div>

          <div className="mt-4 buttonContainer">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
