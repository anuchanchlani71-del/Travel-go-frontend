import React, { useEffect, useState } from "react";
import axios from "axios";

import Footer from "../ADMIN/Footer";
import SideMenu from "../SUPERADMIN/sidemenu";
import Header from "../SUPERADMIN/Header";

function SuperAdminProfile() {
  const [profile, setProfile] = useState({});

  const superadminId = localStorage.getItem("superadminId");

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/superadmin/my-profile",
        {
          params: {
            superadminId: superadminId
          }
        }
      );

      if (response.data.success) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content pt-4">
          <div className="container-fluid">

            <div className="card shadow">

              {/* Header */}
              <div
                className="card-header text-center"
                style={{
                  background:
                    "linear-gradient(135deg,#0d6efd,#6610f2)",
                  color: "#fff"
                }}
              >
                <h3 className="mb-0">
                  Super Admin Profile
                </h3>
              </div>

              <div className="card-body">

                {/* Profile Image */}
                <div className="text-center mb-4">

                  <img
                    src={
                      profile.image
                      
                    }
                    alt="profile"
                    className="img-circle elevation-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover"
                    }}
                  />

                  <h4 className="mt-3">
                    {profile.first_name} {profile.last_name}
                  </h4>

                  <span className="badge badge-primary">
                    {profile.role}
                  </span>
                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      value={profile.first_name || ""}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      value={profile.last_name || ""}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Email</label>
                    <input
                      className="form-control"
                      value={profile.email || ""}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Mobile</label>
                    <input
                      className="form-control"
                      value={profile.mobile || ""}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Role</label>
                    <input
                      className="form-control"
                      value={profile.role || ""}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Status</label>

                    <div className="mt-2">
                      {profile.status ? (
                        <span className="badge badge-success p-2">
                          Active
                        </span>
                      ) : (
                        <span className="badge badge-danger p-2">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-12 mb-3">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={profile.address || ""}
                      readOnly
                    />
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default SuperAdminProfile;