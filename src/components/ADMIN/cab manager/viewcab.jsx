import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";

function ViewCab() {
  const { id } = useParams();
  const [cab, setCab] = useState(null);

  const getCab = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/seller/getOnecab",
        {
          params: { _id: id },
        }
      );

      if (res.data.success) {
        setCab(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCab();
  }, [id]);

  if (!cab) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper p-4">
        <div className="container-fluid">

          {/* HEADER */}
          <div className="d-flex justify-content-between mb-3">
            <h2>🚖 Cab Full Details</h2>
            <Link to="/admin/cabs" className="btn btn-secondary">
              Back
            </Link>
          </div>

          <div className="card p-4 shadow">

            {/* ===== BASIC INFO ===== */}
            <h4 className="text-primary mb-3">Basic Information</h4>

            <p><b>Cab Name:</b> {cab.cabName}</p>
            <p><b>Operator:</b> {cab.operator}</p>
            <p><b>Vehicle Type:</b> {cab.vehicleType}</p>
            <p><b>Cab Number:</b> {cab.cabNumber}</p>
            <p><b>Brand:</b> {cab.cabBrand || "-"}</p>
            <p><b>Model:</b> {cab.cabModel || "-"}</p>
            <p><b>Color:</b> {cab.cabColor || "-"}</p>

            <hr />

            {/* ===== DRIVER INFO ===== */}
            <h4 className="text-success mb-3">Driver Info</h4>

            <p><b>Name:</b> {cab.driverName}</p>
            <p><b>Phone:</b> {cab.driverPhone}</p>
            <p><b>Experience:</b> {cab.driverExperience || 0} years</p>
            <p><b>Rating:</b> {cab.driverRating}</p>

            {cab.driverImage && (
  <img
    src={cab.driverImage}
    alt="driver"
    style={{ width: "120px", borderRadius: "10px" }}
  />
)}

            <hr />

            {/* ===== CAPACITY ===== */}
            <h4 className="text-warning mb-3">Capacity</h4>

            <p><b>Seating Capacity:</b> {cab.seatingCapacity}</p>
            <p><b>Luggage Capacity:</b> {cab.luggageCapacity || "-"}</p>

            <hr />

            {/* ===== PRICING ===== */}
            <h4 className="text-info mb-3">Pricing</h4>

            <p><b>Base Fare:</b> ₹{cab.baseFare}</p>
            <p><b>Price Per KM:</b> ₹{cab.pricePerKm}</p>
            <p><b>Price Per Minute:</b> ₹{cab.pricePerMinute}</p>
            <p><b>City:</b> {cab.city}</p>

            <hr />

            {/* ===== FEATURES ===== */}
            <h4 className="text-secondary mb-3">Features</h4>

            <p>AC: {cab.airConditioned ? "Yes" : "No"}</p>
            <p>WiFi: {cab.wifiAvailable ? "Yes" : "No"}</p>
            <p>Music: {cab.musicAvailable ? "Yes" : "No"}</p>

            <hr />

            {/* ===== VEHICLE DETAILS ===== */}
            <h4 className="mb-3">Vehicle Details</h4>

            <p><b>Vehicle Model:</b> {cab.vehicleModel || "-"}</p>
            <p><b>Fuel Type:</b> {cab.fuelType || "-"}</p>

            <hr />

            {/* ===== STATUS ===== */}
            <h4 className="mb-3">Status</h4>

            <p>Active: {cab.isActive ? "Yes" : "No"}</p>
            <p>Maintenance: {cab.underMaintenance ? "Yes" : "No"}</p>
            <p>Rating: {cab.rating}</p>

            <hr />

            {/* ===== POLICY ===== */}
            <h4 className="mb-3">Cancellation Policy</h4>
            <p>{cab.cancellationPolicy || "Not Available"}</p>

            <hr />

            {/* ===== NOTES ===== */}
            <h4 className="mb-3">Notes</h4>
            <p>{cab.notes || "No notes"}</p>

            <hr />

            {/* ===== IMAGE ===== */}
            <h4 className="mb-3">Cab Image</h4>

{cab.cabImage ? (
  <img
    src={cab.cabImage}
    alt="cab"
    style={{
      width: "150px",
      borderRadius: "10px",
      objectFit: "cover",
    }}
  />
) : (
  <p>No image</p>
)}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ViewCab;