import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => (
  <footer className="gradient-hero text-white py-5 mt-auto">
    <Container>
      <Row className="mb-4">
        <Col md={4} className="mb-4 mb-md-0">
          <h5 className="font-heading fw-bold mb-3">✈ TravelGo</h5>
          <p className="small opacity-75">Your trusted travel partner for flights, hotels, trains, and unforgettable experiences.</p>
        </Col>
        {[
          { title: "Company", links: ["About Us", "Careers", "Blog", "Press"] },
          { title: "Support", links: ["Help Center", "Cancellation", "Refund Policy", "Contact"] },
    {
  title: "Services",
  links: [
    { name: "Flights", url: "/flights" },
    { name: "Cabs", url: "/cabs" },
    { name: "Trains", url: "/trains" },
    { name: "Buses", url: "/buses" },
  ],
},
        ].map((col) => (
          <Col md={2} sm={4} key={col.title} className="mb-3">
            <h6 className="font-heading fw-semibold mb-3">{col.title}</h6>
            <ul className="list-unstyled small">
             {col.links.map((link) => (
  <li key={link.name || link} className="mb-1">
    <a
      href={link.url || "#"}
      className="text-white text-decoration-none opacity-75"
    >
      {link.name || link}
    </a>
  </li>
))}
            </ul>
          </Col>
        ))}
      </Row>
      <hr className="border-light opacity-25" />
      <p className="text-center small opacity-50 mb-0">© 2026 TravelGo. All rights reserved.</p>
    </Container>
  </footer>
);

export default Footer;
