import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.removeItem("superadminToken");
        localStorage.removeItem("superadminId");
        localStorage.removeItem("superadminRole");

        navigate("/superadmin/login", {
          replace: true
        });
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("superadminToken");

    if (!token) {
      navigate("/superadmin/login", {
        replace: true
      });
    }
  }, [navigate]);

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      
      <ul className="navbar-nav">

        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="#"
            role="button"
          >
            <i className="fas fa-bars" />
          </a>
        </li>

        <li className="nav-item d-none d-sm-inline-block">
          <Link
            to="/superadmin/dashboard"
            className="nav-link"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item d-none d-sm-inline-block">
          <Link
            to="/superadmin/my-profile"
            className="nav-link"
          >
            My Profile
          </Link>
        </li>

        <li className="nav-item d-none d-sm-inline-block">
          <a
            href="#"
            className="nav-link"
            onClick={handleLogout}
          >
            Logout
          </a>
        </li>

      </ul>

    </nav>
  );
}

export default Header;