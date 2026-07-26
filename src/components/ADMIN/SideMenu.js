import { Link } from "react-router-dom";

function SideMenu() {




  const businessType = localStorage.getItem("businessType");

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          gap: "10px",
          fontSize: "25px",
          fontWeight: "bold",
          color: "#0d6efd", // Primary Blue
          marginTop: "20px",
        }}
      >
        ✈ TravelGo
      </div>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="Admin Image" />
          </div>
          <div className="info">
            <a href="#" className="d-block">Admin</a>
          </div>
        </div>
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
                            with font-awesome or any other icon font library */}
            <li className="nav-item menu-open">
              <Link to={'/admin/dashboard'} className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                </p>
              </Link>
            </li>
            {/* <li className="nav-item menu-open">
                        <Link to={'/admin/Trains'} className="nav-link active">
                            <i className="nav-icon fas fa-tachometer-alt" />
                            
                            <p>
                            Train manager
                            </p>
                        </Link>
                        </li>


                         <li className="nav-item menu-open">
                        <Link to={'/admin/Cabs'} className="nav-link active">
                            <i className="nav-icon fas fa-tachometer-alt" />
                            
                            <p>
                            Cabs manager
                            </p>
                        </Link>
                        </li> */}

            {
              businessType === "Cab" && (
                <li className="nav-item menu-open">
                  <Link to="/admin/cabs" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Cab Manager</p>
                  </Link>

                    <Link to="/admin/cab-bookings" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Bookings</p>
                  </Link>
                </li>
              )
            }



            {
              businessType === "Flight" && (
                <li className="nav-item menu-open">
                  <Link to="/admin/flight" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>flight Manager</p>
                  </Link>
                   <Link to="/admin/flight-booking" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Booking</p>
                  </Link>
                </li>
              )
            }
            {
              businessType === "Bus" && (
                <li className="nav-item menu-open">
                  <Link to="/admin/bus" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Bus Manager</p>
                  </Link>

                   <Link to="/admin/bus-booking" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Booking</p>
                  </Link>
                </li>
              )
            }

            {
              businessType === "Train" && (
                <li className="nav-item menu-open">
                  <Link to="/admin/Trains" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Train Manager</p>
                  </Link>


                   <Link to="/admin/train-bookings" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Bookings</p>
                  </Link>
                </li>
              )
            }






          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
export default SideMenu;