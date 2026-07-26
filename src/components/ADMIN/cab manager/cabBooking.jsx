import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";

function CabBookings() {
  const [bookings, setBookings] = useState([]);

  const sellerId = localStorage.getItem("sellerId");

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/cabsellerbookings/?sellerId=${sellerId}`
      );

      if (response.data.success) {
        setBookings(response.data.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-0">Cab Bookings Manager</h1>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="card">

              <div className="card-header">
                <h3
                  className="card-title m-0"
                  style={{ fontWeight: "bold" }}
                >
                  Cab Bookings List
                </h3>
              </div>

              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Cab Name</th>
                      <th>Passenger</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Pickup</th>
                      <th>Drop</th>
                      <th>Vehicle No</th>
                      <th>Vehicle Type</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Booking Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.length > 0 ? (
                      bookings.map((booking, index) => (
                        <tr key={booking._id}>
                          <td>{index + 1}</td>

                          <td>{booking.cabName}</td>

                          <td>
                            {booking.userId?.first_name}{" "}
                            {booking.userId?.last_name}
                          </td>

                          <td>{booking.userId?.email}</td>

                          <td>{booking.userId?.mobile}</td>

                          <td>{booking.pickupLocation}</td>

                          <td>{booking.dropLocation}</td>

                          <td>{booking.vehicleNumber}</td>

                          <td>{booking.vehicleType}</td>

                          <td>₹ {booking.amount}</td>

                          <td>
                            <span
                              className={`badge ${
                                booking.paymentStatus === "paid"
                                  ? "badge-success"
                                  : "badge-danger"
                              }`}
                            >
                              {booking.paymentStatus}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`badge ${
                                booking.bookingStatus === "confirmed"
                                  ? "badge-success"
                                  : "badge-warning"
                              }`}
                            >
                              {booking.bookingStatus}
                            </span>
                          </td>

                          <td>
                            {new Date(
                              booking.createdAt
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="13"
                          className="text-center text-danger"
                        >
                          No Cab Bookings Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CabBookings;