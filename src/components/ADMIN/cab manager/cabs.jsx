import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Cabs() {
  const [cabs, setCabs] = useState([]);
  const [cabName, setCabName] = useState("");
  const [cabNumber, setCabNumber] = useState("");
  const sellerId = localStorage.getItem("sellerId");
  console.log("sellerId", sellerId)

  const fetchCab = async () => {
    const response = await axios.get(`http://localhost:5000/api/seller/getCab?sellerId=${sellerId}`)
    console.log("responsecabs", response)
    if (response.data.success) {
      setCabs(response.data.data || []);
    }
  }
  useEffect(() => {
    fetchCab();
  }, [])




  const searchCabs = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:5000/api/seller/searchCab",
      {
        params: {
          cabName: cabName,
          cabNumber: cabNumber
        }
      }
    )

    console.log("response", response.data.data)
    if (response.data.success) {
      setCabs(response.data.data);
    }
  }
  const handleReset = async (e) => {
    e.preventDefault();
    setCabName("");
    setCabNumber("");
    setCabs("");
    fetchCab("")

  }

  const handleDelete = async (itemId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will not be able to recover this item!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel'
    });
    if (result.isConfirmed) {

      Swal.showLoading();
      const response = await axios.delete(`http://localhost:5000/api/seller/deleteCab/${itemId}`)
      if (response.data.success) {
        fetchCab();
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );

      } else {
        Swal.fire({
          title: "Ooops!!!",
          text: response.data.message,
          icon: "error"
        });
      }
    }
  }
  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        {/* 🔹 TOP LINE - Title */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">

              <h1 className="m-0">Cabs Manager</h1>
              <form onSubmit={searchCabs}>
                <div className="row mt-4">

                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by cab name"
                      value={cabName}
                      onChange={(e) => setCabName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by  cab number"
                      value={cabNumber}
                      onChange={(e) => setCabName(e.target.value)}
                    />
                  </div>


                  <div className="col-md-3 d-flex">

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-60 mr-2"
                    >
                      Search
                    </button>

                    <button
                      type="reset"
                      onClick={handleReset}
                      className="btn btn-secondary btn-lg w-60"
                    >
                      Reset
                    </button>

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>

        {/* 🔹 CARD SECTION */}
        <div className="content">
          <div className="container-fluid">
            <div className="card">

              {/* Customer List + Add Button */}
              <div className="card-header d-flex align-items-center">

                <h3 className="card-title m-0" style={{ fontWeight: "bold" }}>
                  cabs List
                </h3>

                <div className="ml-auto">
                  <Link to="/admin/add-cabs" className="btn btn-success">
                    <i className="fas fa-plus mr-2"></i>
                    Add cabs
                  </Link>
                </div>

              </div>

              {/* TABLE */}
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      {/* <th>cab image</th> */}
                      <th>cab name</th>
                      <th>cab number</th>
                      <th>city</th>
                      <th>Driver name</th>
                      <th>Driver phone</th>
                      <th>vehicle Type</th>
                      {/* <th>seats</th> */}
                      {/* <th>Base fare</th> */}
                      {/* <th>Price/KM</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cabs.length > 0 ? (
                      cabs.map((cabs, index) => (
                        <tr key={cabs._id}>
                          <td>{index + 1}</td>
                          {/* <td>{cabs.cabImage}</td> */}
                          <td>{cabs.cabName}</td>

                          <td>{cabs.cabNumber}</td>
                           <td>{cabs.city}</td>
                          <td>{cabs.driverName}</td>
                          <td>{cabs.driverPhone}</td>
                          <td>{cabs.vehicleType}</td>
                          {/* <td>{cabs.seatingCapacity}</td> */}
                          {/* <td>{cabs.baseFare}</td> */}
                          {/* <td>{cabs.pricePerKm}</td> */}




                          {/* <td>
                            <span
                              className={`badge ${
                                .status === "Active"
                                  ? "badge-success"
                                  : "badge-danger"
                              }`}
                            >
                              {customer.status}
                            </span>
                          </td> */}
                          <td>

 <Link
    to={`/admin/cab-view/${cabs._id}`}
    className="btn btn-sm btn-info mr-2"
  >
    <i className="fas fa-eye"></i>
  </Link>


                            <Link

                              to={`/admin/editCabs/?_id=${cabs._id}`}

                              className="btn btn-sm btn-primary mr-2"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>

                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cabs._id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center text-danger">
                          No Cabs Found
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

export default Cabs;