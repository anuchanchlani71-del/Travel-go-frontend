// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// function ViewFlight() {

//   const { id } = useParams();
//   const [flight, setFlight] = useState(null);

//   const getFlight = async () => {

//     try {

//       const res = await axios.get(
//         `http://localhost:5000/viewOneFlight/${id}`
//       );

//       setFlight(res.data.data);

//     } catch (err) {
//       console.log(err);
//     }

//   };

//   useEffect(() => {
//     getFlight();
//   }, [id]);

//   if (!flight) {
//     return <h3 className="text-center mt-5">Loading...</h3>;
//   }

//   return (

//     <div className="container mt-4 mb-5">

//       <div className="card shadow p-4">

//         <h2 className="mb-4">✈ Flight Full Details</h2>

//         {/* ================= BASIC INFO ================= */}
//         <h5>Basic Info</h5>
//         <p><b>ID:</b> {flight._id}</p>
//         <p><b>Flight Number:</b> {flight.flightnumber}</p>
//         <p><b>Airline:</b> {flight.airline}</p>
//         <p><b>Airline Code:</b> {flight.airlineCode}</p>
//         <p><b>Status:</b> {flight.status}</p>

//         <hr />

//         {/* ================= ROUTE ================= */}
//         <h5>Route</h5>
//         <p><b>From City:</b> {flight.from?.city}</p>
//         <p><b>From Airport:</b> {flight.from?.airport}</p>
//         <p><b>From Code:</b> {flight.from?.code}</p>

//         <p><b>To City:</b> {flight.to?.city}</p>
//         <p><b>To Airport:</b> {flight.to?.airport}</p>
//         <p><b>To Code:</b> {flight.to?.code}</p>

//         <hr />

//         {/* ================= TIMINGS ================= */}
//         <h5>Timings</h5>
//         <p>
//           <b>Departure Time:</b>{" "}
//           {new Date(flight.departuretime).toLocaleString()}
//         </p>

//         <p>
//           <b>Arrival Time:</b>{" "}
//           {new Date(flight.arrivaltime).toLocaleString()}
//         </p>

//         <p><b>Duration:</b> {flight.duration} mins</p>

//         <hr />

//         {/* ================= STOPS ================= */}
//         <h5>Stops</h5>

//         {flight.stops && flight.stops.length > 0 ? (
//           flight.stops.map((stop, i) => (
//             <div key={i} style={{ marginBottom: "10px" }}>
//               <p><b>City:</b> {stop.city}</p>
//               <p><b>Airport:</b> {stop.airport}</p>
//               <p><b>Code:</b> {stop.code}</p>
//               <p><b>Arrival Time:</b> {new Date(stop.arrivalTime).toLocaleString()}</p>
//               <p><b>Departure Time:</b> {new Date(stop.departureTime).toLocaleString()}</p>
//               <hr />
//             </div>
//           ))
//         ) : (
//           <p>No Stops</p>
//         )}

//         {/* ================= CLASSES ================= */}
//         <h5>Classes</h5>

//         <h6>Economy</h6>
//         <p><b>Price:</b> ₹{flight.classes?.economy?.price}</p>
//         <p><b>Seats:</b> {flight.classes?.economy?.seats}</p>
//         <p><b>Available Seats:</b> {flight.classes?.economy?.availableSeats}</p>

//         <br />

//         <h6>Business</h6>
//         <p><b>Price:</b> ₹{flight.classes?.business?.price}</p>
//         <p><b>Seats:</b> {flight.classes?.business?.seats}</p>
//         <p><b>Available Seats:</b> {flight.classes?.business?.availableSeats}</p>

//         <hr />

//         {/* ================= AMENITIES ================= */}
//         <h5>Amenities</h5>

//         {flight.amenities && flight.amenities.length > 0 ? (
//           flight.amenities.map((a, i) => (
//             <p key={i}>
//               <b>{a.name}</b> - {a.included ? "Included" : `₹${a.price}`}
//             </p>
//           ))
//         ) : (
//           <p>No Amenities</p>
//         )}

//         <hr />

//         {/* ================= AIRCRAFT ================= */}
//         <h5>Aircraft</h5>
//         <p><b>Name:</b> {flight.aircraft?.name}</p>
//         <p><b>Code:</b> {flight.aircraft?.code}</p>

//         <hr />

//         {/* ================= BAGGAGE ================= */}
//         <h5>Baggage</h5>
//         <p><b>Check-in:</b> {flight.baggage?.checkIn}</p>
//         <p><b>Cabin:</b> {flight.baggage?.cabin}</p>

//         <hr />

//         {/* ================= FARE RULES ================= */}
//         <h5>Fare Rules</h5>
//         <p><b>Refundable:</b> {flight.fareRules?.refundable ? "Yes" : "No"}</p>
//         <p><b>Cancellation Fee:</b> ₹{flight.fareRules?.cancellationFee}</p>
//         <p><b>Reschedule Fee:</b> ₹{flight.fareRules?.rescheduleFee}</p>

//         <hr />

//         {/* ================= META ================= */}
//         <h5>Meta</h5>
//         <p><b>Created At:</b> {new Date(flight.createdAt).toLocaleString()}</p>
//         <p><b>Updated At:</b> {new Date(flight.updatedAt).toLocaleString()}</p>
//         <p><b>Created By:</b> {flight.createdBy}</p>

//         <hr />

//         {/* BACK BUTTON */}
//         <Link to="/admin/flight" className="btn btn-primary">
//           Back
//         </Link>

//       </div>

//     </div>

//   );
// }

// export default ViewFlight;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ViewFlight() {

  const { id } = useParams();
  const [flight, setFlight] = useState(null);

  const getFlight = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/viewOneFlight/${id}`
      );

      setFlight(res.data.data);

    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    getFlight();
  }, [id]);

  if (!flight) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (

    <div className="container mt-4 mb-5">

      <div className="card shadow-lg p-4" style={{ borderRadius: "12px" }}>

        {/* HEADER */}
        <div className="mb-4 text-center">
          <h2 style={{ color: "#0d6efd", fontWeight: "bold" }}>
            ✈ Flight Full Details
          </h2>
          <p style={{ color: "#6c757d" }}>Complete information overview</p>
        </div>

        {/* ================= BASIC INFO ================= */}
        <div className="p-3 mb-3" style={{ background: "#f1f7ff", borderRadius: "10px" }}>
          <h5 style={{ color: "#0d6efd" }}>Basic Info</h5>
          <p><b>Flight Number:</b> {flight.flightnumber}</p>
          <p><b>Airline:</b> {flight.airline}</p>
          <p><b>Status:</b>{" "}
            <span className={`badge ${
              flight.status === "On Time"
                ? "bg-success"
                : flight.status === "Delayed"
                ? "bg-warning text-dark"
                : "bg-danger"
            }`}>
              {flight.status}
            </span>
          </p>
        </div>

        {/* ================= ROUTE ================= */}
        <div className="p-3 mb-3" style={{ background: "#fff7ed", borderRadius: "10px" }}>
          <h5 style={{ color: "#fd7e14" }}>Route</h5>
          <p><b>From:</b> {flight.from?.city} ({flight.from?.code})</p>
          <p><b>Airport:</b> {flight.from?.airport}</p>

          <p><b>To:</b> {flight.to?.city} ({flight.to?.code})</p>
          <p><b>Airport:</b> {flight.to?.airport}</p>
        </div>

        {/* ================= TIMINGS ================= */}
        <div className="p-3 mb-3" style={{ background: "#eef2ff", borderRadius: "10px" }}>
          <h5 style={{ color: "#6610f2" }}>Timings</h5>
          <p><b>Departure:</b> {new Date(flight.departuretime).toLocaleString()}</p>
          <p><b>Arrival:</b> {new Date(flight.arrivaltime).toLocaleString()}</p>
          <p><b>Duration:</b> {flight.duration} mins</p>
        </div>

        {/* ================= STOPS ================= */}
        <div className="p-3 mb-3" style={{ background: "#f8f9fa", borderRadius: "10px" }}>
          <h5 style={{ color: "#198754" }}>Stops</h5>

          {flight.stops?.length > 0 ? (
            flight.stops.map((stop, i) => (
              <div key={i} className="mb-2 p-2" style={{ borderLeft: "4px solid #198754" }}>
                <p><b>City:</b> {stop.city}</p>
                <p><b>Airport:</b> {stop.airport}</p>
                <p><b>Code:</b> {stop.code}</p>
              </div>
            ))
          ) : (
            <p>No Stops</p>
          )}
        </div>

        {/* ================= CLASSES ================= */}
        <div className="p-3 mb-3" style={{ background: "#e8f5e9", borderRadius: "10px" }}>
          <h5 style={{ color: "#198754" }}>Classes</h5>

          <p><b>Economy:</b> ₹{flight.classes?.economy?.price} | Seats: {flight.classes?.economy?.availableSeats}</p>
          <p><b>Business:</b> ₹{flight.classes?.business?.price} | Seats: {flight.classes?.business?.availableSeats}</p>
        </div>

        {/* ================= AMENITIES ================= */}
        <div className="p-3 mb-3" style={{ background: "#fff3cd", borderRadius: "10px" }}>
          <h5 style={{ color: "#ffc107" }}>Amenities</h5>

          {flight.amenities?.length > 0 ? (
            flight.amenities.map((a, i) => (
              <p key={i}>
                <b>{a.name}</b> - {a.included ? "Included" : `₹${a.price}`}
              </p>
            ))
          ) : (
            <p>No Amenities</p>
          )}
        </div>

        {/* ================= AIRCRAFT ================= */}
        <div className="p-3 mb-3" style={{ background: "#e3f2fd", borderRadius: "10px" }}>
          <h5 style={{ color: "#0d6efd" }}>Aircraft</h5>
          <p><b>Name:</b> {flight.aircraft?.name}</p>
          <p><b>Code:</b> {flight.aircraft?.code}</p>
        </div>

        {/* ================= BAGGAGE ================= */}
        <div className="p-3 mb-3" style={{ background: "#fce4ec", borderRadius: "10px" }}>
          <h5 style={{ color: "#d63384" }}>Baggage</h5>
          <p><b>Check-in:</b> {flight.baggage?.checkIn}</p>
          <p><b>Cabin:</b> {flight.baggage?.cabin}</p>
        </div>

        {/* ================= FARE RULES ================= */}
        <div className="p-3 mb-3" style={{ background: "#e0f7fa", borderRadius: "10px" }}>
          <h5 style={{ color: "#0dcaf0" }}>Fare Rules</h5>
          <p><b>Refundable:</b> {flight.fareRules?.refundable ? "Yes" : "No"}</p>
          <p><b>Cancellation Fee:</b> ₹{flight.fareRules?.cancellationFee}</p>
          <p><b>Reschedule Fee:</b> ₹{flight.fareRules?.rescheduleFee}</p>
        </div>

        {/* BACK BUTTON */}
        <div className="text-center mt-3">
          <Link to="/admin/flight" className="btn btn-primary px-4">
            ← Back
          </Link>
        </div>

      </div>

    </div>

  );
}

export default ViewFlight;