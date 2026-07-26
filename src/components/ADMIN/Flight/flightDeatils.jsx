
// import { useState } from "react";
// import Header from "../Header";
// import Footer from "../Footer";
// import SideMenu from "../SideMenu";
// import { Link } from "react-router-dom";

// function Flights() {

//   const [search, setSearch] = useState("");

 

//   // Search Filter
//   const filteredFlights = flights.filter((flight) =>
//     flight.flightNumber.toLowerCase().includes(search.toLowerCase()) ||
//     flight.airline.toLowerCase().includes(search.toLowerCase()) ||
//     flight.from.toLowerCase().includes(search.toLowerCase()) ||
//     flight.to.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="wrapper">

//       <Header />
//       <SideMenu />

//       <div className="content-wrapper">

//         {/* HEADER */}
//         <div className="content-header">
//           <div className="container-fluid">

//             <div className="d-flex justify-content-between align-items-center">

//               <h1 className="m-0">
//                 <i
//                   className="fas fa-plane-departure mr-2"
//                   style={{ color: "#4da6ff" }}
//                 ></i>

//                 Flights Manager
//               </h1>

//               <input
//                 type="text"
//                 className="form-control"
//                 style={{ width: "300px" }}
//                 placeholder="Search by Flight, Airline, Route..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />

//             </div>

//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="content">
//           <div className="container-fluid">

//             <div className="card shadow-sm">

//               {/* CARD HEADER */}
//               <div
//                 className="card-header d-flex align-items-center"
//                 style={{
//                   background: "#eaf4ff",
//                   borderBottom: "1px solid #dbeafe"
//                 }}
//               >

//                 <h3
//                   className="card-title m-0"
//                   style={{
//                     fontWeight: "bold",
//                     color: "#0f172a"
//                   }}
//                 >
//                   Flight List
//                 </h3>

//                 <div className="ml-auto">

//                   <Link
//                     to="/admin/add-flight"
//                     className="btn"
//                     style={{
//                       background: "#4da6ff",
//                       color: "#fff",
//                       borderRadius: "8px",
//                       fontWeight: "600"
//                     }}
//                   >
//                     <i className="fas fa-plus mr-2"></i>
//                     Add Flight
//                   </Link>

//                 </div>

//               </div>

//               {/* TABLE */}
//               <div className="card-body table-responsive">

//                 <table className="table table-bordered table-hover">

//                   <thead
//                     style={{
//                       background: "#f1f7ff"
//                     }}
//                   >
//                     <tr>
//                       <th>S.No</th>
//                       <th>Flight No.</th>
//                       <th>Airline</th>
//                       <th>Route</th>
//                       <th>Departure</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>

//                   <tbody>

//                     {filteredFlights.length > 0 ? (

//                       filteredFlights.map((flight, index) => (

//                         <tr key={flight.id}>

//                           <td>{index + 1}</td>

//                           <td>
//                             <b>{flight.flightNumber}</b>
//                           </td>

//                           <td>{flight.airline}</td>

//                           <td>
//                             {flight.from}
//                             <i
//                               className="fas fa-arrow-right mx-2"
//                               style={{ color: "#4da6ff" }}
//                             ></i>
//                             {flight.to}
//                           </td>

//                           <td>{flight.departure}</td>

//                           <td>

//                             <span
//                               className={`badge ${
//                                 flight.status === "On Time"
//                                   ? "badge-success"
//                                   : flight.status === "Delayed"
//                                   ? "badge-warning"
//                                   : "badge-danger"
//                               }`}
//                               style={{
//                                 padding: "8px 12px",
//                                 fontSize: "12px"
//                               }}
//                             >
//                               {flight.status}
//                             </span>

//                           </td>

//                           <td>

//                             <Link
//                               to="/admin/edit-flight"
//                               className="btn btn-sm btn-primary mr-2"
//                             >
//                               <i className="fas fa-edit"></i>
//                             </Link>

//                             <button className="btn btn-sm btn-danger">
//                               <i className="fas fa-trash"></i>
//                             </button>

//                           </td>

//                         </tr>

//                       ))

//                     ) : (

//                       <tr>

//                         <td
//                           colSpan="7"
//                           className="text-center text-danger"
//                         >
//                           No Flights Found
//                         </td>

//                       </tr>

//                     )}

//                   </tbody>

//                 </table>

//               </div>

//             </div>

//           </div>
//         </div>

//       </div>

//       <Footer />

//     </div>
//   );
// }

// export default Flights;





// import { useEffect, useState } from "react";
// import Header from "../Header";
// import Footer from "../Footer";
// import SideMenu from "../SideMenu";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";

// function Flights() {

//   const [search, setSearch] = useState("");
//   const [flights, setFlights] = useState([]);

//   // ================= VIEW FLIGHTS API =================
//   const getFlights = async () => {
//     const seller_id=localStorage.getItem("sellerId")

//     try {

//       const response = await axios.get(
//       `http://localhost:5000/viewFlight/${seller_id}`
//       );

//       console.log(response.data);

//       // API Data Set
//       setFlights(response.data.data);

//     } catch (error) {

//       console.log("Error Fetching Flights:", error.message);

//     }

//   };

//   // ================= PAGE LOAD =================
//   useEffect(() => {

//     getFlights();

//   }, []);


//   // ================Delete Flight ==================
//  const deleteFlight = async (id) => {
//   const result = await Swal.fire({
//     title: "Are you sure?",
//     text: "You will not be able to recover this flight!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   });

//   if (result.isConfirmed) {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/admin/api/v1/deleteflight/${id}`
//       );

//       if (response.data.success) {
//         Swal.fire("Deleted!", "Flight has been deleted", "success");
//         getFlights(); // refresh list
//       } else {
//         Swal.fire("Error", response.data.message, "error");
//       }
//     } catch (err) {
//       console.log(err);
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   }
// };




//   // ================= SEARCH FILTER =================
//   const filteredFlights = Array.isArray(flights)
//     ? flights.filter((flight) =>
//         flight.flightnumber
//           ?.toLowerCase()
//           .includes(search.toLowerCase()) ||

//         flight.airline
//           ?.toLowerCase()
//           .includes(search.toLowerCase()) ||

//         flight.from?.city
//           ?.toLowerCase()
//           .includes(search.toLowerCase()) ||

//         flight.to?.city
//           ?.toLowerCase()
//           .includes(search.toLowerCase())
//       )
//     : [];

//   return (

//     <div className="wrapper">

//       <Header />
//       <SideMenu />

//       <div className="content-wrapper">

//         {/* ================= HEADER ================= */}

//         <div className="content-header">

//           <div className="container-fluid">

//             <div className="d-flex justify-content-between align-items-center">

//               <h1 className="m-0">

//                 <i
//                   className="fas fa-plane-departure mr-2"
//                   style={{ color: "#4da6ff" }}
//                 ></i>

//                 Flights Manager

//               </h1>

//               <input
//                 type="text"
//                 className="form-control"
//                 style={{ width: "300px" }}
//                 placeholder="Search Flight..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />

//             </div>

//           </div>

//         </div>

//         {/* ================= CONTENT ================= */}

//         <div className="content">

//           <div className="container-fluid">

//             <div className="card shadow-sm">

//               {/* ================= CARD HEADER ================= */}

//               <div
//                 className="card-header d-flex align-items-center"
//                 style={{
//                   background: "#eaf4ff",
//                   borderBottom: "1px solid #dbeafe"
//                 }}
//               >

//                 <h3
//                   className="card-title m-0"
//                   style={{
//                     fontWeight: "bold",
//                     color: "#0f172a"
//                   }}
//                 >
//                   Flight List
//                 </h3>

//                 <div className="ml-auto">

//                   <Link
//                     to="/admin/add-flight"
//                     className="btn"
//                     style={{
//                       background: "#4da6ff",
//                       color: "#fff",
//                       borderRadius: "8px",
//                       fontWeight: "600"
//                     }}
//                   >

//                     <i className="fas fa-plus mr-2"></i>

//                     Add Flight

//                   </Link>

//                 </div>

//               </div>

//               {/* ================= TABLE ================= */}

//               <div className="card-body table-responsive">

//                 <table className="table table-bordered table-hover">

//                   <thead
//                     style={{
//                       background: "#f1f7ff"
//                     }}
//                   >

//                     <tr>

//                       <th>S.No</th>
//                       <th>Flight No.</th>
//                       <th>Airline</th>
//                       <th>Route</th>
//                       <th>Departure</th>
//                       <th>Status</th>
//                       <th>Actions</th>

//                     </tr>

//                   </thead>

//                   <tbody>

//                     {filteredFlights.length > 0 ? (

//                       filteredFlights.map((flight, index) => (

//                         <tr key={flight._id}>

//                           {/* S.NO */}

//                           <td>{index + 1}</td>

//                           {/* FLIGHT NUMBER */}

//                           <td>

//                             <b>{flight.flightnumber}</b>

//                           </td>

//                           {/* AIRLINE */}

//                           <td>{flight.airline}</td>

//                           {/* ROUTE */}

//                           <td>

//                             {flight.from?.city}

//                             <i
//                               className="fas fa-arrow-right mx-2"
//                               style={{ color: "#4da6ff" }}
//                             ></i>

//                             {flight.to?.city}

//                           </td>

//                           {/* DEPARTURE */}

//                           <td>

//                             {new Date(
//                               flight.departuretime
//                             ).toLocaleString()}

//                           </td>

//                           {/* STATUS */}

//                           <td>

//                             <span
//                               className={`badge ${
//                                 flight.status === "On Time"
//                                   ? "badge-success"
//                                   : flight.status === "Delayed"
//                                   ? "badge-warning"
//                                   : "badge-danger"
//                               }`}
//                               style={{
//                                 padding: "8px 12px",
//                                 fontSize: "12px"
//                               }}
//                             >

//                               {flight.status}

//                             </span>

//                           </td>

//                           {/* ACTIONS */}

//                           <td>

//                             <Link
//                               to={`/admin/edit-flight/${flight._id}`}
//                               className="btn btn-sm btn-primary mr-2"
//                             >

//                               <i className="fas fa-edit"></i>

//                             </Link>

//                             <button className="btn btn-sm btn-danger" onClick={() => deleteFlight(flight._id)}>

//                               <i className="fas fa-trash"></i>

//                             </button>

//                           </td>

//                         </tr>

//                       ))

//                     ) : (

//                       <tr>

//                         <td
//                           colSpan="7"
//                           className="text-center text-danger"
//                         >

//                           No Flights Found

//                         </td>

//                       </tr>

//                     )}

//                   </tbody>

//                 </table>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//       <Footer />

//     </div>

//   );

// }

// export default Flights;

import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Flights() {

  const [search, setSearch] = useState("");
  const [flights, setFlights] = useState([]);

  // ================= VIEW FLIGHTS API =================
  const getFlights = async () => {

    const seller_id = localStorage.getItem("sellerId");

    try {

      const response = await axios.get(
        `http://localhost:5000/viewFlight/${seller_id}`
      );

      setFlights(Array.isArray(response?.data?.data) ? response.data.data : (Array.isArray(response?.data) ? response.data : []));

    } catch (error) {

      console.log("Error Fetching Flights:", error.message);
      setFlights([]);

    }

  };

  // ================= SEARCH FLIGHT API =================
  const searchFlights = async () => {

    try {

      if (!search.trim()) {
        getFlights();
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/searchflight",
        {
          params: {
            flightnumber: search,
          },
        }
      );

      setFlights(Array.isArray(response?.data?.data) ? response.data.data : (Array.isArray(response?.data) ? response.data : []));

    } catch (error) {

      console.log("Error Searching Flights:", error.message);
      setFlights([]);

    }

  };

  // ================= CANCEL SEARCH =================
  const cancelSearch = () => {
    setSearch("");
    getFlights();
  };

  // ================= PAGE LOAD =================
  useEffect(() => {
    getFlights();
  }, []);

  // ================Delete Flight ==================
  const deleteFlight = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this flight!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {

      try {

        const response = await axios.delete(
          `http://localhost:5000/admin/api/v1/deleteflight/${id}`
        );

        if (response.data.success) {

          Swal.fire("Deleted!", "Flight has been deleted", "success");

          getFlights();

        } else {

          Swal.fire("Error", response.data.message, "error");

        }

      } catch (err) {

        Swal.fire("Error", "Something went wrong", "error");

      }

    }

  };

  return (

    <div className="wrapper">

      <Header />
      <SideMenu />

      <div className="content-wrapper">

        {/* ================= HEADER ================= */}

        <div className="content-header">

          <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center">

              <h1 className="m-0">

                <i className="fas fa-plane-departure mr-2" style={{ color: "#4da6ff" }}></i>

                Flights Manager

              </h1>

              {/* ================= SEARCH BOX + BUTTONS ================= */}

              <div className="d-flex align-items-center">

                <input
                  type="text"
                  className="form-control mr-2"
                  style={{ width: "250px" }}
                  placeholder="Search Flight Number..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <button
                  className="btn btn-primary mr-2"
                  onClick={searchFlights}
                >
                  <i className="fas fa-search mr-1"></i>
                  Search
                </button>

                <button
                  className="btn btn-danger"
                  onClick={cancelSearch}
                >
                  <i className="fas fa-times mr-1"></i>
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="content">

          <div className="container-fluid">

            <div className="card shadow-sm">

              <div
                className="card-header d-flex align-items-center"
                style={{ background: "#eaf4ff", borderBottom: "1px solid #dbeafe" }}
              >

                <h3 className="card-title m-0" style={{ fontWeight: "bold" }}>
                  Flight List
                </h3>

                <div className="ml-auto">

                  <Link
                    to="/admin/add-flight"
                    className="btn"
                    style={{
                      background: "#4da6ff",
                      color: "#fff",
                      borderRadius: "8px",
                      fontWeight: "600"
                    }}
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Add Flight
                  </Link>

                </div>

              </div>

              {/* ================= TABLE ================= */}

              <div className="card-body table-responsive">

                <table className="table table-bordered table-hover">

                  <thead style={{ background: "#f1f7ff" }}>
                    <tr>
                      <th>S.No</th>
                      <th>Flight No.</th>
                      <th>Airline</th>
                      <th>Route</th>
                      <th>Departure</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>

                    {Array.isArray(flights) && flights.length > 0 ? (

                      flights.map((flight, index) => (

                        <tr key={flight._id}>

                          <td>{index + 1}</td>
                          <td><b>{flight.flightnumber}</b></td>
                          <td>{flight.airline}</td>

                          <td>
                            {flight.from?.city}
                            <i className="fas fa-arrow-right mx-2" style={{ color: "#4da6ff" }}></i>
                            {flight.to?.city}
                          </td>

                          <td>
                            {new Date(flight.departuretime).toLocaleString()}
                          </td>

                          <td>
                            <span className={`badge ${
                              flight.status === "On Time"
                                ? "badge-success"
                                : flight.status === "Delayed"
                                ? "badge-warning"
                                : "badge-danger"
                            }`}>
                              {flight.status}
                            </span>
                          </td>

                          <td>
                           {/* VIEW */}
  <Link
    to={`/admin/view-flight/${flight._id}`}
    className="btn btn-sm btn-info mr-2"
  >
    <i className="fas fa-eye"></i>
  </Link>

                            <Link
                              to={`/admin/edit-flight/${flight._id}`}
                              className="btn btn-sm btn-primary mr-2"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteFlight(flight._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>
                        <td colSpan="7" className="text-center text-danger">
                          No Flights Found
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

export default Flights;