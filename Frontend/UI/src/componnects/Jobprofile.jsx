import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function Jobprofile() {
  const [getapplicant, setapplicant] = useState({});
  const location = useLocation();
  const { applicant } = location.state || {};
  useEffect(() => {
    setapplicant(applicant);
  }, []);

  return (
    <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
      <div className="mt-5">
        <div className="profileContainer  m-3">
          <div className="shadow   bg-body-tertiary rounded-circle ">
            <div className="profileImage">
              <img
                className="image"
                src={applicant.profile.profilePhoto || "/userlogo.png"}
                alt=""
              />
            </div>
          </div>
          <div className="mt-3">
            <p>FullName : {applicant.fullname}</p>
          </div>
          <div className="mt-3">
            <p>Email : {applicant.email}</p>
          </div>
          <div className="mt-3">
            <p>PhoneNumber : {applicant.phoneNumber}</p>
          </div>
          <div className="mt-3">
            <p>Skills : {applicant.profile.skills}</p>
          </div>
          <div className="mt-3">
            <p>Bio : {applicant.profile.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobprofile;
