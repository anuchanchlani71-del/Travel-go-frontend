import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";

function TrainBookings() {
  const [bookings, setBookings] = useState([]);

  const sellerId = localStorage.getItem("sellerId");

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/trainsellerbookings/?sellerId=${sellerId}`
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

        {/* Header */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="m-0">Train Bookings Manager</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          <div className="container-fluid">

            <div className="card">

              <div className="card-header">
                <h3
                  className="card-title m-0"
                  style={{ fontWeight: "bold" }}
                >
                  Train Bookings List
                </h3>
              </div>

              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>PNR Number</th>
                      <th>Train Name</th>
                      <th>Train Number</th>
                      <th>Passenger</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Class</th>
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

                          <td>{booking.pnrNumber}</td>

                          <td>{booking.trainName}</td>

                          <td>{booking.trainNumber}</td>

                          <td>
                            {booking.userId?.first_name}{" "}
                            {booking.userId?.last_name}
                          </td>

                          <td>{booking.userId?.email}</td>

                          <td>{booking.userId?.mobile}</td>

                          <td>{booking.classType}</td>

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
                          colSpan="12"
                          className="text-center text-danger"
                        >
                          No Train Bookings Found
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

export default TrainBookings;