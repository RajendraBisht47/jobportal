import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../store/userDetails";
function Navbar() {
  const navigate = useNavigate();

  const { setUserDetail, user, company, setCompanyDetail } =
    useContext(Context);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch("https://jobportal-fmlh.onrender.com/", {
        credentials: "include",
      });
      const res = await response.json();
      if (res.success) {
        setUserDetail(res.user);
        if (res?.user?.role === "recruiter") {
          const response1 = await fetch(
            "https://jobportal-fmlh.onrender.com/api/v1/company/get",
            {
              credentials: "include",
            }
          );
          const res1 = await response1.json();
          if (res1.success) {
            // console.log(res1.companies[0]);
            if (res1.companies[0] === undefined) {
              await setCompanyDetail({});
            } else {
              await setCompanyDetail(res1.companies[0]);
            }
          }
        }
      }
    };

    if (Object.keys(user).length === 0 && !user.email) {
      fetchUserDetails();
    }
  }, []);

  const logout = async () => {
    const response = await fetch("https://jobportal-fmlh.onrender.com/api/v1/user/logout", {
      method: "POST",
      credentials: "include",
    });

    const res = await response.json();

    if (res.success) {
      setUserDetail({});
      navigate("/login");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          JobPortal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ "--bs-scroll-height": "100px" }}
          >
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            {user?.role === "recruiter" && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/postjob"
                >
                  Post Job
                </Link>
              </li>
            )}

            {/* if user logged in */}
            {user !== null && Object.keys(user).length !== 0 ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.fullname}
                  </a>
                  <ul className="dropdown-menu">
                    {user.role === "student" ? (
                      <>
                        {" "}
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            Edit Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/appliedjobs">
                            Applied Jobs
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        {company === null ||
                        Object.keys(company).length === 0 ? (
                          <Link className="dropdown-item" to="/registerCompany">
                            Register Company
                          </Link>
                        ) : (
                          <Link className="dropdown-item" to="/company">
                            Edit Company
                          </Link>
                        )}

                        <Link className="dropdown-item" to="/postedjobs">
                          Posted Jobs
                        </Link>
                      </li>
                    )}

                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}

            {/* id user is not logged In */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
