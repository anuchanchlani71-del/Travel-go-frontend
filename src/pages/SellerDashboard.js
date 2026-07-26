import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockHotels, mockBookings, mockReviews, mockSellers } from "../data/mockData";
import { Container, Card, Nav, Badge, Button, Row, Col } from "react-bootstrap";

const tabs = ["Overview", "Listings", "Bookings", "Reviews"];

const SellerDashboard = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  const seller = mockSellers.find(s => s.id === "s3") || mockSellers[0];
  const listings = mockHotels.filter(h => h.sellerId === seller.id);
  const bookings = mockBookings.filter(b => b.sellerId === seller.id);
  const reviews = mockReviews.filter(r => listings.some(l => l.id === r.itemId));
  const totalRevenue = bookings.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="min-vh-100" style={{ background: "var(--bg-light)" }}>
      <nav className="gradient-hero text-white py-3">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Link to="/" className="text-white text-decoration-none">← Home</Link>
            <span className="font-heading fw-bold">Seller Dashboard</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <small className="opacity-75">{auth.name || seller.businessName}</small>
            <Button size="sm" variant="outline-light" onClick={() => { logout(); navigate("/"); }}>Logout</Button>
          </div>
        </Container>
      </nav>

      <Container className="py-4">
        <Nav variant="pills" className="mb-4">
          {tabs.map(t => <Nav.Item key={t}><Nav.Link active={activeTab === t} onClick={() => setActiveTab(t)} className={activeTab === t ? "gradient-sunset text-white border-0" : ""} style={{borderRadius:8}}>{t}</Nav.Link></Nav.Item>)}
        </Nav>

        {activeTab === "Overview" && (
          <>
            <Row className="g-3 mb-4">
              {[{l:"Listings",v:listings.length},{l:"Bookings",v:bookings.length},{l:"Revenue",v:"₹"+totalRevenue.toLocaleString()},{l:"Avg Rating",v:"4.7"}].map(s => (
                <Col sm={6} md={3} key={s.l}>
                  <Card className="card-travel p-3 text-center">
                    <p className="font-heading fw-bold text-secondary-custom mb-0" style={{fontSize:"1.5rem"}}>{s.v}</p>
                    <small className="text-muted">{s.l}</small>
                  </Card>
                </Col>
              ))}
            </Row>
            <Card className="card-travel p-3">
              <h6 className="font-heading fw-bold mb-3">Recent Bookings</h6>
              {bookings.slice(0,5).map(b => (
                <div key={b.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div>
                    <p className="fw-semibold mb-0 small">{b.itemName}</p>
                    <small className="text-muted">{b.userName} • {b.date}</small>
                  </div>
                  <div className="text-end">
                    <p className="fw-bold mb-0 small">₹{b.amount.toLocaleString()}</p>
                    <Badge className={`status-${b.status}`} style={{fontSize:"0.6rem"}}>{b.status}</Badge>
                  </div>
                </div>
              ))}
            </Card>
          </>
        )}

        {activeTab === "Listings" && (
          <div>
            {listings.map(l => (
              <Card key={l.id} className="card-travel p-3 mb-2 d-flex flex-row gap-3">
                <img src={l.image} alt={l.name} style={{width:96,height:96,objectFit:"cover",borderRadius:8}} loading="lazy" />
                <div className="flex-grow-1">
                  <p className="font-heading fw-bold mb-0">{l.name}</p>
                  <small className="text-muted">📍 {l.city} • ⭐ {l.rating}</small>
                  <p className="text-secondary-custom fw-bold mb-0">₹{l.price.toLocaleString()}/night</p>
                </div>
                <Badge className={`status-${l.status} align-self-start`} style={{fontSize:"0.65rem"}}>{l.status}</Badge>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "Bookings" && (
          <div>
            {bookings.map(b => (
              <Card key={b.id} className="card-travel p-3 mb-2 d-flex flex-row justify-content-between align-items-center">
                <div>
                  <p className="fw-semibold mb-0 small">{b.itemName}</p>
                  <small className="text-muted">{b.userName} • {b.date} • {b.id}</small>
                </div>
                <span className="fw-bold text-secondary-custom">₹{b.amount.toLocaleString()}</span>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div>
            {reviews.map(r => (
              <Card key={r.id} className="card-travel p-3 mb-2">
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold small">{r.userName} on {r.itemName}</span>
                  <span>{"⭐".repeat(r.rating)}</span>
                </div>
                <p className="text-muted small mb-1 mt-1">{r.comment}</p>
                <small className="text-muted">{r.date}</small>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default SellerDashboard;
