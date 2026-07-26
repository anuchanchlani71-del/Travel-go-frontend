import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";



function Signup() {
  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [email, setemail] = useState("")
  const [mobile, setmobile] = useState("")
  const [address, setaddress] = useState("")
  const [password, setpassword] = useState("")
  const [image, setImage] = useState("")
  console.log("data", first_name, last_name, email, password, mobile, address)
  const navigate = useNavigate();



  const addUser=async(e)=>{
    e.preventDefault();
     const formData = new FormData();
    formData.append("first_name", first_name)
    formData.append("last_name", last_name)
    formData.append("email", email)
    formData.append("mobile", mobile)
    formData.append("address", address)
    formData.append("image", image)
    formData.append("password", password)
  

const response = await axios.post(
   "http://localhost:5000/api/v1/register",
   formData
)
if(response.data.success){
  toast.success(response.data.message)
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
}else{
  toast.error(response.data.message)
}
  }
  return (
   
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "var(--bg-light)" }}>
      <Toaster/>
      <Container style={{ maxWidth: 440 }}>
        <Card className="card-travel p-4">
          <Card.Body>
            <div className="text-center mb-4">
              <Link to="/" className="text-decoration-none text-primary-custom fw-bold font-heading" style={{ fontSize: "1.25rem" }}>
                <span style={{ fontSize: "1.5rem" }}>✈</span> TravelGo
              </Link>
              <h4 className="font-heading fw-bold mt-3">Create your account</h4>
            </div>
            {/* <Row className="g-2 mb-4">
              {roles.map((r) => (
                <Col key={r.value}>
                  <Button variant={role === r.value ? "outline-primary" : "outline-secondary"} className={`w-100 d-flex flex-column align-items-center gap-1 p-2 ${role === r.value ? "border-2" : ""}`} onClick={() => setRole(r.value)} style={{ borderRadius: 12 }}>
                    <span style={{ fontSize: "1.25rem" }}>{r.icon}</span>
                    <small className="fw-semibold">{r.label}</small>
                  </Button>
                </Col>
              ))}
            </Row> */}
            <Form onSubmit={addUser}>

  <Form.Control
    className="mb-2"
    value={first_name}
    onChange={e => setfirst_name(e.target.value)}
    required
    placeholder="First Name"
  />

  <Form.Control
    className="mb-2"
    value={last_name}
    onChange={e => setlast_name(e.target.value)}
    required
    placeholder="Last Name"
  />

  <Form.Control
    className="mb-2"
    type="email"
    value={email}
    onChange={e => setemail(e.target.value)}
    required
    placeholder="Email"
  />

  <Form.Control
    className="mb-2"
    value={mobile}
    onChange={e => setmobile(e.target.value)}
    required
    placeholder="Phone (+91)"
  />

  <Form.Control
    className="mb-2"
    value={address}
    onChange={e => setaddress(e.target.value)}
    required
    placeholder="Address"
  />

  <Form.Control
    className="mb-2"
    type="password"
    value={password}
    onChange={e => setpassword(e.target.value)}
    required
    placeholder="Password"
  />

  <Form.Control
    className="mb-3"
    type="file"
    onChange={(e) => setImage(e.target.files[0])}
  />

  <Button
    type="submit"
    className="btn-sunset w-100"
  >
    Create Account
  </Button>

</Form>
            <p className="text-center text-muted small mt-4 mb-0">Already have an account? <Link to="/login" className="text-primary-custom fw-semibold">Sign in</Link></p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
