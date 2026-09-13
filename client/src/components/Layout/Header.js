import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Header = () => {
  const [loginUser, setloginUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data } = await api.get("/api/v1/user/current-user");
        setloginUser(data.user);
      } catch (error) {
        setloginUser(null);
      }
    };

    getCurrentUser();
  }, []);

  const logoutHandler = async () => {
    try {
      await api.get("/api/v1/user/logout", {
        withCredentials: true, // cookie clear hone ke liye IMPORTANT
      });


      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light shadow-sm py-2">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
              Extrack
            </Link>
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              {loginUser && (
                <li className="nav-item text-muted fw-semibold ">
                  <span className="text-dark">{loginUser.fullName}</span>
                </li>
              )}
              <li className="nav-item">
                <button
                  onClick={logoutHandler}
                  className="btn btn-sm btn-outline-secondary px-3"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
