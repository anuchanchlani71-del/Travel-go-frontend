import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../SUPERADMIN/Header";
import Footer from "../ADMIN/Footer";
import SideMenu from "../SUPERADMIN/sidemenu";
function BusBookings() {

  const [bookings, setBookings] = useState([]);
const [selectedBooking, setSelectedBooking] = useState(null);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get("http://localhost:5000/superadmin/busbooking?type=bus")
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
          <h1>Bus Bookings</h1>
        </div>

        <div className="content">

          <div className="card">

            <div className="card-body">

              <table className="table table-bordered">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Bus</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Boarding</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={b._id}>
                      <td>{i + 1}</td>
                      <td>{b.userId?.first_name}</td>
                      <td>{b.busName}</td>
                      <td>{b.busId?.from?.city}</td>
                      <td>{b.busId.to?.city}</td>
                      <td>{b.boardingPoint}</td>

                      <td>
                        <span className="badge badge-info">
                          {b.bookingStatus}
                        </span>
                      </td>

                      <td>
                       <button
    className="btn btn-sm btn-info"
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
          <h5>Bus Booking Details</h5>

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

              <h5>Bus Details</h5>

              <p>
                <b>Bus :</b>{" "}
                {selectedBooking.busName}
              </p>

              <p>
                <b>Bus No :</b>{" "}
                {selectedBooking.busNumber}
              </p>

              <p>
                <b>Operator :</b>{" "}
                {selectedBooking.operatorName}
              </p>

            </div>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">

           <p>
  <b>From :</b>{" "}
  {selectedBooking.busId?.from?.city}
</p>

<p>
  <b>To :</b>{" "}
  {selectedBooking.busId?.to?.city}
</p>

              <p>
                <b>Journey Date :</b>{" "}
                {new Date(
                  selectedBooking.journeyDate
                ).toLocaleDateString()}
              </p>

              <p>
                <b>Boarding Point :</b>{" "}
                {selectedBooking.boardingPoint}
              </p>

              <p>
                <b>Dropping Point :</b>{" "}
                {selectedBooking.droppingPoint}
              </p>

            </div>

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

              <p>
                <b>Status :</b>{" "}
                <span className="badge badge-info">
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

              <h5>Passengers</h5>

              <table className="table table-bordered">

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Seat</th>
                  </tr>
                </thead>

                <tbody>

                  {selectedBooking.passengersDetails.map(
                    (p, i) => (
                      <tr key={i}>
                        <td>{p.name}</td>
                        <td>{p.age}</td>
                        <td>{p.gender}</td>
                        <td>{p.seatNumber}</td>
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
export default BusBookings;