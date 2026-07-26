// import { useEffect, useMemo, useState } from "react";
// import Header from "../Header";
// import Footer from "../Footer";
// import SideMenu from "../SideMenu";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";

// function Buses() {

//   const [search, setSearch] = useState("");
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   // ================= API BASE URL =================
//   const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   // ================= VIEW BUSES API =================
//   const getBuses = async () => {

//     try {

//       setLoading(true);

//       const response = await axios.get(
//         `${API}/viewBus`
//       );

//       console.log(response.data);

//       // API Data Set
//       setBuses(response.data?.data || []);

//     } catch (error) {

//       console.log("Error Fetching Buses:", error.message);

//     } finally {

//       setLoading(false);

//     }

//   };

//   // ================= PAGE LOAD =================
//   useEffect(() => {

//     getBuses();

//   }, []);

//   // ================= DELETE BUS =================
//   const deleteBus = async (id) => {

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this bus!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {

//       try {

//         setDeletingId(id);

//         const response = await axios.delete(
//           `${API}/admin/api/v1/deletebus/${id}`
//         );

//         if (response.data.success) {

//           Swal.fire(
//             "Deleted!",
//             "Bus has been deleted",
//             "success"
//           );

//           getBuses();

//         } else {

//           Swal.fire(
//             "Error",
//             response.data.message,
//             "error"
//           );

//         }

//       } catch (err) {

//         console.log(err);

//         Swal.fire(
//           "Error",
//           "Something went wrong",
//           "error"
//         );

//       } finally {

//         setDeletingId(null);

//       }

//     }

//   };

//   // ================= STATUS BADGE =================
//   const getStatusClass = (status) => {

//     switch (status) {

//       case "Active":
//         return "badge-success";

//       case "Delayed":
//         return "badge-warning";

//       case "Cancelled":
//         return "badge-danger";

//       default:
//         return "badge-secondary";

//     }

//   };

//   // ================= SEARCH FILTER =================
//   const filteredBuses = useMemo(() => {

//     return Array.isArray(buses)

//       ? buses.filter((bus) =>

//           bus.busName
//             ?.toLowerCase()
//             .includes(search.toLowerCase()) ||

//           bus.busNumber
//             ?.toLowerCase()
//             .includes(search.toLowerCase()) ||

//           bus.operatorName
//             ?.toLowerCase()
//             .includes(search.toLowerCase()) ||

//           bus.from?.city
//             ?.toLowerCase()
//             .includes(search.toLowerCase()) ||

//           bus.to?.city
//             ?.toLowerCase()
//             .includes(search.toLowerCase())

//         )

//       : [];

//   }, [buses, search]);

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
//                   className="fas fa-bus mr-2"
//                   style={{ color: "#4da6ff" }}
//                 ></i>

//                 Bus Manager

//               </h1>

//               <input
//                 type="text"
//                 className="form-control"
//                 style={{ width: "300px" }}
//                 placeholder="Search Bus..."
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
//                   Bus List
//                 </h3>

//                 <div className="ml-auto">

//                   <Link
//                     to="/admin/add-bus"
//                     className="btn"
//                     style={{
//                       background: "#4da6ff",
//                       color: "#fff",
//                       borderRadius: "8px",
//                       fontWeight: "600"
//                     }}
//                   >

//                     <i className="fas fa-plus mr-2"></i>

//                     Add Bus

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
//                       <th>Bus No.</th>
//                       <th>Bus Name</th>
//                       <th>Operator</th>
//                       <th>Bus Type</th>
//                       <th>Route</th>
//                       <th>Departure</th>
//                       <th>Seats</th>
//                       <th>Price</th>
//                       <th>Status</th>
//                       <th>Actions</th>

//                     </tr>

//                   </thead>

//                   <tbody>

//                     {loading ? (

//                       <tr>

//                         <td
//                           colSpan="11"
//                           className="text-center"
//                         >

//                           Loading Buses...

//                         </td>

//                       </tr>

//                     ) : filteredBuses.length > 0 ? (

//                       filteredBuses.map((bus, index) => (

//                         <tr key={bus._id}>

//                           {/* S.NO */}

//                           <td>{index + 1}</td>

//                           {/* BUS NUMBER */}

//                           <td>

//                             <b>{bus.busNumber}</b>

//                           </td>

//                           {/* BUS NAME */}

//                           <td>{bus.busName}</td>

//                           {/* OPERATOR */}

//                           <td>{bus.operatorName}</td>

//                           {/* BUS TYPE */}

//                           <td>{bus.busType}</td>

//                           {/* ROUTE */}

//                           <td>

//                             {bus.from?.city}

//                             <i
//                               className="fas fa-arrow-right mx-2"
//                               style={{ color: "#4da6ff" }}
//                             ></i>

//                             {bus.to?.city}

//                           </td>

//                           {/* DEPARTURE */}

//                           <td>

//                             {new Date(
//                               bus.departureTime
//                             ).toLocaleString("en-IN", {
//                               dateStyle: "medium",
//                               timeStyle: "short",
//                             })}

//                           </td>

//                           {/* SEATS */}

//                           <td>

//                             {bus.availableSeats}/
//                             {bus.totalSeats}

//                           </td>

//                           {/* PRICE */}

//                           <td>

//                             ₹{bus.price}

//                           </td>

//                           {/* STATUS */}

//                           <td>

//                             <span
//                               className={`badge ${getStatusClass(
//                                 bus.status
//                               )}`}
//                               style={{
//                                 padding: "8px 12px",
//                                 fontSize: "12px"
//                               }}
//                             >

//                               {bus.status}

//                             </span>

//                           </td>

//                           {/* ACTIONS */}

//                           <td>

//                             <Link
//                               to={`/admin/edit-bus/${bus._id}`}
//                               className="btn btn-sm btn-primary mr-2"
//                             >

//                               <i className="fas fa-edit"></i>

//                             </Link>

//                             <button
//                               className="btn btn-sm btn-danger"
//                               onClick={() =>
//                                 deleteBus(bus._id)
//                               }
//                               disabled={
//                                 deletingId === bus._id
//                               }
//                             >

//                               <i className="fas fa-trash"></i>

//                             </button>

//                           </td>

//                         </tr>

//                       ))

//                     ) : (

//                       <tr>

//                         <td
//                           colSpan="11"
//                           className="text-center text-danger"
//                         >

//                           No Buses Found

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

// export default Buses;


import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function BusDeatil() {

  const [search, setSearch] = useState("");
  const [buses, setBuses] = useState([]);

  // ================= VIEW BUSES =================
  const getBuses = async () => {

    try {
const seller_id=localStorage.getItem("sellerId")
      const response = await axios.get(
        `http://localhost:5000/admin/api/v1/viewallbusdata/${seller_id}`
      );

      console.log(response.data);

      setBuses(response.data.data);

    } catch (error) {

      console.log("Error Fetching Buses:", error.message);

    }

  };

  // ================= PAGE LOAD =================
  useEffect(() => {

    getBuses();

  }, []);
const searchBus = async (value) => {

  try {

    if (!value.trim()) {
      getBuses();
      return;
    }

    const seller_id = localStorage.getItem("sellerId");

    const response = await axios.get(
      `http://localhost:5000/searchBus/${seller_id}?busNumber=${value}`
    );

    setBuses(response.data.data);
    console.log(response.data);

  } catch (error) {

    console.log(error);

  }

};
  // ================= DELETE BUS =================
  const deleteBus = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this bus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {

      try {

        const response = await axios.delete(
          `http://localhost:5000/admin/api/v1/deleteBusData/${id}`
        );

        if (response.data.success) {

          Swal.fire(
            "Deleted!",
            "Bus has been deleted.",
            "success"
          );

          getBuses();

        } else {

          Swal.fire(
            "Error",
            response.data.message,
            "error"
          );

        }

      } catch (err) {

        console.log(err);

        Swal.fire(
          "Error",
          "Something went wrong",
          "error"
        );

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

                <i
                  className="fas fa-bus mr-2"
                  style={{ color: "#4da6ff" }}
                ></i>

                Bus Manager

              </h1>

      <div className="d-flex align-items-center">

  <input
    type="text"
    className="form-control mr-2"
    style={{ width: "250px" }}
    placeholder="Search Bus Number..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <button
    className="btn btn-primary mr-2"
    onClick={() => searchBus(search)}
  >
    <i className="fas fa-search mr-1"></i>
    Search
  </button>

  <button
    className="btn btn-danger"
    onClick={() => {
      setSearch("");
      getBuses();
    }}
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

              {/* ================= CARD HEADER ================= */}

              <div
                className="card-header d-flex align-items-center"
                style={{
                  background: "#eaf4ff",
                  borderBottom: "1px solid #dbeafe"
                }}
              >

                <h3
                  className="card-title m-0"
                  style={{
                    fontWeight: "bold",
                    color: "#0f172a"
                  }}
                >
                  Bus List
                </h3>

                <div className="ml-auto">

                  <Link
                    to="/admin/add-bus"
                    className="btn"
                    style={{
                      background: "#4da6ff",
                      color: "#fff",
                      borderRadius: "8px",
                      fontWeight: "600"
                    }}
                  >

                    <i className="fas fa-plus mr-2"></i>

                    Add Bus

                  </Link>

                </div>

              </div>

              {/* ================= TABLE ================= */}

              <div className="card-body table-responsive">

                <table className="table table-bordered table-hover">

                  <thead
                    style={{
                      background: "#f1f7ff"
                    }}
                  >

                    <tr>

                      <th>S.No</th>
                      <th>Bus No.</th>
                      <th>Bus Name</th>
                      {/* <th>Operator</th> */}
                      <th>Route</th>
                      <th>Departure</th>
                      <th>Bus Type</th>
                      <th>Status</th>
                      <th>Actions</th>

                    </tr>

                  </thead>

                  <tbody>

                    {buses.length > 0? (

                      buses.map((bus, index) => (

                        <tr key={bus._id}>

                          {/* S.NO */}

                          <td>{index + 1}</td>

                          {/* BUS NUMBER */}

                          <td>

                            <b>{bus.busNumber}</b>

                          </td>

                          {/* BUS NAME */}

                          <td>{bus.busName}</td>

                          {/* OPERATOR */}

                          {/* <td>{bus.operatorName}</td> */}

                          {/* ROUTE */}

                          <td>

                            {bus.from?.city}

                            <i
                              className="fas fa-arrow-right mx-2"
                              style={{ color: "#4da6ff" }}
                            ></i>

                            {bus.to?.city}

                          </td>

                          {/* DEPARTURE */}

                          <td>

                            {new Date(
                              bus.departureTime
                            ).toLocaleString()}

                          </td>

                          {/* BUS TYPE */}

                          <td>{bus.busType}</td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`badge ${
                                bus.status === "Active"
                                  ? "badge-success"
                                  : bus.status === "Delayed"
                                  ? "badge-warning"
                                  : "badge-danger"
                              }`}
                              style={{
                                padding: "8px 12px",
                                fontSize: "12px"
                              }}
                            >

                              {bus.status}

                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td>
                                                     {/* VIEW */}
  <Link
    to={`/admin/view-bus/${bus._id}`}
    className="btn btn-sm btn-info mr-2"
  >
    <i className="fas fa-eye"></i>
  </Link>

                            <Link
                              to={`/admin/edit-bus/${bus._id}`}
                              className="btn btn-sm btn-primary mr-2"
                            >

                              <i className="fas fa-edit"></i>

                            </Link>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => deleteBus(bus._id)}
                            >

                              <i className="fas fa-trash"></i>

                            </button>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td
                          colSpan="9"
                          className="text-center text-danger"
                        >

                          No Buses Found

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

export default BusDeatil;