import Header from "../Header";
import Footer from "../Footer";
import SideMenu from "../SideMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Trains() {




  const [trains, settrains] = useState([]);
  const [trainNumber, settrainNumber] = useState([]);
  const [trainName, settrainName] = useState([]);


  const sellerId = localStorage.getItem("sellerId");


  const fetchTrains = async () => {
    const response = await axios.get(`http://localhost:5000/api/seller/getTrain?sellerId=${sellerId}`)

    if (response.data.success) {
      settrains(response.data.data || []);
    }
  }
  useEffect(() => {
    fetchTrains();
  }, [])






  const searchTrains = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:5000/api/seller/searchTrain",
      {
        params: {
          trainName: trainName,
          trainNumber: trainNumber
        }
      }
    )
    console.log("response", response.data.data)
    if (response.data.success) {
      settrains(response.data.data);
    }
    else {
      console.log(response.data.message);
    }
  }
  const handleReset = async (e) => {
    e.preventDefault();
    settrainName("")
    settrainNumber("")
    settrains("")
    fetchTrains("")
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
      const response = await axios.delete(`http://localhost:5000/api/seller/deleteTrain/${itemId}`)

      if (response.data.success) {
        fetchTrains();
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

  };
  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        {/* 🔹 TOP LINE - Title */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center">

              <h1 className="m-0">Trains Manager</h1>
              <form onSubmit={searchTrains}>
                <div className="row mt-4">

                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by train name"
                      value={trainName}
                      onChange={(e) => settrainName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by  train number"
                      value={trainNumber}
                      onChange={(e) => settrainNumber(e.target.value)}
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
                  Trains List
                </h3>

                <div className="ml-auto">
                  <Link to="/admin/add-customer" className="btn btn-success">
                    <i className="fas fa-plus mr-2"></i>
                    Add Trains
                  </Link>
                </div>

              </div>

              {/* TABLE */}
              <div className="card-body">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Train name</th>
                      <th>Train number</th>
                      <th>from</th>
                      <th>to</th>
                      <th>Departure</th>
                      <th>Arrival</th>
                      <th>type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {trains.length > 0 ? (
                      trains.map((trains, index) => (
                        <tr key={trains.id}>
                          <td>{index + 1}</td>
                          <td>{trains.trainName}</td>
                          <td>{trains.trainNumber}</td>
                          <td>{trains.fromStation?.city}</td>
                          <td>{trains.toStation?.city}</td>
                          <td>{trains.arrivalTime}</td>
                          <td>{trains.departureTime}</td>
                          <td>{trains.trainType}</td>

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
    to={`/admin/train-view/${trains._id}`}
    className="btn btn-sm btn-info mr-2"
  >
    <i className="fas fa-eye"></i>
  </Link>


                            <Link
                              to={`/admin/edit-trains?_id=${trains._id}`}
                              className="btn btn-sm btn-primary mr-2"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>

                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(trains._id)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center text-danger">
                          No trains Found
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

export default Trains;