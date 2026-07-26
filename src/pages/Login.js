import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";



const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handlelogin =async (e) => {
    e.preventDefault();
    const data={
      email:email,
      password:password
    }
  


  const response=await axios.post("http://localhost:5000/api/v1/login",data)
  if(response.data.success){
    const token =response.data.token
    localStorage.setItem("usertoken",token)
     const _id=response.data.data._id
     localStorage.setItem("user_id",_id)
     login(email, password, "user", { userId: _id, name: response.data.data.first_name ? `${response.data.data.first_name} ${response.data.data.last_name || ""}`.trim() : "User" });
     navigate('/',{replace:true});
  }
  else{
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
              <h4 className="font-heading fw-bold mt-3 mb-1">Welcome back</h4>
              <p className="text-muted small">Sign in to your account</p>
            </div>
            {/* <Row className="g-2 mb-4">
              {roles.map((r) => (
                <Col key={r.value}>
                  <Button variant={role === r.value ? "outline-primary" : "outline-secondary"} className={`w-100 d-flex flex-column align-items-center gap-1 p-2 ${role === r.value ? "border-2" : ""}`} onClick={() => setRole(r.value)} style={{ borderRadius: 12, fontSize: "0.75rem" }}>
                    <span style={{ fontSize: "1.25rem" }}>{r.icon}</span>
                    <strong>{r.label}</strong>
                    <span className="opacity-75" style={{ fontSize: "0.6rem" }}>{r.desc}</span>
                  </Button>
                </Col>
              ))}
            </Row> */}
            <Form onSubmit={handlelogin}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-medium">Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-medium">Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "🙈" : "👁"}</Button>
                </InputGroup>
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Check label="Remember me" className="small" />
                <a href="#" className="small text-primary-custom">Forgot password?</a>
              </div>
              <Button type="submit" className="btn-sunset w-100">Login</Button>
            </Form>
            <p className="text-center text-muted small mt-4 mb-0">Don't have an account? <Link to="/signup" className="text-primary-custom fw-semibold">Sign up</Link></p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
