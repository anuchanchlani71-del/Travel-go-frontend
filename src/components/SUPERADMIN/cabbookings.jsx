import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../SUPERADMIN/Header";
import Footer from "../ADMIN/Footer";
import SideMenu from "../SUPERADMIN/sidemenu";

function CabBookings() {


  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get("http://localhost:5000/superadmin/cabbooking?type=cab")
      .then(res => setBookings(res.data.data || []));
  };

  const handleToggleBookingStatus = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/superadmin/update-booking-status/${id}`);
      if (res.data.success) {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, bookingStatus: res.data.data.bookingStatus } : b));
      }
    } catch (err) {
      console.error(err);
      alert("Error toggling booking status");
    }
  };

  return (
    <div className="wrapper">

      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <div className="content-header">
          <div className="container-fluid">
            <h1>Cab Bookings</h1>
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">

            <div className="card">

              <div className="card-body">

                <table className="table table-bordered table-striped">

                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Cab</th>
                      <th>Pickup</th>
                      <th>Drop</th>
                      
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((b, i) => (
                      <tr key={b._id}>
                        <td>{i + 1}</td>
                        <td>{b.userId?.first_name}</td>
                        <td>{b.cabName}</td>
                        <td>{b.pickupLocation}</td>
                        <td>{b.dropLocation}</td>
                        

                        <td>
                          <span className="badge badge-success">
                            {b.bookingStatus}
                          </span>
                        </td>

                        <td>
                          <button className="btn btn-info btn-sm mr-2" onClick={() => setSelected(b)} title="View">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            className={`btn btn-sm ${b.bookingStatus === "Confirmed" || b.bookingStatus === "confirmed" ? "btn-warning" : "btn-success"}`}
                            onClick={() => handleToggleBookingStatus(b._id)}
                            title="Toggle Status"
                          >
                            <i className={`fas ${b.bookingStatus === "Confirmed" || b.bookingStatus === "confirmed" ? "fa-toggle-on" : "fa-toggle-off"}`} style={{ fontSize: "1.1rem" }}></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

            </div>

          </div>
        </div>

      </div>

      <Footer />
      {selected && (
  <div
    className="modal d-block"
    style={{ background: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-lg">

      <div className="modal-content p-3">

        <div className="modal-header">
          <h5>Cab Booking Details</h5>

          <button
            className="btn-close"
            onClick={() => setSelected(null)}
          />
        </div>

        <div className="modal-body">

          <div className="text-center mb-3">
            <i
              className="fas fa-car"
              style={{ fontSize: "60px", color: "#17a2b8" }}
            ></i>

            <h4 className="mt-2">
              {selected.cabName}
            </h4>

            <span className="badge badge-success">
              {selected.bookingStatus}
            </span>
          </div>

          <table className="table table-bordered">

            <tbody>

              <tr>
                <th>Passenger</th>
                <td>
                  {selected.userId?.first_name}{" "}
                  {selected.userId?.last_name}
                </td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{selected.userId?.email}</td>
              </tr>

              <tr>
                <th>Mobile</th>
                <td>{selected.userId?.mobile}</td>
              </tr>

              <tr>
                <th>Cab Name</th>
                <td>{selected.cabName}</td>
              </tr>

              <tr>
                <th>Vehicle Number</th>
                <td>{selected.vehicleNumber}</td>
              </tr>

              <tr>
                <th>Vehicle Type</th>
                <td>{selected.vehicleType}</td>
              </tr>

              <tr>
                <th>Pickup Location</th>
                <td>{selected.pickupLocation}</td>
              </tr>

              <tr>
                <th>Drop Location</th>
                <td>{selected.dropLocation}</td>
              </tr>

              <tr>
                <th>Journey Date</th>
                <td>
                  {new Date(selected.journeyDate).toLocaleDateString()}
                </td>
              </tr>

              <tr>
                <th>Amount</th>
                <td>₹ {selected.amount}</td>
              </tr>

              <tr>
                <th>Payment Status</th>
                <td>
                  <span
                    className={`badge ${
                      selected.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-danger"
                    }`}
                  >
                    {selected.paymentStatus}
                  </span>
                </td>
              </tr>

              <tr>
                <th>Booking Status</th>
                <td>
                  <span className="badge badge-info">
                    {selected.bookingStatus}
                  </span>
                </td>
              </tr>

              <tr>
                <th>Booked On</th>
                <td>
                  {new Date(selected.createdAt).toLocaleString()}
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setSelected(null)}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  </div>
)}

    </div>
  );
}

export default CabBookings;