import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../SUPERADMIN/Header";
import Footer from "../ADMIN/Footer";
import SideMenu from "../SUPERADMIN/sidemenu";

function TrainBookings() {

  const [bookings, setBookings] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get("http://localhost:5000/superadmin/trainbooking?type=train")
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
          <h1>Train Bookings</h1>
        </div>

        <div className="content">

          <div className="card">

            <div className="card-body">

              <table className="table table-bordered">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Train</th>
                    <th>From</th>
                    <th>To</th>
                    <th>PNR</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={b._id}>
                      <td>{i + 1}</td>
                      <td>{b.userId?.first_name}</td>
                      <td>{b.trainName}</td>
                      <td>{b.from}</td>
                      <td>{b.to}</td>
                      <td>{b.pnrNumber}</td>

                      <td>
                        <span className="badge badge-warning">
                          {b.bookingStatus}
                        </span>
                      </td>

                      <td>
                        <button
    className="btn btn-info btn-sm"
    onClick={() => setSelected(b)}
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
{selected && (
  <div
    className="modal d-block"
    style={{ background: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-lg">

      <div className="modal-content">

        <div className="modal-header">
          <h5>Train Booking Details</h5>

          <button
            type="button"
            className="close"
            onClick={() => setSelected(null)}
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
                {selected.userId?.first_name}{" "}
                {selected.userId?.last_name}
              </p>

              <p>
                <b>Email :</b>{" "}
                {selected.userId?.email}
              </p>

              <p>
                <b>Mobile :</b>{" "}
                {selected.userId?.mobile}
              </p>

            </div>

            <div className="col-md-6">

              <h5>Train Details</h5>

              <p>
                <b>Train Name :</b>{" "}
                {selected.trainName}
              </p>

              <p>
                <b>Train Number :</b>{" "}
                {selected.trainNumber}
              </p>

              <p>
                <b>PNR :</b>{" "}
                {selected.pnrNumber}
              </p>
<p>
  <b>Class :</b>{" "}
  {selected.classType || selected.class || "-"}
</p>



            </div>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">

              <p>
                <b>From :</b>{" "}
                {selected.from}
              </p>

              <p>
                <b>To :</b>{" "}
                {selected.to}
              </p>



            </div>

            <div className="col-md-6">

              <p>
                <b>Amount :</b> ₹
                {selected.amount}
              </p>

              <p>
                <b>Payment :</b>{" "}
                <span className="badge badge-success">
                  {selected.paymentStatus}
                </span>
              </p>

              <p>
                <b>Status :</b>{" "}
                <span className="badge badge-warning">
                  {selected.bookingStatus}
                </span>
              </p>

              <p>
                <b>Booked On :</b>{" "}
                {new Date(selected.createdAt).toLocaleString()}
              </p>

            </div>

          </div>

          {selected.passengersDetails?.length > 0 && (
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

                  {selected.passengersDetails.map((p, index) => (
                    <tr key={index}>
                      <td>{p.name}</td>
                      <td>{p.age}</td>
                      <td>{p.gender}</td>
                    </tr>
                  ))}

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
export default TrainBookings