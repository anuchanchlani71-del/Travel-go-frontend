import Header from "../SUPERADMIN/Header";
import Footer from "../ADMIN/Footer";
import SideMenu from "../SUPERADMIN/sidemenu";
import { useEffect, useState } from "react";
import axios from "axios";

function SuperAdminDashboard() {

  const [dashboard, setDashboard] = useState({});

  const fetchDashboard = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/superadmin/dashboard"
      );

      if (res.data.success) {
        setDashboard(res.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="wrapper">

      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Super Admin Dashboard</h1>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">

            <div className="row">

              {/* Total Users */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{dashboard.totalUsers || 0}</h3>
                    <p>Total Users</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>

              {/* Total Sellers */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{dashboard.totalSellers || 0}</h3>
                    <p>Total Sellers</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-user-tie"></i>
                  </div>
                </div>
              </div>

              {/* Total Cabs */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{dashboard.totalCabs || 0}</h3>
                    <p>Total Cabs</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-car"></i>
                  </div>
                </div>
              </div>

              {/* Total Buses */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{dashboard.totalBuses || 0}</h3>
                    <p>Total Buses</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-bus"></i>
                  </div>
                </div>
              </div>

            </div>

            <div className="row">

              {/* Total Trains */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-primary">
                  <div className="inner">
                    <h3>{dashboard.totalTrains || 0}</h3>
                    <p>Total Trains</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-train"></i>
                  </div>
                </div>
              </div>

              {/* Total Flights */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-secondary">
                  <div className="inner">
                    <h3>{dashboard.totalFlights || 0}</h3>
                    <p>Total Flights</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-plane"></i>
                  </div>
                </div>
              </div>

              {/* Total Bookings */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-dark">
                  <div className="inner">
                    <h3>{dashboard.totalBookings || 0}</h3>
                    <p>Total Bookings</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>₹ {dashboard.totalRevenue || 0}</h3>
                    <p>Total Revenue</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-rupee-sign"></i>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>

      <Footer />

    </div>
  );
}

export default SuperAdminDashboard;