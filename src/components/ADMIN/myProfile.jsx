import React, { useEffect, useState } from "react";
import axios from "axios";

import Footer from "./Footer";
import SideMenu from "./SideMenu";
import Header from "./Header";

export default function CompanyProfile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    businessType: "",
    gstNumber: "",
    registrationNumber: "",

    address: {
      country: "",
      state: "",
      city: "",
      fullAddress: "",
      pinCode: "",
    },

    bankDetails: {
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
    },

    status: "",
    isVerified: false,
    createdAt: "",
  });

  const sellerId = localStorage.getItem("sellerId");

  const getProfile = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/company/myProfile",
        {
          params: {
            sellerId: sellerId,
          },
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

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d8dee9",
    background: "#f8fafc",
    outline: "none",
    fontSize: "14px",
    color: "#2d3748",
    fontWeight: "500",
  };

  const sectionTitle = {
    color: "#0f172a",
    fontSize: "22px",
    fontWeight: "700",
    marginTop: "35px",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "2px solid #e2e8f0",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: "20px",
  };

  const Input = ({ label, value }) => (
    <div>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
          color: "#334155",
        }}
      >
        {label}
      </label>

      <input
        type="text"
        value={value || ""}
        readOnly
        style={inputStyle}
      />
    </div>
  );

  return (
    <div className="wrapper">

      <SideMenu />
      <Header />

      <div
        style={{
          marginLeft: "270px",
          marginTop: "70px",
          padding: "30px",
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >

        <div
          style={{
            width: "100%",
            background: "#fff",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(0,0,0,.12)",
          }}
        >

          <div
            style={{
              background: "linear-gradient(90deg,#003366,#0d6efd)",
              padding: "40px",
              color: "#fff",
            }}
          >

            <h2 style={{ margin: 0 }}>
              Company Profile
            </h2>

            <p style={{ marginTop: "8px", opacity: ".9" }}>
              View complete company information
            </p>

          </div>

          <div style={{ padding: "35px" }}>
            {/* ================= OWNER DETAILS ================= */}

<h3 style={sectionTitle}>
  👤 Owner Details
</h3>

<div style={gridStyle}>

  <Input
    label="Owner Name"
    value={profile.name}
  />

  <Input
    label="Email Address"
    value={profile.email}
  />

  <Input
    label="Phone Number"
    value={profile.phone}
  />

</div>


{/* ================= COMPANY DETAILS ================= */}

<h3 style={sectionTitle}>
  🏢 Company Details
</h3>

<div style={gridStyle}>

  <Input
    label="Company Name"
    value={profile.companyName}
  />

  <Input
    label="Business Type"
    value={profile.businessType}
  />

  <Input
    label="GST Number"
    value={profile.gstNumber}
  />

  <Input
    label="Registration Number"
    value={profile.registrationNumber}
  />

</div>


{/* ================= ADDRESS DETAILS ================= */}

<h3 style={sectionTitle}>
  📍 Address Details
</h3>

<div style={gridStyle}>

  <Input
    label="Country"
    value={profile.address?.country}
  />

  <Input
    label="State"
    value={profile.address?.state}
  />

  <Input
    label="City"
    value={profile.address?.city}
  />

  <Input
    label="Pin Code"
    value={profile.address?.pinCode}
  />

  <div style={{ gridColumn: "1 / -1" }}>

    <label
      style={{
        display: "block",
        marginBottom: "8px",
        fontWeight: "600",
        color: "#334155",
      }}
    >
      Full Address
    </label>

    <textarea
      value={profile.address?.fullAddress || ""}
      readOnly
      rows={4}
      style={{
        ...inputStyle,
        resize: "none",
      }}
    />

  </div>

</div>
{/* ================= BANK DETAILS ================= */}

<h3 style={sectionTitle}>
  🏦 Bank Details
</h3>

<div style={gridStyle}>

  <Input
    label="Account Holder Name"
    value={profile.bankDetails?.accountHolderName}
  />

  <Input
    label="Bank Name"
    value={profile.bankDetails?.bankName}
  />

  <Input
    label="Account Number"
    value={profile.bankDetails?.accountNumber}
  />

  <Input
    label="IFSC Code"
    value={profile.bankDetails?.ifscCode}
  />

</div>


{/* ================= ACCOUNT STATUS ================= */}

<h3 style={sectionTitle}>
  📊 Account Status
</h3>

<div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  }}
>

  <div
    style={{
      padding: "12px 20px",
      borderRadius: "30px",
      background:
        profile.status === "Approved"
          ? "#d1fae5"
          : profile.status === "Pending"
          ? "#fef3c7"
          : "#fee2e2",
      color:
        profile.status === "Approved"
          ? "#065f46"
          : profile.status === "Pending"
          ? "#92400e"
          : "#991b1b",
      fontWeight: "600",
    }}
  >
    Status : {profile.status}
  </div>

  <div
    style={{
      padding: "12px 20px",
      borderRadius: "30px",
      background: profile.isVerified ? "#d1fae5" : "#fee2e2",
      color: profile.isVerified ? "#065f46" : "#991b1b",
      fontWeight: "600",
    }}
  >
    {profile.isVerified
      ? "✔ Verified Company"
      : "❌ Not Verified"}
  </div>

</div>


{/* ================= CREATED DATE ================= */}

<div style={{ marginTop: "30px" }}>

  <Input
    label="Account Created"
    value={
      profile.createdAt
        ? new Date(profile.createdAt).toLocaleString()
        : ""
    }
  />

</div>

          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}