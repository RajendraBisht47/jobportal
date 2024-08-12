import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
function CompanyPage() {
  const locations = useLocation();
  const { company } = locations.state || {};

  const [getcompany, setcompany] = useState({});
  useEffect(() => {
    setcompany(company);
  }, []);

  return (
    <div className="m-5">
      <div className="profileContainer m-5">
        <div className="profileImage">
          <img src={company?.logo || ""} alt="" />
        </div>
      </div>
      <div className="mb-3">
        <h5>Company Name</h5>
        <p>{getcompany.name}</p>
      </div>

      <div className="mb-3">
        <h5>Description</h5>
        <p>{getcompany.description}</p>
      </div>

      <div className="mb-3">
        <h5>Location</h5>
        <p>{getcompany.location}</p>
      </div>

      <div className="mb-3">
        <h5>Web Site Link</h5>
        <p>{getcompany.website}</p>
      </div>
    </div>
  );
}
export default CompanyPage;
