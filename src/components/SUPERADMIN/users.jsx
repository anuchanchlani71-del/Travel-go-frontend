import axios from "axios";
import { useEffect, useState } from "react";

import Header from "../SUPERADMIN/Header";
import Footer from "../ADMIN/Footer";
import SideMenu from "../SUPERADMIN/sidemenu";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/superadmin/users");
    setUsers(res.data.data || []);
  };

  const handleToggleStatus = async (userId) => {
    try {
      const res = await axios.put(`http://localhost:5000/superadmin/update-user-status/${userId}`);
      if (res.data.success) {
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: !u.status } : u));
      }
    } catch (error) {
      console.error(error);
      alert("Error toggling user status");
    }
  };

  return (
    <div className="wrapper">

      <Header />
      <SideMenu />

      <div className="content-wrapper">

        {/* HEADER SECTION (like Cabs page) */}
        <div className="content-header">
          <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center">

              <h1 className="m-0">Users Manager</h1>

            </div>

          </div>
        </div>

        {/* CARD SECTION */}
        <div className="content">
          <div className="container-fluid">

            <div className="card shadow-sm">

              {/* CARD HEADER */}
              <div className="card-header d-flex align-items-center">

                <h3 className="card-title m-0" style={{ fontWeight: "bold" }}>
                  Users List
                </h3>

              </div>

              {/* TABLE BODY */}
              <div className="card-body">

                <table className="table table-bordered table-striped">

                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Profile</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user._id}>

                          <td>{index + 1}</td>

                          <td>
                            <img
                              src={user.image || "https://via.placeholder.com/40"}
                              width="40"
                              height="40"
                              style={{ borderRadius: "50%" }}
                            />
                          </td>

                          <td>
                            {user.first_name} {user.last_name}
                          </td>

                          <td>{user.email}</td>
                          <td>{user.mobile}</td>
                          <td>
                            <span className="badge badge-info">
                              {user.role}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`badge ${
                                user.status ? "badge-success" : "badge-danger"
                              }`}
                            >
                              {user.status ? "Active" : "Inactive"}
                            </span>
                          </td>

                          <td>
                            <button
                              className="btn btn-sm btn-info mr-2"
                              onClick={() => setSelectedUser(user)}
                              title="View User"
                            >
                              <i className="fas fa-eye"></i>
                            </button>

                            <button
                              className={`btn btn-sm ${user.status ? "btn-warning" : "btn-success"}`}
                              onClick={() => handleToggleStatus(user._id)}
                              title="Toggle Status"
                            >
                              <i className={`fas ${user.status ? "fa-toggle-on" : "fa-toggle-off"}`} style={{ fontSize: "1.1rem" }}></i>
                            </button>
                          </td>

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center text-danger">
                          No Users Found
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

      {/* USER MODAL */}
      {selectedUser && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">

            <div className="modal-content p-3">

              <div className="modal-header">
                <h5>User Details</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedUser(null)}
                />
              </div>

              <div className="modal-body text-center">

                <img
                  src={selectedUser.image || "https://via.placeholder.com/100"}
                  width="100"
                  height="100"
                  style={{ borderRadius: "50%" }}
                />

                <h4 className="mt-2">
                  {selectedUser.first_name} {selectedUser.last_name}
                </h4>

                <p>{selectedUser.email}</p>
                <p>{selectedUser.mobile}</p>
                <p><b>Address:</b> {selectedUser.address}</p>

                <span className="badge badge-info">
                  {selectedUser.role}
                </span>

                <br />

                <span
                  className={`badge mt-2 ${
                    selectedUser.status ? "badge-success" : "badge-danger"
                  }`}
                >
                  {selectedUser.status ? "Active" : "Inactive"}
                </span>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Users;