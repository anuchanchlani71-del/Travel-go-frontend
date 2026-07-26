import React from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">

      <Link to="/superadmin/dashboard" className="brand-link">
        <span className="brand-text font-weight-light">
          Super Admin
        </span>
      </Link>

      <div className="sidebar">

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
          >

            <li className="nav-item">
              <Link
                to="/superadmin/dashboard"
                className="nav-link"
              >
                <p>Dashboard</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/superadmin/users"
                className="nav-link"
              >
                <p>Users</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/superadmin/sellers"
                className="nav-link"
              >
                <p>Sellers</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/superadmin/train-bookings"
                className="nav-link"
              >
                <p>Train Bookings</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/superadmin/cab-bookings"
                className="nav-link"
              >
                <p>Cab Bookings</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/superadmin/bus-bookings"
                className="nav-link"
              >
                <p>Bus Bookings</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/superadmin/flight-bookings"
                className="nav-link"
              >
                <p>Flight Bookings</p>
              </Link>
            </li>


                        <li className="nav-item">
  <Link
    to="/superadmin/sliders"
    className="nav-link"
  >
   
    <p>Slider Manager</p>
  </Link>
</li>

          </ul>
        </nav>

      </div>

    </aside>
  );
}

export default SideMenu;