
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert
} from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

const FlightBooking = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const flightId = searchParams.get("id");
  const userId = localStorage.getItem("user_id");

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [travelClass, setTravelClass] = useState("economy");

  // ✅ CHANGED ONLY HERE
  const [passengers, setPassengers] = useState([
    {
      name: "",
      gender: "",
      age: ""
    }
  ]);

  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
     toast.error("Please login first to book!");
      navigate("/login");
      return;
    }
    console.log("flightId", flightId);
    fetchFlight();
  }, []);

  const fetchFlight = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/booking/getSingleFlight/${flightId}`
      );
      setFlight(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        name: "",
        gender: "",
        age: ""
      }
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const totalAmount = flight
    ? (flight.classes?.[travelClass]?.price || 0) * passengers.length
    : 0;

  //   const handleBooking = async () => {
  //     try {
  //       setLoading(true);

  //       const payload = {
  //         userId,
  //         bookingType: "flight",
  //         flightId,
  //         fromAirport: flight?.from?.airport,
  //         toAirport: flight?.to?.airport,
  //         travelClass,
  //         journeyDate: new Date(flight?.departuretime),
  //         paymentMethod: "upi",

  //         // ✅ NOW DIRECT PASS
  //         passengersDetails: passengers
  //       };

  //       const res = await axios.post(
  //         "http://localhost:5000/api/booking/flightbooking",
  //         payload
  //       );

  //       if (res.data.success) {
  //         alert("Flight booked successfully");
  //         navigate("/my-bookings");
  //       } else {
  //         alert(res.data.message);
  //       }

  //     } catch (err) {
  //       console.log(err);
  //       alert("Booking failed");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const handleBooking = async () => {
    if (!localStorage.getItem("usertoken")) {
     toast.error("Please login first to book!");
      navigate("/login");
      return;
    }

    // Passenger validation
    for (let i = 0; i < passengers.length; i++) {

      const p = passengers[i];

      if (
        !p.name?.trim() ||
        !p.gender ||
        !p.age
      ) {
        toast.error(` please fill Passenger ${i + 1} details`);
        return;
      }
    }

    try {
      setLoading(true);

      const payload = {
        userId,
        bookingType: "flight",
        flightId,
        fromAirport: flight?.from?.airport,
        toAirport: flight?.to?.airport,
        travelClass,
        journeyDate: new Date(flight?.departuretime),
        paymentMethod: "upi",

        passengersDetails: passengers.map(p => ({
          ...p,
          age: Number(p.age)
        }))
      };

      const res = await axios.post(
        "http://localhost:5000/api/booking/flightbooking",
        payload
      );

   if (res.data.success) {
  toast.success("Flight booked successfully");

  setTimeout(() => {
    navigate("/my-booking");
  }, 1500);
} else {
  toast.error(res.data.message);
}

    } catch (err) {
      console.log(err);
     toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!flight)
    return (
      <h4 className="text-center mt-5">
        Loading...
      </h4>
    );

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#f5f7fb" }}>
      <Navbar />
      <Toaster position="top-right" />
       {/* HERO SECTION */}
              <div
                style={{
                  background: "linear-gradient(135deg, #1e3a6e, #274b8f)",
                  color: "white",
                  padding: "45px 0"
                }}
              >
                <Container>
                  <div className="d-flex align-items-center mb-2">
                    <span className="fs-3 me-2">✈</span>
                    <h2 className="fw-bold mb-0">Flight Seat Booking</h2>
                  </div>
                  <p className="mb-0 text-white-50">
                    Select your preferred seats and enter passenger details to complete your reservation.
                  </p>
                </Container>
              </div>
      <Container className="py-4">
       

        <Row>

          {/* LEFT */}
          <Col lg={8}>

            {/* FLIGHT DETAILS */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>

                <h4>{flight.airline}</h4>

                <p>Flight No : {flight.flightnumber}</p>

                <hr />

                <Row>

                  <Col>
                    <h5>{flight.from.city}</h5>
                    <small>{flight.from.airport}</small>
                  </Col>

                  <Col className="text-center">
                    <small>{flight.duration} hrs</small>
                    <hr />
                    {/* <small>
                    {flight.stops?.length === 0
                      ? "Non Stop"
                      : `${flight.stops.length} Stop`}
                  </small> */}
                    <small>
                      {flight.stops?.length === 0 ? (
                        "Non Stop"
                      ) : (
                        <>
                          {flight.stops.length} Stop -{" "}
                          {flight.stops.map((stop, index) => (
                            <span key={index}>
                              {stop.city} ({stop.airport})
                              {index !== flight.stops.length - 1 && ", "}
                            </span>
                          ))}
                        </>
                      )}
                    </small>
                  </Col>

                  <Col className="text-end">
                    <h5>{flight.to.city}</h5>
                    <small>{flight.to.airport}</small>
                  </Col>

                </Row>

              </Card.Body>
            </Card>

            {/* CLASS */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>

                <h5>Travel Class</h5>

                <Form.Select
                  value={travelClass}
                  onChange={(e) => setTravelClass(e.target.value)}
                  required
                >
                  <option value="economy">
                    Economy - ₹{flight.classes?.economy?.price}
                  </option>

                  <option value="business">
                    Business - ₹{flight.classes?.business?.price}
                  </option>

                </Form.Select>

              </Card.Body>
            </Card>

            {/* PASSENGERS */}
            {passengers.map((p, index) => (
              <Card key={index} className="shadow-sm border-0 mb-3">
                <Card.Body>

                  <h6>Passenger {index + 1}</h6>

                  <Form.Control
                    placeholder="Name"
                    value={p.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                    required
                  />

                  <Row className="mt-3">

                    <Col md={6}>
                      <Form.Select
                        value={p.gender}
                        onChange={(e) =>
                          handleChange(index, "gender", e.target.value)
                        }
                        required
                      >
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Control
                        placeholder="Age"
                        type="number"
                        value={p.age}
                        onChange={(e) =>
                          handleChange(index, "age", e.target.value)
                        }
                        required
                      />
                    </Col>

                  </Row>

                </Card.Body>
              </Card>
            ))}

            <Button
              variant="outline-primary"
              onClick={addPassenger}
            >
              + Add Passenger
            </Button>

          </Col>

          {/* RIGHT */}
          <Col lg={4}>

            <Card className="shadow border-0 " style={{ top: 20 }}>
              <Card.Body>

                <h5>Fare Summary</h5>

                <hr />

                <div className="d-flex justify-content-between">
                  <span>Base Fare</span>
                  <span>₹{flight.classes?.[travelClass]?.price}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Passengers</span>
                  <span>{passengers.length}</span>
                </div>

                <hr />

                <h4>₹{totalAmount.toLocaleString()}</h4>

                <Alert variant="info" className="mt-3">
                  Available Seats : {flight.classes?.[travelClass]?.availableSeats}
                </Alert>

                <Button
                  className="w-100"
                  size="lg"
                  disabled={loading}
                  onClick={handleBooking}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
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

export default FlightBooking;