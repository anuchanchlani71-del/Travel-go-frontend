import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../SUPERADMIN/Header";
import Footer from "../ADMIN/Footer";
import SideMenu from "../SUPERADMIN/sidemenu";
function FlightBookings() {

 
const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get("http://localhost:5000/superadmin/flightbooking?type=flight")
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
          <h1>Flight Bookings</h1>
        </div>

        <div className="content">

          <div className="card">

            <div className="card-body">

              <table className="table table-bordered">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Airline</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Flight No</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={b._id}>
                      <td>{i + 1}</td>
                      <td>{b.userId?.first_name}</td>
                      <td>{b.airline}</td>
                      <td>{b.fromAirport}</td>
                      <td>{b.toAirport}</td>
                      <td>{b.flightNumber}</td>

                      <td>
                        <span className="badge badge-primary">
                          {b.bookingStatus}
                        </span>
                      </td>

                      <td>
                      <button
  className="btn btn-info btn-sm mr-2"
  title="View"
  onClick={() => setSelectedBooking(b)}
>
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

      <Footer />
      {selectedBooking && (
  <div
    className="modal d-block"
    style={{ background: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-lg">

      <div className="modal-content">

        <div className="modal-header">
          <h5>Flight Booking Details</h5>

          <button
            type="button"
            className="close"
            onClick={() => setSelectedBooking(null)}
          >
            <span>&times;</span>
          </button>
        </div>

        <div className="modal-body">

          <div className="row">

            <div className="col-md-6">

              <h5>User Details</h5>

              <p>
                <b>Name :</b>{" "}
                {selectedBooking.userId?.first_name}{" "}
                {selectedBooking.userId?.last_name}
              </p>

              <p>
                <b>Email :</b>{" "}
                {selectedBooking.userId?.email}
              </p>

              <p>
                <b>Mobile :</b>{" "}
                {selectedBooking.userId?.mobile}
              </p>

            </div>

            <div className="col-md-6">

              <h5>Flight Details</h5>

              <p>
                <b>Airline :</b>{" "}
                {selectedBooking.airline}
              </p>

              <p>
                <b>Flight No :</b>{" "}
                {selectedBooking.flightNumber}
              </p>

  

            </div>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">

<p>
  <b>Airline :</b> {selectedBooking.airline || "-"}
</p>

<p>
  <b>Airline Code :</b> {selectedBooking.airlineCode || "-"}
</p>

              <p>
                <b>Departure :</b>{" "}
                {selectedBooking.flightDepartureTime
                  ? new Date(
                      selectedBooking.flightDepartureTime
                    ).toLocaleString()
                  : "-"}
              </p>

              <p>
                <b>Arrival :</b>{" "}
                {selectedBooking.flightArrivalTime
                  ? new Date(
                      selectedBooking.flightArrivalTime
                    ).toLocaleString()
                  : "-"}
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <b>Travel Class :</b>{" "}
                {selectedBooking.travelClass}
              </p>



              <p>
                <b>Duration :</b>{" "}
                {selectedBooking.duration} Minutes
              </p>

            </div>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">

              <p>
                <b>Amount :</b> ₹
                {selectedBooking.amount}
              </p>

              <p>
                <b>Payment :</b>{" "}
                <span className="badge badge-success">
                  {selectedBooking.paymentStatus}
                </span>
              </p>

            </div>

            <div className="col-md-6">

              <p>
                <b>Status :</b>{" "}
                <span className="badge badge-primary">
                  {selectedBooking.bookingStatus}
                </span>
              </p>

              <p>
                <b>Booked On :</b>{" "}
                {new Date(
                  selectedBooking.createdAt
                ).toLocaleString()}
              </p>

            </div>

          </div>

          {selectedBooking.passengersDetails?.length > 0 && (
            <>
              <hr />

              <h5>Passenger Details</h5>

              <table className="table table-bordered">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                   
                  </tr>
                </thead>

                <tbody>

                  {selectedBooking.passengersDetails.map(
                    (p, index) => (
                      <tr key={index}>
                        <td>{p.name}</td>
                        <td>{p.age}</td>
                        <td>{p.gender}</td>
                        
                      </tr>
                    )
                  )}

                </tbody>

              </table>
            </>
          )}

        </div>

      </div>

    </div>
  </div>
)}

    </div>
  );
}
export default FlightBookings;