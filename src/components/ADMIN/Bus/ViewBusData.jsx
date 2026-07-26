// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// function ViewBus() {

//   const { id } = useParams();
//   const [bus, setBus] = useState(null);

//   const getBus = async () => {

//     try {

//       const res = await axios.get(
//         `http://localhost:5000/admin/api/v1/findOneBus/${id}`
//       );

//       setBus(res.data.data);

//     } catch (err) {
//       console.log(err);
//     }

//   };

//   useEffect(() => {
//     getBus();
//   }, [id]);

//   if (!bus) {
//     return <h3 className="text-center mt-5">Loading...</h3>;
//   }

//   return (

//     <div className="container mt-4 mb-5">

//       <div className="card shadow-lg p-4" style={{ borderRadius: "12px" }}>

//         {/* HEADER */}
//         <div className="text-center mb-4">
//           <h2 style={{ color: "#0d6efd", fontWeight: "bold" }}>
//             🚌 Bus Full Details
//           </h2>
//           <p style={{ color: "#6c757d" }}>Complete information overview</p>
//         </div>

//         {/* ================= BASIC INFO ================= */}
//         <div className="p-3 mb-3" style={{ background: "#f1f7ff", borderRadius: "10px" }}>
//           <h5 style={{ color: "#0d6efd" }}>Basic Info</h5>
//           <p><b>Bus Name:</b> {bus.busName}</p>
//           <p><b>Bus Number:</b> {bus.busNumber}</p>
//           <p><b>Operator:</b> {bus.operatorName}</p>
//           <p><b>Type:</b> {bus.busType}</p>

//           <p>
//             <b>Status:</b>{" "}
//             <span className={`badge ${
//               bus.status === "Active"
//                 ? "bg-success"
//                 : "bg-danger"
//             }`}>
//               {bus.status}
//             </span>
//           </p>
//         </div>

//         {/* ================= ROUTE ================= */}
//         <div className="p-3 mb-3" style={{ background: "#fff7ed", borderRadius: "10px" }}>
//           <h5 style={{ color: "#fd7e14" }}>Route</h5>

//           <p>
//             <b>From:</b> {bus.from?.city} ({bus.from?.code})
//           </p>
//           <p><b>State:</b> {bus.from?.state}</p>
//           <p><b>Bus Stand:</b> {bus.from?.busStand}</p>

//           <hr />

//           <p>
//             <b>To:</b> {bus.to?.city} ({bus.to?.code})
//           </p>
//           <p><b>State:</b> {bus.to?.state}</p>
//           <p><b>Bus Stand:</b> {bus.to?.busStand}</p>
//         </div>

//         {/* ================= TIMINGS ================= */}
//         <div className="p-3 mb-3" style={{ background: "#eef2ff", borderRadius: "10px" }}>
//           <h5 style={{ color: "#6610f2" }}>Timings</h5>
//           <p><b>Departure:</b> {new Date(bus.departureTime).toLocaleString()}</p>
//           <p><b>Arrival:</b> {new Date(bus.arrivalTime).toLocaleString()}</p>
//           <p><b>Duration:</b> {bus.duration} mins</p>
//         </div>

//         {/* ================= STOPS ================= */}
//         <div className="p-3 mb-3" style={{ background: "#f8f9fa", borderRadius: "10px" }}>
//           <h5 style={{ color: "#198754" }}>Stops</h5>

//           {bus.stops?.length > 0 ? (
//             bus.stops.map((stop, i) => (
//               <div key={i} className="mb-2 p-2" style={{ borderLeft: "4px solid #198754" }}>
//                 <p><b>City:</b> {stop.city}</p>
//                 <p><b>Bus Stand:</b> {stop.busStand}</p>
//                 <p><b>Arrival:</b> {new Date(stop.arrivalTime).toLocaleString()}</p>
//               </div>
//             ))
//           ) : (
//             <p>No Stops</p>
//           )}
//         </div>

//         {/* ================= DROPPING POINTS ================= */}
//         <div className="p-3 mb-3" style={{ background: "#e3f2fd", borderRadius: "10px" }}>
//           <h5>Dropping Points</h5>

//           {bus.droppingPoints?.length > 0 ? (
//             bus.droppingPoints.map((d, i) => (
//               <p key={i}>
//                 <b>{d.location}</b> - {d.address} ({new Date(d.time).toLocaleString()})
//               </p>
//             ))
//           ) : (
//             <p>No Dropping Points</p>
//           )}
//         </div>

//         {/* ================= SEATS ================= */}
//         <div className="p-3 mb-3" style={{ background: "#e8f5e9", borderRadius: "10px" }}>
//           <h5 style={{ color: "#198754" }}>Seats Info</h5>
//           <p><b>Total Seats:</b> {bus.totalSeats}</p>
//           <p><b>Available Seats:</b> {bus.availableSeats}</p>
//         </div>

//         {/* ================= SEAT LAYOUT ================= */}
//         <div className="p-3 mb-3" style={{ background: "#fff3cd", borderRadius: "10px" }}>
//           <h5 style={{ color: "#ffc107" }}>Seat Layout</h5>

//           {bus.seatLayout?.length > 0 ? (
//             bus.seatLayout.map((seat, i) => (
//               <p key={i}>
//                 <b>{seat.seatNumber}</b> - {seat.seatType} - ₹{seat.price} - {seat.isBooked ? "Booked" : "Available"}
//               </p>
//             ))
//           ) : (
//             <p>No Seat Layout</p>
//           )}
//         </div>

//         {/* ================= AMENITIES ================= */}
//         <div className="p-3 mb-3" style={{ background: "#fff7ed", borderRadius: "10px" }}>
//           <h5>Amenities</h5>

//           {bus.amenities?.length > 0 ? (
//             bus.amenities.map((a, i) => (
//               <p key={i}>
//                 {a.name} - {a.included ? "Included" : "Paid"}
//               </p>
//             ))
//           ) : (
//             <p>No Amenities</p>
//           )}
//         </div>

//         {/* ================= IMAGES ================= */}
//         <div className="p-3 mb-3" style={{ background: "#f1f7ff", borderRadius: "10px" }}>
//           <h5>Images</h5>

//           {bus.images?.length > 0 ? (
//             bus.images.map((img, i) => (
//               <img
//                 key={i}
//                 src={`http://localhost:5000/uploads/${img}`}
//                 alt="bus"
//                 style={{ width: "120px", marginRight: "10px", borderRadius: "8px" }}
//               />
//             ))
//           ) : (
//             <p>No Images</p>
//           )}
//         </div>

//         {/* ================= POLICY ================= */}
//         <div className="p-3 mb-3" style={{ background: "#fce4ec", borderRadius: "10px" }}>
//           <h5 style={{ color: "#d63384" }}>Cancellation Policy</h5>
//           <p><b>Refundable:</b> {bus.cancellationPolicy?.refundable ? "Yes" : "No"}</p>
//           <p><b>Charge:</b> {bus.cancellationPolicy?.cancellationCharge}%</p>
//           <p><b>Status:</b> {bus.cancellationPolicy?.status}</p>
//         </div>

//         {/* BACK BUTTON */}
//         <div className="text-center mt-3">
//           <Link to="/admin/bus" className="btn btn-primary px-4">
//             ← Back
//           </Link>
//         </div>

//       </div>

//     </div>

//   );
// }

// export default ViewBus;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ViewBus() {
  const { id } = useParams();
  const [bus, setBus] = useState(null);

  const getBus = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/api/v1/findOneBus/${id}`
      );
      setBus(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBus();
  }, [id]);

  if (!bus) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4 mb-5">

      <div className="card shadow-lg p-4" style={{ borderRadius: "12px" }}>

        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 style={{ color: "#0d6efd", fontWeight: "bold" }}>
            🚌 Bus Full Details
          </h2>
          <p style={{ color: "#6c757d" }}>Complete information overview</p>
        </div>

        {/* ================= BASIC INFO ================= */}
        <div className="p-3 mb-3" style={{ background: "#f1f7ff", borderRadius: "10px" }}>
          <h5 style={{ color: "#0d6efd" }}>Basic Info</h5>

          <p><b>_id:</b> {bus._id}</p>
          <p><b>busName:</b> {bus.busName}</p>
          <p><b>busNumber:</b> {bus.busNumber}</p>
          <p><b>operatorName:</b> {bus.operatorName}</p>
          <p><b>operatorId:</b> {bus.operatorId}</p>
          <p><b>busType:</b> {bus.busType}</p>
          <p><b>status:</b> {bus.status}</p>
        </div>

        {/* ================= ROUTE ================= */}
        <div className="p-3 mb-3" style={{ background: "#fff7ed", borderRadius: "10px" }}>
          <h5 style={{ color: "#fd7e14" }}>Route</h5>

          <p><b>from city:</b> {bus.from?.city}</p>
          <p><b>from state:</b> {bus.from?.state}</p>
          <p><b>from busStand:</b> {bus.from?.busStand}</p>
          <p><b>from code:</b> {bus.from?.code}</p>

          <hr />

          <p><b>to city:</b> {bus.to?.city}</p>
          <p><b>to state:</b> {bus.to?.state}</p>
          <p><b>to busStand:</b> {bus.to?.busStand}</p>
          <p><b>to code:</b> {bus.to?.code}</p>
        </div>

        {/* ================= TIMINGS ================= */}
        <div className="p-3 mb-3" style={{ background: "#eef2ff", borderRadius: "10px" }}>
          <h5 style={{ color: "#6610f2" }}>Timings</h5>

          <p><b>departureTime:</b> {new Date(bus.departureTime).toLocaleString()}</p>
          <p><b>arrivalTime:</b> {new Date(bus.arrivalTime).toLocaleString()}</p>
          <p><b>duration:</b> {bus.duration}</p>
        </div>

        {/* ================= STOPS ================= */}
        <div className="p-3 mb-3" style={{ background: "#f8f9fa", borderRadius: "10px" }}>
          <h5 style={{ color: "#198754" }}>Stops</h5>

          {bus.stops?.map((s, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <p><b>city:</b> {s.city}</p>
              <p><b>busStand:</b> {s.busStand}</p>
              <p><b>arrivalTime:</b> {new Date(s.arrivalTime).toLocaleString()}</p>
              <p><b>departureTime:</b> {new Date(s.departureTime).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </div>

        {/* ================= DROPPING POINTS ================= */}
        <div className="p-3 mb-3" style={{ background: "#e3f2fd", borderRadius: "10px" }}>
          <h5>Dropping Points</h5>

          {bus.droppingPoints?.map((d, i) => (
            <div key={i}>
              <p><b>location:</b> {d.location}</p>
              <p><b>address:</b> {d.address}</p>
              <p><b>time:</b> {new Date(d.time).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </div>

        {/* ================= SEATS ================= */}
        <div className="p-3 mb-3" style={{ background: "#e8f5e9", borderRadius: "10px" }}>
          <p><b>totalSeats:</b> {bus.totalSeats}</p>
          <p><b>availableSeats:</b> {bus.availableSeats}</p>
        </div>

        {/* ================= SEAT LAYOUT ================= */}
        <div className="p-3 mb-3" style={{ background: "#fff3cd", borderRadius: "10px" }}>
          <h5>Seat Layout</h5>

          {bus.seatLayout?.map((seat, i) => (
            <div key={i}>
              <p><b>seatNumber:</b> {seat.seatNumber}</p>
              <p><b>seatType:</b> {seat.seatType}</p>
              <p><b>gender:</b> {seat.gender}</p>
              <p><b>isBooked:</b> {seat.isBooked ? "true" : "false"}</p>
              <p><b>price:</b> {seat.price}</p>
              <hr />
            </div>
          ))}
        </div>

        {/* ================= AMENITIES ================= */}
        <div className="p-3 mb-3" style={{ background: "#fff7ed", borderRadius: "10px" }}>
          <h5>Amenities</h5>

          {bus.amenities?.map((a, i) => (
            <div key={i}>
              <p><b>name:</b> {a.name}</p>
              <p><b>included:</b> {a.included ? "true" : "false"}</p>
              <hr />
            </div>
          ))}
        </div>

        {/* ================= IMAGES (ONLY FIX) ================= */}
        <div className="p-3 mb-3" style={{ background: "#f1f7ff", borderRadius: "10px" }}>
          <h5>Images</h5>

          {bus.images?.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:5000/uploads/bus/${img}`}
              alt="bus"
              style={{
                width: "120px",
                height: "90px",
                objectFit: "cover",
                marginRight: "10px",
                borderRadius: "8px"
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/120";
              }}
            />
          ))}
        </div>

        {/* ================= POLICY ================= */}
        <div className="p-3 mb-3" style={{ background: "#fce4ec", borderRadius: "10px" }}>
          <h5>Cancellation Policy</h5>

          <p><b>refundable:</b> {bus.cancellationPolicy?.refundable ? "true" : "false"}</p>
          <p><b>cancellationCharge:</b> {bus.cancellationPolicy?.cancellationCharge}</p>
          <p><b>status:</b> {bus.status}</p>
        </div>

        {/* BACK */}
        <div className="text-center mt-3">
          <Link to="/admin/bus" className="btn btn-primary px-4">
            ← Back
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ViewBus;