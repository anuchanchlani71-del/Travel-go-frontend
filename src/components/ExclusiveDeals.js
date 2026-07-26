import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const deals = [
  {
    title: "Flat 20% Off on Flights",
    description: "Use code FLY20 on domestic flights. Limited period offer!",
    gradient: "gradient-hero",
    code: "FLY20",
  },
  {
    title: "Hotels at ₹999/Night",
    description: "Top-rated hotels across India. Book now, pay later!",
    gradient: "gradient-sunset",
    code: "STAY999",
  },
  {
    title: "Weekend Getaway Deals",
    description: "Up to 40% off on holiday packages. This weekend only!",
    gradient: "gradient-ocean",
    code: "WEEKEND40",
  },
];

const ExclusiveDeals = () => {
  return (
    <section
      style={{
        padding: "70px 0",
        background: "#f0f0f0",
      }}
    >
      <Container>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontWeight: "800",
              fontSize: "2.4rem",
              marginBottom: "8px",
            }}
          >
            Exclusive Deals
          </h2>
          <p style={{ color: "#6b7280" }}>
            Grab these limited-time offers before they are gone
          </p>
        </div>

        {/* Cards Row */}
        <Row className="g-4 align-items-stretch">
          {deals.map((deal, index) => (
            <Col md={4} key={index} className="d-flex">
              <div
                className={`deal-card ${deal.gradient}`}
                style={{
                  padding: "24px",
                  borderRadius: "18px",
                  color: "#fff",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",

                  /* ✅ FIXED EQUAL HEIGHT */
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 45px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.12)";
                }}
              >
                {/* Badge */}
                <div
                  style={{
                    display: "inline-flex",
                    gap: "6px",
                    fontSize: "12px",
                    padding: "5px 10px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.2)",
                    marginBottom: "12px",
                    width: "fit-content",
                  }}
                >
                  🎫 Limited Offer
                </div>

                {/* Content */}
                <div>
                  <h5 style={{ fontWeight: "700" }}>{deal.title}</h5>

                  <p style={{ fontSize: "14px", opacity: 0.85 }}>
                    {deal.description}
                  </p>
                </div>

                {/* Footer */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "18px",
                  }}
                >
                  <code
                    style={{
                      background: "rgba(255,255,255,0.25)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                    }}
                  >
                    {deal.code}
                  </code>

                  <a
                    href="#"
                    style={{
                      color: "#fff",
                      fontWeight: "600",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.textDecoration = "none")
                    }
                  >
                    Book Now →
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ExclusiveDeals;