import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
} from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const SellerRegister = () => {

  const [showPassword, setShowPassword] = useState(false);

 const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  password: "",
  companyName: "",
  businessType: "",
  gstNumber: "",
  registrationNumber: "",
  
  address: {
    country: "",
    state: "",
    city: "",
    fullAddress: "",
    pinCode: ""
  },

  bankDetails: {
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: ""
  }
});

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (["accountHolderName", "accountNumber", "ifscCode", "bankName"].includes(name)) {
    setFormData({
      ...formData,
      bankDetails: {
        ...formData.bankDetails,
        [name]: value,
      },
    });
  } 
  else if (["country", "state", "city", "fullAddress", "pinCode"].includes(name)) {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  } 
  else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};

  const handleSubmit = async (e) => {

    e.preventDefault();
     console.log("🔥 FINAL FORM DATA:", formData);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/company/registration",
        formData
      );

      toast.success(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        companyName: "",
        businessType: "",
        gstNumber: "",
        registrationNumber: "",
        address: {
    country: "",
    state: "",
    city: "",
    fullAddress: "",
    pinCode: ""
  },
        bankDetails: {
          accountHolderName: "",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
        },
      });
      navigate("/admin");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  return (
    <>
      <Toaster position="top-right" />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px 0",

         

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container>

          <Card
            style={{
              border: "1px solid rgba(255,255,255,.25)",
              borderRadius: "25px",
              overflow: "hidden",

              background: "rgba(255,255,255,.75)",

              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",

              boxShadow: "0 15px 35px rgba(0,0,0,.18)",
            }}
          >

            <Card.Body
              style={{
                padding: "45px",
              }}
            >

              <div className="text-center mb-5">

                <h1
                  style={{
                    color: "#0d6efd",
                    fontWeight: "700",
                  }}
                >
                  ✈️ Travel Seller Portal
                </h1>

                <p
                  style={{
                    color: "#555",
                    fontSize: "17px",
                  }}
                >
                  Join our trusted travel partner network
                </p>

              </div>

              <Form onSubmit={handleSubmit}>

                <h4
                  style={{
                    color: "#0d6efd",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  Personal Details
                </h4>                <Row>

                  <Col md={6}>
                    <Form.Group className="mb-3">

                      <Form.Label>Full Name</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">

                      <Form.Label>Email Address</Form.Label>

                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>
                  </Col>

                </Row>

                <Row>

                  <Col md={6}>
                    <Form.Group className="mb-3">

                      <Form.Label>Phone Number</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">

                      <Form.Label>Password</Form.Label>

                      <div className="d-flex">

                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          style={{
                            borderRadius: "12px 0 0 12px",
                            padding: "12px",
                          }}
                        />

                        <Button
                          variant="outline-primary"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >
                          {showPassword ? "Hide" : "Show"}
                        </Button>

                      </div>

                    </Form.Group>
                  </Col>

                </Row>

                <hr className="my-4" />

                <h4
                  style={{
                    color: "#0d6efd",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  Business Details
                </h4>

                <Row>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>Company Name</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>

                  </Col>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>Business Type</Form.Label>

                      <Form.Select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      >

                        <option value="">
                          Select Business Type
                        </option>

                        <option value="Flight">
                          ✈ Flight
                        </option>

                        <option value="Train">
                          🚆 Train
                        </option>

                        <option value="Bus">
                          🚌 Bus
                        </option>

                        <option value="Cab">
                          🚕 Cab
                        </option>

                      </Form.Select>

                    </Form.Group>

                  </Col>

                </Row>

                <Row>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>GST Number</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="GST Number"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>

                  </Col>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>Registration Number</Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Registration Number"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>

                  </Col>

                </Row>

                <Row>

                  <Col md={12}>

                    <Form.Group className="mb-4">

                      <Form.Label>Business Address</Form.Label>

                      <Form.Control
  name="country"
  value={formData.address.country}
  onChange={handleChange}
  placeholder="Country"
/>
<Form.Control
  name="state"
  value={formData.address.state}
  onChange={handleChange}
  placeholder="State"
/>
<Form.Control
  name="city"
  value={formData.address.city}
  onChange={handleChange}
  placeholder="City"
/>
<Form.Control
  name="fullAddress"
  value={formData.address.fullAddress}
  onChange={handleChange}
  placeholder="Full Address"
/>
<Form.Control
  name="pinCode"
  value={formData.address.pinCode}
  onChange={handleChange}
  placeholder="Pin Code"
/>

                    </Form.Group>

                  </Col>

                </Row>

                <hr className="my-4" />

                <h4
                  style={{
                    color: "#0d6efd",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  Bank Details
                </h4>                <Row>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>Account Holder Name</Form.Label>

                      <Form.Control
                        type="text"
                        name="accountHolderName"
                        value={formData.bankDetails.accountHolderName}
                        placeholder="Enter Account Holder Name"
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>

                  </Col>

                  <Col md={6}>

                    <Form.Group className="mb-3">

                      <Form.Label>Account Number</Form.Label>

                      <Form.Control
                        type="text"
                        name="accountNumber"
                        value={formData.bankDetails.accountNumber}
                        placeholder="Enter Account Number"
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>

                  </Col>

                </Row>

                <Row>

                  <Col md={6}>

                    <Form.Group className="mb-4">

                      <Form.Label>IFSC Code</Form.Label>

                      <Form.Control
                        type="text"
                        name="ifscCode"
                        value={formData.bankDetails.ifscCode}
                        placeholder="Enter IFSC Code"
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>

                  </Col>

                  <Col md={6}>

                    <Form.Group className="mb-4">

                      <Form.Label>Bank Name</Form.Label>

                      <Form.Control
                        type="text"
                        name="bankName"
                        value={formData.bankDetails.bankName}
                        placeholder="Enter Bank Name"
                        onChange={handleChange}
                        style={{
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      />

                    </Form.Group>

                  </Col>

                </Row>

                <Button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "15px",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "18px",
                    fontWeight: "700",
                    background:
                      "linear-gradient(90deg,#0d6efd,#2563eb)",
                    transition: ".3s",
                    boxShadow: "0 8px 20px rgba(13,110,253,.35)",
                  }}

                >
                  🚀 Register Seller
                </Button>

              </Form>

            </Card.Body>

          </Card>

        </Container>

      </div>    </>
  );
};

export default SellerRegister;