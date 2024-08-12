import { useState } from "react";
import { Link } from "react-router-dom";
("react");
function Job({ job }) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <div className="imageContainer">
          <img
            src={job?.company?.logo || ""}
            className="object-fit-none border rounded"
            alt="..."
          />
        </div>

        <div className="card-body">
          <h5>{job.title}</h5>
          <span
            className="d-inline-block text-truncate"
            style={{ maxWidth: "80%" }}
          >
            {job.description}
          </span>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <Link
                state={{ job }}
                to={"/jobPage"}
                className="btn btn-primary position-relative"
              >
                {" "}
                Apply
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {job.application.length}
                </span>
              </Link>
            </div>
            <small className="text-body-secondary">{job.updatedAt}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;
