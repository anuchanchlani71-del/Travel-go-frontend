import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Navbar as BsNavbar, Nav, Button, Badge } from "react-bootstrap";
import Swal from "sweetalert2";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const isUserLoggedIn = auth.isLoggedIn || Boolean(localStorage.getItem("usertoken"));

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        localStorage.removeItem("usertoken");
        localStorage.removeItem("user_id");
        navigate("/");
        setExpanded(false);
      }
    });
  };

  return (
    <BsNavbar expand="md" sticky="top" className="bg-white shadow-card py-2" expanded={expanded} onToggle={setExpanded}>
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="fw-bold font-heading text-primary-custom d-flex align-items-center gap-2" style={{fontSize: "1.25rem"}}>
          <span style={{fontSize: "1.5rem"}}>✈</span> TravelGo
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-nav" />
        <BsNavbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/flights" onClick={() => setExpanded(false)}>✈ Flights</Nav.Link>
            <Nav.Link as={Link} to="/cabs" onClick={() => setExpanded(false)}>🚕 cabs</Nav.Link>
            <Nav.Link as={Link} to="/trains" onClick={() => setExpanded(false)}>🚂 Trains</Nav.Link>
            <Nav.Link as={Link} to="/buses" onClick={() => setExpanded(false)}>🚌 Buses</Nav.Link>
             
          </Nav>

          
          <Nav className="align-items-center gap-2">
            {isUserLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/dashboard" onClick={() => setExpanded(false)} className="fw-semibold text-primary-custom">Dashboard</Nav.Link>
                <Button variant="link" size="sm" className="text-danger text-decoration-none" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)} className="fw-semibold text-primary-custom">Log In</Nav.Link>
                <Button as={Link} to="/signup" className="btn-sunset btn-sm" onClick={() => setExpanded(false)}>Sign Up</Button>
              </>
            )}
            <Nav.Link
              as={Link}
              to="/contact-us"
              onClick={() => setExpanded(false)}
              className="fw-semibold text-primary"
            >
              📞 Contact Us
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
