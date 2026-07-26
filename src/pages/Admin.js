import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockUsers, mockSellers, mockBookings, mockHotels, mockCoupons } from "../data/mockData";
import { Container, Card, Nav, Badge, Button, Row, Col, Table } from "react-bootstrap";

const tabs = ["Overview", "Users", "Sellers", "Bookings", "Hotels", "Coupons"];

const Admin = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const totalRevenue = mockBookings.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="min-vh-100" style={{ background: "var(--bg-light)" }}>
      <nav className="gradient-hero text-white py-3">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <Link to="/" className="text-white text-decoration-none">← Home</Link>
            <span className="font-heading fw-bold">Admin Panel</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <small className="opacity-75">{auth.name}</small>
            <Button size="sm" variant="outline-light" onClick={() => { logout(); navigate("/"); }}>Logout</Button>
          </div>
        </Container>
      </nav>

      <Container className="py-4">
        <Nav variant="pills" className="mb-4 flex-nowrap overflow-auto">
          {tabs.map(t => <Nav.Item key={t}><Nav.Link active={activeTab === t} onClick={() => setActiveTab(t)} className={activeTab === t ? "gradient-hero text-white border-0" : ""} style={{borderRadius:8,whiteSpace:"nowrap"}}>{t}</Nav.Link></Nav.Item>)}
        </Nav>

        {activeTab === "Overview" && (
          <Row className="g-3">
            {[{l:"Users",v:mockUsers.length,icon:"👥"},{l:"Sellers",v:mockSellers.length,icon:"🏪"},{l:"Bookings",v:mockBookings.length,icon:"📋"},{l:"Revenue",v:"₹"+totalRevenue.toLocaleString(),icon:"💰"}].map(s => (
              <Col sm={6} md={3} key={s.l}>
                <Card className="card-travel p-3 text-center">
                  <div style={{fontSize:"1.5rem"}}>{s.icon}</div>
                  <p className="font-heading fw-bold text-secondary-custom mb-0" style={{fontSize:"1.5rem"}}>{s.v}</p>
                  <small className="text-muted">{s.l}</small>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {activeTab === "Users" && (
          <Card className="card-travel">
            <Table responsive hover className="mb-0 small">
              <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Joined</th></tr></thead>
              <tbody>
                {mockUsers.map(u => (
                  <tr key={u.id}><td className="fw-medium">{u.name}</td><td className="text-muted">{u.email}</td><td><Badge className={`status-${u.status}`} style={{fontSize:"0.65rem"}}>{u.status}</Badge></td><td className="text-muted">{u.joinedDate}</td></tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {activeTab === "Sellers" && (
          <Card className="card-travel">
            <Table responsive hover className="mb-0 small">
              <thead><tr><th>Business</th><th>Type</th><th>Status</th><th>Earnings</th><th>Bookings</th></tr></thead>
              <tbody>
                {mockSellers.map(s => (
                  <tr key={s.id}><td><p className="fw-medium mb-0">{s.businessName}</p><small className="text-muted">{s.email}</small></td><td className="text-muted">{s.businessType}</td><td><Badge className={`status-${s.status}`} style={{fontSize:"0.65rem"}}>{s.status}</Badge></td><td className="fw-medium">₹{s.totalEarnings.toLocaleString()}</td><td className="text-muted">{s.totalBookings}</td></tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {activeTab === "Bookings" && (
          <Card className="card-travel">
            <Table responsive hover className="mb-0 small">
              <thead><tr><th>ID</th><th>User</th><th>Item</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {mockBookings.map(b => (
                  <tr key={b.id}><td className="text-muted">{b.id}</td><td className="fw-medium">{b.userName}</td><td className="text-muted">{b.itemName}</td><td className="fw-medium">₹{b.amount.toLocaleString()}</td><td><Badge className={`status-${b.status}`} style={{fontSize:"0.65rem"}}>{b.status}</Badge></td></tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {activeTab === "Hotels" && (
          <div>
            {mockHotels.map(h => (
              <Card key={h.id} className="card-travel p-3 mb-2 d-flex flex-row gap-3">
                <img src={h.image} alt={h.name} style={{width:96,height:96,objectFit:"cover",borderRadius:8}} loading="lazy" />
                <div className="flex-grow-1">
                  <p className="font-heading fw-bold mb-0">{h.name}</p>
                  <small className="text-muted">📍 {h.city} • ⭐ {h.rating} • {h.reviews} reviews</small>
                  <p className="text-secondary-custom fw-bold mb-0">₹{h.price.toLocaleString()}/night</p>
                </div>
                <Badge className={`status-${h.status} align-self-start`} style={{fontSize:"0.65rem"}}>{h.status}</Badge>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "Coupons" && (
          <div>
            {mockCoupons.map(c => (
              <Card key={c.id} className="card-travel p-3 mb-2 d-flex flex-row align-items-center gap-3">
                <code className="bg-light px-3 py-1 rounded fw-bold text-primary-custom">{c.code}</code>
                <div className="flex-grow-1">
                  <p className="fw-semibold mb-0 small">{c.type==="percentage" ? c.discount+"% off" : "₹"+c.discount+" off"}</p>
                  <small className="text-muted">Min ₹{c.minOrder} • Max ₹{c.maxDiscount} • Valid till {c.validTill} • Used {c.usageCount}x</small>
                </div>
                <Badge className={`status-${c.status}`} style={{fontSize:"0.65rem"}}>{c.status}</Badge>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Admin;
