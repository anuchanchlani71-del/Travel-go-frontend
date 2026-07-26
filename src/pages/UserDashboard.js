import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Card, Badge, Button, Nav, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

const tabs = ["Bookings", "Profile"];

const UserDashboard = () => {
  const { auth } = useAuth();
  const [activeTab, setActiveTab] = useState("Bookings");
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("user_id") || auth.userId;

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (userId) {
        const [bookingsRes, profileRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/booking/getBookings/${userId}`).catch(() => ({ data: { data: [] } })),
          axios.get(`http://localhost:5000/api/v1/myprofile?_id=${userId}`).catch(() => ({ data: { data: {} } }))
        ]);
        if (bookingsRes.data?.data) {
          setBookings(bookingsRes.data.data);
        }
        if (profileRes.data?.data) {
          setProfile(profileRes.data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayName = profile.first_name ? `${profile.first_name} ${profile.last_name || ""}`.trim() : auth.name || "Traveler";
  const displayEmail = profile.email || auth.email || "No email available";

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "var(--bg-light)" }}>
      <Navbar />
      <Container className="py-4 flex-grow-1">
        <div className="d-flex align-items-center gap-3 mb-4 p-3 bg-white shadow-card rounded-4">
          {profile.image && !profile.image.endsWith("null") ? (
            <img src={profile.image} alt={displayName} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <div className="avatar-circle gradient-hero text-white d-flex align-items-center justify-content-center" style={{ width: 64, height: 64, borderRadius: "50%", fontSize: "1.5rem", fontWeight: "bold" }}>
              {displayName.charAt(0) || "U"}
            </div>
          )}
          <div>
            <h5 className="font-heading fw-bold mb-0">{displayName}</h5>
            <small className="text-muted">{displayEmail}</small>
            <div className="small text-primary-custom fw-semibold mt-1">
              {bookings.length} Dynamic {bookings.length === 1 ? "Booking" : "Bookings"}
            </div>
          </div>
        </div>

        <Nav variant="pills" className="mb-4 flex-nowrap overflow-auto gap-2">
          {tabs.map(t => (
            <Nav.Item key={t}>
              <Nav.Link
                active={activeTab === t}
                onClick={() => setActiveTab(t)}
                className={activeTab === t ? "gradient-hero text-white border-0 px-4 py-2" : "bg-white text-dark shadow-sm px-4 py-2"}
                style={{ borderRadius: 12, whiteSpace: "nowrap", cursor: "pointer", fontWeight: "600" }}
              >
                {t === "Bookings" ? "📅 My Bookings" : "👤 My Profile"}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted small">Loading your dynamic data...</p>
          </div>
        ) : (
          <>
            {activeTab === "Bookings" && (
              <div>
                {bookings.length === 0 ? (
                  <Card className="card-travel p-5 text-center">
                    <h5 className="fw-bold text-muted">No Bookings Yet</h5>
                    <p className="text-muted small">You haven't made any bookings yet.</p>
                    <div>
                      <Link to="/" className="btn btn-sunset btn-sm px-4">Explore Destinations</Link>
                    </div>
                  </Card>
                ) : (
                  <Row className="g-4">
                    {bookings.map((b) => (
                      <Col md={6} key={b._id}>
                        <Card className="card-travel p-4 h-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <Badge bg={
                              b.bookingType === "cab" ? "primary" :
                              b.bookingType === "train" ? "success" :
                              b.bookingType === "bus" ? "warning" : "info"
                            } className="px-3 py-2" style={{ fontSize: "0.75rem" }}>
                              {b.bookingType?.toUpperCase() || "BOOKING"}
                            </Badge>
                            <Badge bg={b.bookingStatus === "confirmed" || b.bookingStatus === "Confirmed" ? "success" : "secondary"}>
                              {b.bookingStatus || "Confirmed"}
                            </Badge>
                          </div>

                          {b.bookingType === "cab" && (
                            <>
                              <h5 className="fw-bold">{b.cabName || "Cab Booking"}</h5>
                              <p className="small mb-1"><strong>Pickup:</strong> {b.pickupLocation}</p>
                              <p className="small mb-1"><strong>Drop:</strong> {b.dropLocation}</p>
                              {b.driverName && <p className="small mb-1"><strong>Driver:</strong> {b.driverName} ({b.vehicleNumber})</p>}
                            </>
                          )}

                          {b.bookingType === "train" && (
                            <>
                              <h5 className="fw-bold">{b.trainName || "Train Booking"}</h5>
                              <p className="small mb-1"><strong>Train No:</strong> {b.trainNumber}</p>
                              <p className="small mb-1"><strong>Route:</strong> {b.from} → {b.to}</p>
                              {b.pnrNumber && <p className="small mb-1"><strong>PNR:</strong> {b.pnrNumber}</p>}
                            </>
                          )}

                          {b.bookingType === "bus" && (
                            <>
                              <h5 className="fw-bold">{b.operatorName || b.busName || "Bus Booking"}</h5>
                              <p className="small mb-1"><strong>Bus No:</strong> {b.busNumber}</p>
                              <p className="small mb-1"><strong>Boarding:</strong> {b.boardingPoint} → <strong>Dropping:</strong> {b.droppingPoint}</p>
                              {b.journeyDate && <p className="small mb-1"><strong>Date:</strong> {new Date(b.journeyDate).toLocaleDateString()}</p>}
                            </>
                          )}

                          {b.bookingType === "flight" && (
                            <>
                              <h5 className="fw-bold">{b.airline || "Flight Booking"}</h5>
                              <p className="small mb-1"><strong>Flight No:</strong> {b.flightNumber || b.airlineCode}</p>
                              <p className="small mb-1"><strong>Route:</strong> {b.fromAirport} → {b.toAirport}</p>
                              {b.journeyDate && <p className="small mb-1"><strong>Date:</strong> {new Date(b.journeyDate).toLocaleDateString()}</p>}
                            </>
                          )}

                          <hr className="my-3" />
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="small text-muted">Total Amount</span>
                            <span className="fw-bold text-primary-custom" style={{ fontSize: "1.15rem" }}>₹{b.amount?.toLocaleString() || "0"}</span>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </div>
            )}

            {activeTab === "Profile" && (
              <Card className="card-travel p-4 max-w-lg">
                <Card.Body>
                  <h4 className="font-heading fw-bold mb-4">Personal Details</h4>
                  <Row className="g-3">
                    <Col md={6}>
                      <small className="text-muted d-block fw-semibold">First Name</small>
                      <p className="fw-bold mb-0">{profile.first_name || auth.name || "N/A"}</p>
                    </Col>
                    <Col md={6}>
                      <small className="text-muted d-block fw-semibold">Last Name</small>
                      <p className="fw-bold mb-0">{profile.last_name || "N/A"}</p>
                    </Col>
                    <Col md={6}>
                      <small className="text-muted d-block fw-semibold">Email Address</small>
                      <p className="fw-bold mb-0">{profile.email || auth.email || "N/A"}</p>
                    </Col>
                    <Col md={6}>
                      <small className="text-muted d-block fw-semibold">Mobile Number</small>
                      <p className="fw-bold mb-0">{profile.mobile || "N/A"}</p>
                    </Col>
                    <Col md={12}>
                      <small className="text-muted d-block fw-semibold">Address</small>
                      <p className="fw-bold mb-0">{profile.address || "N/A"}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default UserDashboard;
