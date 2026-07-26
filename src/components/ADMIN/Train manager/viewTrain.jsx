import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";

function TrainView() {
  const { id } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
  const fetchTrain = async () => {
  const res = await axios.get(
    "http://localhost:5000/api/seller/singletrain",
    {
      params: {
        _id: id
      }
    }
  );

  if (res.data.success) {
    setTrain(res.data.data);
  }
};

    fetchTrain();
  }, [id]);

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper p-4">
        <div className="container-fluid">

          <div className="d-flex justify-content-between mb-3">
            <h2>🚆 Train Full Details</h2>
            <Link to="/admin/trains" className="btn btn-secondary">
              Back
            </Link>
          </div>

          {!train ? (
            <h5>Loading...</h5>
          ) : (

            <div className="card p-4 shadow">

              {/* ===== BASIC INFO ===== */}
              <h3 className="text-primary">{train.trainName}</h3>
              <p><b>Train Number:</b> {train.trainNumber}</p>
              <p><b>Type:</b> {train.trainType}</p>
              <p><b>Operator:</b> {train.operator}</p>

              <hr />

              {/* ===== STATIONS ===== */}
              <h5>📍 Route</h5>
              <p>
                <b>From:</b> {train.fromStation?.city} ({train.fromStation?.stationCode})
              </p>
              <p>
                <b>To:</b> {train.toStation?.city} ({train.toStation?.stationCode})
              </p>

              <hr />

              {/* ===== TIMING ===== */}
              <h5>⏰ Timing</h5>
              <p><b>Departure:</b> {train.departureTime}</p>
              <p><b>Arrival:</b> {train.arrivalTime}</p>
              <p><b>Duration (min):</b> {train.durationMinutes}</p>

              <hr />

              {/* ===== FEATURES ===== */}
              <h5>⚙️ Features</h5>
              <p>Pantry: {train.pantryAvailable ? "Yes" : "No"}</p>
              <p>Tatkal: {train.tatkalAvailable ? "Yes" : "No"}</p>
              <p>Maintenance: {train.underMaintenance ? "Yes" : "No"}</p>
              <p>Status: {train.isActive ? "Active" : "Inactive"}</p>

              <hr />

              {/* ===== RUNNING DAYS ===== */}
              <h5>📅 Running Days</h5>
              <p>{train.runningDays?.join(", ")}</p>

              <hr />

              {/* ===== CLASSES ===== */}
              <h5>🎟 Classes</h5>
              {train.classes?.map((cls, i) => (
                <div key={i} className="border p-2 mb-2">
                  <p><b>Type:</b> {cls.classType}</p>
                  <p><b>Fare:</b> ₹{cls.baseFare}</p>
                  <p><b>Total Seats:</b> {cls.totalSeats}</p>
                  <p><b>Available:</b> {cls.availableSeats}</p>
                </div>
              ))}

              <hr />

              {/* ===== STOPS ===== */}
            <h5>🚉 Stops</h5>

{train.stops
  ?.filter(stop =>
    stop.stationName &&
    stop.stationCode &&
    stop.stationName.trim() !== "" &&
    stop.stationCode.trim() !== ""
  )
  .length > 0 ? (

  train.stops
    .filter(stop =>
      stop.stationName &&
      stop.stationCode &&
      stop.stationName.trim() !== "" &&
      stop.stationCode.trim() !== ""
    )
    .map((stop, i) => (
      <div key={i} className="border p-2 mb-2">
        <p><b>{stop.stopNumber}. {stop.stationName}</b></p>
        <p>Code: {stop.stationCode}</p>
        <p>Arrival: {stop.arrivalTime}</p>
        <p>Departure: {stop.departureTime}</p>
        <p>Halt: {stop.haltTime}</p>
        <p>Distance: {stop.distance} km</p>
      </div>
    ))

) : (
  <p className="text-muted">No valid stops available</p>
)}

              <hr />

              {/* ===== POLICY ===== */}
              <h5>📜 Cancellation Policy</h5>
              <p>{train.cancellationPolicy || "Not available"}</p>

            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TrainView;