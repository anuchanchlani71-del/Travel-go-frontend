import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [dashboard, setDashboard] = useState({});

  const sellerId = localStorage.getItem("sellerId");

  const fetchDashboard = async () => {
    try {

      const response = await axios.get(
        `http://localhost:5000/api/admin/dashboard?sellerId=${sellerId}`
      );

      if (response.data.success) {
        setDashboard(response.data);
      }

    } catch (error) {
      console.log(error);
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

        {/* Page Header */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">

              <div className="col-sm-6">
                <h1 className="m-0 text-capitalize">
                  {dashboard.businessType} Dashboard
                </h1>
              </div>

            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="container-fluid">

            <div className="row">

              {/* Total Vehicles */}
              <div className="col-lg-4 col-6">
                <div className="small-box bg-info">

                  <div className="inner">

                    <h3>{dashboard.totalVehicle || 0}</h3>

                    <p>

                    {dashboard.businessType === "Cab" && "Total Cabs"}
{dashboard.businessType === "Bus" && "Total Buses"}
{dashboard.businessType === "Train" && "Total Trains"}
{dashboard.businessType === "Flight" && "Total Flights"}

                    </p>

                  </div>

                  <div className="icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>

                </div>
              </div>

              {/* Total Bookings */}
              <div className="col-lg-4 col-6">
                <div className="small-box bg-success">

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
              <div className="col-lg-4 col-6">
                <div className="small-box bg-warning">

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
        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Dashboard;