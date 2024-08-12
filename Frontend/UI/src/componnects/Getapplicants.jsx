import { Link, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import "./Getapplicants.css";
function Getapplicants() {
  const [message, setMeassage] = useState("");
  const [success, setSuccess] = useState(false);
  // status update
  const setStatus = async (event, id) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://jobportal-fmlh.onrender.com/api/v1/application/status/${id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ status: event.target.status.value }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();
      setSuccess(res.success);
      if (res.success) {
        setMeassage(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   end
  const [applicants, setapplicants] = useState([]);
  const location = useLocation();

  const { job } = location.state || {};
  useEffect(() => {
    const getApplicantsbyid = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://jobportal-fmlh.onrender.com/api/v1/application/${job._id}/applicants`,
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
          setapplicants(res.job.application);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getApplicantsbyid();
  }, []);

  return (
    <>
      {message !== "" ? (
        <div
          className={`alert alert-${success ? "success" : "danger"}`}
          role="alert"
        >
          {message}
        </div>
      ) : null}
      <table className="table  mt-4">
        <thead>
          <tr className="table-primary">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant._id} className={"table-info"}>
              <td>
                <Link
                  state={{ applicant: applicant.applicant }}
                  to={"/jobprofile"}
                  type="button"
                  className="btn btn-primary"
                >
                  {applicant.applicant.fullname}
                </Link>
              </td>
              <td>{applicant.applicant.email}</td>
              <td className="tabledata">
                {/* {edit form} */}
                {applicant.status}
                <form
                  className="d-flex"
                  onSubmit={(event) => {
                    setStatus(event, applicant._id);
                  }}
                >
                  <select
                    name="status"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="accepted">Accept</option>
                    <option value="rejected">Reject</option>
                  </select>
                  <button type="submit" className="btn btn-primary">
                    Edit
                  </button>
                </form>

                {/* { end} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Getapplicants;
