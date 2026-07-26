import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Badge
} from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";

const BusBooking = () => {
  const themeColor = "#1e3a6e";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const busId = searchParams.get("id");
  const userId = localStorage.getItem("user_id");

  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [boardingPoint, setBoardingPoint] = useState("");
  const [droppingPoint, setDroppingPoint] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  // ================= FETCH BUS DETAILS =================
  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
    toast.error("Please login first to book!");
      navigate("/login");
      return;
    }
    const fetchBusDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/front/singlebus?id=${busId}`
        );
        if (res.data.success) {
          setBus(res.data.data);
          // Set default journey date to bus departure date (yyyy-MM-dd)
          if (res.data.data.departureTime) {
            const dateStr = new Date(res.data.data.departureTime).toISOString().split("T")[0];
            setJourneyDate(dateStr);
          }
        }
      } catch (err) {
        console.error("Error fetching bus details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (busId) {
      fetchBusDetails();
    }
  }, [busId]);

  // ================= MAP SEATS TO PASSENGERS =================
  useEffect(() => {
    setPassengers((prev) => {
      return selectedSeats.map((seatNumber) => {
        const existing = prev.find((p) => p.seatNumber === seatNumber);
        return existing || { name: "", age: "", gender: "Male", seatNumber };
      });
    });
  }, [selectedSeats]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "#f5f7fb" }}>
        <h4 className="text-muted">Loading Bus Details...</h4>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "#f5f7fb" }}>
        <div className="text-center">
          <h4 className="text-danger mb-3">Bus Details Not Found</h4>
          <Button onClick={() => navigate("/buses")} style={{ background: themeColor, border: "none" }}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  // ================= CALCULATION =================
  const totalAmount = selectedSeats.reduce((sum, seatNo) => {
    const seatData = bus.seatLayout?.find((s) => s.seatNumber === seatNo);
    return sum + (seatData?.price || bus.price || 0);
  }, 0);

  const taxAmount = bus.tax || 0;
  const discountAmount = bus.discount || 0;
  const finalAmount = totalAmount > 0 ? totalAmount + taxAmount - discountAmount : 0;

  // ================= SEAT SELECTION HANDLER =================
  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  // ================= BOOKING SUBMISSION =================
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("usertoken") || !userId) {
    toast.error("Please login first to book!");
      navigate("/login");
      return;
    }

    if (selectedSeats.length === 0) {
   toast.error("Please select at least one seat to continue");
      return;
    }

    if (!boardingPoint) {
     toast.error("Please select a boarding point");
      return;
    }

    if (!droppingPoint) {
    toast.error("Please select a dropping point");
      return;
    }

    if (!journeyDate) {
      alert("Please select a journey date");
      return;
    }

    // Validate passengers details
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name?.trim()) {
      toast.error(`Please enter passenger name for Seat ${p.seatNumber}`);
        return;
      }
      if (!p.age || isNaN(p.age) || Number(p.age) <= 0) {
      toast.error(`Please enter a valid age for Seat ${p.seatNumber}`);
        return;
      }
    }

    try {
      setBookingLoading(true);

      const payload = {
        userId,
        bookingType: "bus",
        busId: bus._id,
        journeyDate: new Date(journeyDate),
        boardingPoint,
        droppingPoint,
        paymentMethod: "upi",
        passengersDetails: passengers.map((p) => ({
          name: p.name,
          age: Number(p.age),
          gender: p.gender,
          seatNumber: p.seatNumber
        }))
      };

      const res = await axios.post("http://localhost:5000/api/booking/busbooking", payload);

      if (res.data.success) {
     toast.success("Bus booked successfully!");
        navigate("/my-booking");
      } else {
    toast.error(
  err.response?.data?.message ||
  "Something went wrong while booking"
);
      }
    } catch (err) {
      console.error("Booking error:", err);
    toast.error(res.data.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  // ================= SEAT LAYOUT RENDERER =================
  const renderSeat = (seat) => {
    const isBooked = seat.isBooked;
    const isSelected = selectedSeats.includes(seat.seatNumber);
    const isSleeper = seat.seatType === "Sleeper";

    let bgColor = "#ffffff";
    let border = "1.5px solid #28a745"; // available green
    let textColor = "#28a745";
    let cursor = "pointer";

    if (isBooked) {
      bgColor = "#e9ecef";
      border = "1.5px solid #ced4da";
      textColor = "#6c757d";
      cursor = "not-allowed";
    } else if (isSelected) {
      bgColor = themeColor;
      border = `1.5px solid ${themeColor}`;
      textColor = "#ffffff";
    }

    return (
      <div
      
        key={seat._id || seat.seatNumber}
        onClick={() => {
          if (isBooked) return;
          handleSeatClick(seat.seatNumber);
        }}
        style={{
          background: bgColor,
          border: border,
          color: textColor,
          padding: isSleeper ? "16px 4px" : "10px 4px",
          borderRadius: "8px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "0.8rem",
          cursor: cursor,
          transition: "all 0.2s ease",
          minWidth: "48px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isSelected ? "0 2px 8px rgba(30,58,110,0.25)" : "none",
          userSelect: "none"
        }}
        title={`${seat.seatNumber} (${seat.seatType}) - ₹${seat.price || bus.price}`}
      >
        <span>{seat.seatNumber}</span>
        <span style={{ fontSize: "0.65rem", marginTop: 2 }}>
          {isSleeper ? "🛌" : "💺"}
        </span>
      </div>
    );
  };

  // Group seat layout into rows of 4 for a 2x2 layout
  const seatRows = [];
  const layout = bus.seatLayout || [];
  for (let i = 0; i < layout.length; i += 4) {
    seatRows.push(layout.slice(i, i + 4));
  }

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: "#f5f7fb" }}>
      <Navbar />

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
            <span className="fs-3 me-2">🚌</span>
            <h2 className="fw-bold mb-0">Bus Seat Booking</h2>
          </div>
          <p className="mb-0 text-white-50">
            Select your preferred seats and enter passenger details to complete your reservation.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">
        <Row className="g-4">
          {/* LEFT SIDE: BUS INFO & SEAT SELECTOR & PASSENGER INFO */}
          <Col lg={8}>
            {/* BUS INFO CARD */}
            <Card className="border-0 mb-4 shadow-sm" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                  <div>
                    <h4 className="fw-bold text-primary-custom mb-1">{bus.operatorName}</h4>
                    <span className="text-muted small">Bus No: {bus.busNumber} | Type: {bus.busType}</span>
                  </div>
                  <Badge bg="light" text="dark" className="p-2 border fs-6">
                    ₹{bus.price} / base seat
                  </Badge>
                </div>

                <hr />

                <Row className="align-items-center text-center">
                  <Col xs={4} className="text-start">
                    <h5 className="fw-bold mb-0">{bus.from?.city}</h5>
                    <small className="text-muted d-block">{bus.from?.busStand}</small>
                    <span className="text-primary-custom fw-semibold mt-1 d-inline-block">
                      {new Date(bus.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </Col>
                  <Col xs={4}>
                    <div className="text-muted small">{bus.duration} mins</div>
                    <div style={{ position: "relative", height: "2px", background: "#ddd", margin: "8px 0" }}>
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "-5px",
                          transform: "translateX(-50%)",
                          background: "#fff",
                          padding: "0 8px"
                        }}
                      >
                        🚌
                      </div>
                    </div>
                    <small className="text-muted">
                      {bus.stops?.length === 0 ? "Direct" : `${bus.stops?.length} Stops`}
                    </small>
                  </Col>
                  <Col xs={4} className="text-end">
                    <h5 className="fw-bold mb-0">{bus.to?.city}</h5>
                    <small className="text-muted d-block">{bus.to?.busStand}</small>
                    <span className="text-success fw-semibold mt-1 d-inline-block">
                      {new Date(bus.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* SEAT SELECTOR */}
            <Card className="border-0 mb-4 shadow-sm" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4 font-heading">Choose Seat Layout</h5>

                <div className="d-flex justify-content-center gap-4 mb-4 flex-wrap text-muted small">
                  <div className="d-flex align-items-center gap-1">
                    <div style={{ width: 16, height: 16, border: "1.5px solid #28a745", borderRadius: 4 }}></div>
                    <span>Available</span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <div style={{ width: 16, height: 16, background: themeColor, borderRadius: 4 }}></div>
                    <span>Selected</span>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <div style={{ width: 16, height: 16, background: "#e9ecef", border: "1.5px solid #ced4da", borderRadius: 4 }}></div>
                    <span>Booked</span>
                  </div>
                </div>

                <div className="p-4 bg-light rounded-4 d-flex flex-column align-items-center">
                  {/* Steering/Driver column */}
                  <div className="w-100 d-flex justify-content-end mb-4" style={{ maxWidth: "260px" }}>
                    <span style={{ fontSize: "1.2rem", filter: "grayscale(30%)" }}>🧭 Driver Cabin</span>
                  </div>

                  {/* Seat grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 40px 1fr 1fr",
                      rowGap: "16px",
                      columnGap: "10px",
                      maxWidth: "280px"
                    }}
                  >
                    {seatRows.map((row, rowIdx) => (
                      <React.Fragment key={rowIdx}>
                        {/* Column 1 */}
                        {row[0] ? renderSeat(row[0]) : <div />}
                        {/* Column 2 */}
                        {row[1] ? renderSeat(row[1]) : <div />}
                        {/* Aisle */}
                        <div className="d-flex align-items-center justify-content-center text-muted small" style={{ fontSize: "0.7rem" }}>
                          Aisle
                        </div>
                        {/* Column 3 */}
                        {row[2] ? renderSeat(row[2]) : <div />}
                        {/* Column 4 */}
                        {row[3] ? renderSeat(row[3]) : <div />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* PASSENGER DETAILS FORM */}
            {selectedSeats.length > 0 && (
              <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4 font-heading">Passenger Information</h5>
                  {passengers.map((passenger, index) => (
                    <div key={passenger.seatNumber} className="p-3 bg-light rounded-3 mb-3 border">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0 text-primary-custom">
                          Passenger {index + 1}
                        </h6>
                        <Badge bg="info" className="fs-6">
                          Seat: {passenger.seatNumber}
                        </Badge>
                      </div>
                      
                      <Row className="g-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label className="small fw-semibold text-muted">Full Name</Form.Label>
                            <Form.Control
                              required
                              placeholder="Enter passenger's full name"
                              value={passenger.name}
                              onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={3}>
                          <Form.Group>
                            <Form.Label className="small fw-semibold text-muted">Age</Form.Label>
                            <Form.Control
                              required
                              type="number"
                              placeholder="Age"
                              value={passenger.age}
                              onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                            />
                          </Form.Group>
                        </Col>

                        <Col md={3}>
                          <Form.Group>
                            <Form.Label className="small fw-semibold text-muted">Gender</Form.Label>
                            <Form.Select
                              value={passenger.gender}
                              onChange={(e) => handlePassengerChange(index, "gender", e.target.value)}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            )}
          </Col>

          {/* RIGHT SIDE: ROUTING & FARE SUMMARY */}
          <Col lg={4}>
            {/* ROUTE / DATE SELECTOR */}
            <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3 font-heading">Route Details</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-muted">Journey Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-muted">Boarding Point</Form.Label>
                  <Form.Select
                    value={boardingPoint}
                    onChange={(e) => setBoardingPoint(e.target.value)}
                    required
                  >
                    <option value="">Select Boarding Point</option>
                    <option value={bus.from?.busStand || bus.from?.city}>
                      {bus.from?.busStand || bus.from?.city} (Starts)
                    </option>
                    {bus.stops?.map((stop, idx) => (
                      <option key={idx} value={stop.busStand || stop.city}>
                        {stop.busStand || stop.city} - Stop
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small fw-semibold text-muted">Dropping Point</Form.Label>
                  <Form.Select
                    value={droppingPoint}
                    onChange={(e) => setDroppingPoint(e.target.value)}
                    required
                  >
                    <option value="">Select Dropping Point</option>
                    {bus.droppingPoints && bus.droppingPoints.length > 0 ? (
                      bus.droppingPoints.map((dp, idx) => (
                        <option key={idx} value={dp.location}>
                          {dp.location} - {dp.address}
                        </option>
                      ))
                    ) : (
                      <option value={bus.to?.busStand || bus.to?.city}>
                        {bus.to?.busStand || bus.to?.city} (Ends)
                      </option>
                    )}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* FARE SUMMARY */}
            <Card className="border-0 shadow-sm" style={{ borderRadius: "16px", position: "sticky", top: 90 }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4 font-heading">Fare Summary</h5>

                <div className="d-flex justify-content-between mb-2 small text-muted">
                  <span>Base Price</span>
                  <span>₹{bus.price}</span>
                </div>

                <div className="d-flex justify-content-between mb-2 small text-muted">
                  <span>Seats Selected</span>
                  <span>{selectedSeats.length}</span>
                </div>

                {selectedSeats.length > 0 && (
                  <div className="d-flex justify-content-between mb-2 small text-muted">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between mb-2 small text-muted">
                  <span>Tax & Fees</span>
                  <span>+ ₹{taxAmount}</span>
                </div>

                <div className="d-flex justify-content-between mb-3 small text-muted">
                  <span>Discounts</span>
                  <span className="text-success">- ₹{discountAmount}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">Total Amount</h5>
                  <h4 className="fw-bold text-secondary-custom mb-0">₹{finalAmount}</h4>
                </div>

                {selectedSeats.length === 0 ? (
                  <Alert variant="warning" className="small py-2 text-center">
                    Please select seats to proceed.
                  </Alert>
                ) : (
                  <Alert variant="info" className="small py-2 text-center">
                    Selected Seats: {selectedSeats.join(", ")}
                  </Alert>
                )}

                <Button
                  className="w-100 py-2 btn-sunset shadow"
                  disabled={selectedSeats.length === 0 || bookingLoading}
                  onClick={handleBooking}
                  style={{ borderRadius: "10px" }}
                >
                  {bookingLoading ? "Processing Booking..." : "Confirm Reservation"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

   <Footer />

<Toaster
  position="top-right"
  reverseOrder={false}
/>
    </div>
  );
};

export default BusBooking;
