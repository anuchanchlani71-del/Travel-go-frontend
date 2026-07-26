import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import SideMenu from "../sidemenu";
import Header from "../Header";
import Footer from "../../ADMIN/Footer";


function DestinationManager() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    getDestinations();
  }, []);

  const getDestinations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/popular-destinations");

      if (res.data.success) {
        setDestinations(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDestination = async (id) => {

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this destination?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/delete-destination/${id}`
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        getDestinations();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        <section className="content-header">

          <div className="container-fluid d-flex justify-content-between align-items-center">
            <h1>Destination Manager</h1>

            <Link
              to="/superadmin/add-sliders"
              className="btn btn-primary"
            >
              Add Destination
            </Link>
          </div>
        </section>

        <section className="content">
          <div className="card">
            <div className="card-body table-responsive">

              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Tag</th>
                    <th>Price</th>
                    <th width="180">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {destinations.length > 0 ? (
                    destinations.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>

                        <td>
                          <img
                            src={item.image}
                            alt={item.name}
                            width="80"
                            height="60"
                            style={{ objectFit: "cover" }}
                          />
                        </td>

                        <td>{item.name}</td>

                        <td>{item.tag}</td>

                        <td>₹ {item.price}</td>

                        <td>
                          <Link
                            to={`/superadmin/update-sliders/${item._id}`}
                            className="btn btn-warning btn-sm mr-2"
                          >
                            Edit
                          </Link>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteDestination(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No Destinations Found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>

            </div>
          </div>
        </section>
      </div>
     <Footer/>
    </div>
  );
}

export default DestinationManager;