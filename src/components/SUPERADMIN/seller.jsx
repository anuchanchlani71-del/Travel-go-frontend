import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../SUPERADMIN/Header";
import Footer from "../ADMIN/Footer";
import SideMenu from "../SUPERADMIN/sidemenu";

function Sellers() {

  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    const res = await axios.get("http://localhost:5000/superadmin/sellers");
    setSellers(res.data.data || []);
  };

  const handleToggleStatus = async (sellerId) => {
    try {
      const res = await axios.put(`http://localhost:5000/superadmin/update-seller-status/${sellerId}`);
      if (res.data.success) {
        setSellers(prev => prev.map(s => s._id === sellerId ? res.data.data : s));
      }
    } catch (error) {
      console.error(error);
      alert("Error toggling seller status");
    }
  };

  return (
    <div className="wrapper">

      {/* HEADER + SIDEBAR */}
      <Header />
      <SideMenu />

      <div className="content-wrapper">

        {/* PAGE HEADER */}
        <div className="content-header">
          <div className="container-fluid">
            <h1 className="m-0">Seller Management</h1>
          </div>
        </div>

        {/* CARD SECTION */}
        <div className="content">
          <div className="container-fluid">

            <div className="card shadow-sm">

              <div className="card-header">
                <h3 className="card-title">Seller List</h3>
              </div>

              <div className="card-body">

                <table className="table table-bordered table-striped">

                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {sellers.length > 0 ? (
                      sellers.map((seller, index) => (
                        <tr key={seller._id}>

                          <td>{index + 1}</td>

                          <td>{seller.companyName}</td>
                          <td>{seller.email}</td>
                          <td>{seller.phone}</td>

                          <td>
                            <span className="badge badge-info">
                              {seller.businessType}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`badge ${
                                seller.status === "approved"
                                  ? "badge-success"
                                  : seller.status === "rejected"
                                  ? "badge-danger"
                                  : "badge-warning"
                              }`}
                            >
                              {seller.status}
                            </span>
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-info mr-2"
                              onClick={() => setSelectedSeller(seller)}
                              title="View Seller"
                            >
                              <i className="fas fa-eye"></i>
                            </button>

                            <button
                              className={`btn btn-sm ${seller.status === "Approved" || seller.status === "approved" ? "btn-warning" : "btn-success"}`}
                              onClick={() => handleToggleStatus(seller._id)}
                              title="Toggle Seller Status"
                            >
                              <i className={`fas ${seller.status === "Approved" || seller.status === "approved" ? "fa-toggle-on" : "fa-toggle-off"}`} style={{ fontSize: "1.1rem" }}></i>
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center text-danger">
                          No Sellers Found
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

      {/* SELLER DETAIL MODAL */}
      {selectedSeller && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "14px", overflow: "hidden" }}>
              <div className="modal-header bg-dark text-white p-3">
                <h5 className="modal-title font-weight-bold m-0">
                  <i className="fas fa-store mr-2"></i> Seller Details
                </h5>
                <button
                  type="button"
                  className="close text-white"
                  onClick={() => setSelectedSeller(null)}
                  style={{ opacity: 0.9 }}
                >
                  <span>&times;</span>
                </button>
              </div>

              <div className="modal-body p-4" style={{ fontSize: "0.95rem" }}>
                {/* Section 1: Basic & Company Info */}
                <h6 className="text-primary font-weight-bold border-bottom pb-2 mb-3">
                  <i className="fas fa-building mr-2"></i> Company Information
                </h6>
                <div className="row mb-3">
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Company Name</span>
                    <strong>{selectedSeller.companyName || "N/A"}</strong>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Business Type</span>
                    <span className="badge badge-info px-2 py-1">{selectedSeller.businessType || "N/A"}</span>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Contact Person Name</span>
                    <strong>{selectedSeller.name || "N/A"}</strong>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Email Address</span>
                    <strong>{selectedSeller.email || "N/A"}</strong>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Phone Number</span>
                    <strong>{selectedSeller.phone || "N/A"}</strong>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">GST Number</span>
                    <strong>{selectedSeller.gstNumber || "N/A"}</strong>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Registration Number</span>
                    <strong>{selectedSeller.registrationNumber || "N/A"}</strong>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Status</span>
                    <span className={`badge px-2 py-1 ${
                      selectedSeller.status === "Approved" || selectedSeller.status === "approved"
                        ? "badge-success"
                        : selectedSeller.status === "Rejected" || selectedSeller.status === "rejected"
                        ? "badge-danger"
                        : "badge-warning"
                    }`}>
                      {selectedSeller.status || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Section 2: Address Details */}
                <h6 className="text-primary font-weight-bold border-bottom pb-2 mb-3 mt-4">
                  <i className="fas fa-map-marker-alt mr-2"></i> Address Details
                </h6>
                <div className="row mb-3">
                  <div className="col-md-12 mb-2">
                    <span className="text-muted d-block small">Full Address</span>
                    <strong>{selectedSeller.address?.fullAddress || "N/A"}</strong>
                  </div>
                  <div className="col-md-4 mb-2">
                    <span className="text-muted d-block small">City</span>
                    <strong>{selectedSeller.address?.city || "N/A"}</strong>
                  </div>
                  <div className="col-md-4 mb-2">
                    <span className="text-muted d-block small">State</span>
                    <strong>{selectedSeller.address?.state || "N/A"}</strong>
                  </div>
                  <div className="col-md-4 mb-2">
                    <span className="text-muted d-block small">Country / Pin Code</span>
                    <strong>{selectedSeller.address?.country || "India"} - {selectedSeller.address?.pinCode || "N/A"}</strong>
                  </div>
                </div>

                {/* Section 3: Bank Details */}
                <h6 className="text-primary font-weight-bold border-bottom pb-2 mb-3 mt-4">
                  <i className="fas fa-university mr-2"></i> Bank Details
                </h6>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Account Holder Name</span>
                    <strong>{selectedSeller.bankDetails?.accountHolderName || "N/A"}</strong>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Bank Name</span>
                    <strong>{selectedSeller.bankDetails?.bankName || "N/A"}</strong>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">Account Number</span>
                    <strong>{selectedSeller.bankDetails?.accountNumber || "N/A"}</strong>
                  </div>
                  <div className="col-md-6 mb-2">
                    <span className="text-muted d-block small">IFSC Code</span>
                    <strong>{selectedSeller.bankDetails?.ifscCode || "N/A"}</strong>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light p-3 d-flex justify-content-between">
                <span className="small text-muted">
                  Registered: {selectedSeller.createdAt ? new Date(selectedSeller.createdAt).toLocaleDateString() : "N/A"}
                </span>
                <button
                  className="btn btn-secondary px-4"
                  onClick={() => setSelectedSeller(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Sellers;