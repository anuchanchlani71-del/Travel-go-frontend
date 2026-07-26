import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const CabBooking = () => {

  const themeColor = "#1e3a6e";

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const cabId = params.get("id");

  const [cab, setCab] = useState(null);
  const [loading, setLoading] = useState(true);

  const [pickupLocation, setPickupLocation] =
    useState("");

  const [dropLocation, setDropLocation] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("upi");

  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
   toast.error("Please login first to book!");
      navigate("/login");
      return;
    }

    const fetchCab = async () => {
      try {

        const res = await axios.get(
          `http://localhost:5000/api/front/singlecab?id=${cabId}`
        );

        setCab(res.data.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCab();

  }, [cabId]);

  const handleBooking = async () => {
    if (!localStorage.getItem("usertoken")) {
   toast.error("Please login first to book!");
      navigate("/login");
      return;
    }

    try {

      const userId =
        localStorage.getItem("user_id");

      const payload = {
        userId,
        bookingType: "cab",
        cabId: cab._id,
        pickupLocation,
        dropLocation,
        paymentMethod
      };

      const res = await axios.post(
        "http://localhost:5000/api/booking/add",
        payload
      );


    toast.success(res.data.message);

    setTimeout(() => {
      navigate("/my-booking");
    }, 1500);
    } catch (err) {

      console.log(err);

     toast.error(
  err?.response?.data?.message ||
  "Booking Failed"
);
    }
  };
if (loading) {
  return (
    <div className="text-center py-5">
      Loading...
    </div>
  );
}

if (!cab) {
  return (
    <div className="text-center py-5">
      Cab Not Found
    </div>
  );
}

const distance = 10;

const total =
  (cab?.baseFare || 0) +
  ((cab?.pricePerKm || 0) * distance);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ background: "#f5f7fb" }}
    >
<Toaster position="top-right" />
      <Navbar />

      {/* HERO */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#1e3a6e,#274b8f)",
          color: "white",
          padding: "45px 0"
        }}
      >
        <Container>

          <h2 className="fw-bold mb-2">
            🚕 Cab Booking
          </h2>

          <p className="mb-0">
            Complete your trip details and
            confirm your cab booking.
          </p>

        </Container>
      </div>

      <Container className="py-5 flex-grow-1">

        <Row className="g-4">

          {/* LEFT */}

          <Col lg={8}>

            {/* CAB DETAILS */}

            <Card
              className="border-0 mb-4"
              style={{
                borderRadius: "18px"
              }}
            >
              <Card.Body className="p-4">

                <h4 className="fw-bold">
                  {cab.cabName}
                </h4>

                <small>
                  Vehicle Number :
                  {" "}
                  {cab.cabNumber}
                </small>

                <div
                  style={{
                    marginTop: 10,
                    padding: "6px 12px",
                    display: "inline-block",
                    background: "#e8f0ff",
                    borderRadius: 20,
                    color: themeColor
                  }}
                >
                 
                </div>

                <hr />

                <Row className="text-center">

                  <Col>
                    Driver
                    <br />
                    <strong>
                      {cab.driverName}
                    </strong>
                  </Col>

                  <Col>
                    Type
                    <br />
                    <strong>
                      {cab.vehicleType}
                    </strong>
                  </Col>

                  <Col>
                    Fare
                    <br />
                    <strong>
                      ₹{cab.baseFare}
                    </strong>
                  </Col>

                </Row>

              </Card.Body>
            </Card>

            {/* JOURNEY DETAILS */}

            <Card className="border-0 mb-4">

              <Card.Body className="p-4">

                <h5 className="mb-3">
                  Journey Details
                </h5>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Pickup Location
                  </Form.Label>

                  <Form.Control
                    placeholder="Enter Pickup Location"
                    value={pickupLocation}
                    onChange={(e) =>
                      setPickupLocation(
                        e.target.value
                      )
                    }
                  />

                </Form.Group>

                <Form.Group>

                  <Form.Label>
                    Drop Location
                  </Form.Label>

                  <Form.Control
                    placeholder="Enter Drop Location"
                    value={dropLocation}
                    onChange={(e) =>
                      setDropLocation(
                        e.target.value
                      )
                    }
                  />

                </Form.Group>

              </Card.Body>

            </Card>

            {/* PAYMENT */}

            <Card className="border-0">

              <Card.Body className="p-4">

                <h5 className="mb-3">
                  Payment Method
                </h5>

                <Form.Select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                >
                  <option value="upi">
                    UPI
                  </option>

                  <option value="card">
                    Card
                  </option>

                  <option value="cash">
                    Cash
                  </option>

                </Form.Select>

              </Card.Body>

            </Card>

          </Col>

          {/* RIGHT */}

          <Col lg={4}>

            <Card
              className="border-0"
              style={{
                position: "sticky",
                top: 90
              }}
            >
                           <Card.Body className="p-4">
              
                <h5>Fare Summary</h5>
              
                <div className="d-flex justify-content-between">
                  <span>Base Fare</span>
                  <span>₹{cab?.baseFare}</span>
                </div>
              
                <div className="d-flex justify-content-between">
                  <span>Total Distance</span>
                  <span>{distance} km</span>
                </div>
              
                <hr />
              
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              
                <Button
                  className="w-100 mt-3"
                  style={{
                    background: themeColor,
                    border: "none"
                  }}
                  onClick={handleBooking}
                >
                  Confirm Booking
                </Button>
              
              </Card.Body>

            </Card>

          </Col>

        </Row>

      </Container>

      <Footer />

    </div>
  );
};

export default CabBooking;