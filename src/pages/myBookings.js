import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Row,
  Col,
  Card,
  Badge
} from "react-bootstrap";

const MyBookings = () => {

  const themeColor = "#1e3a6e";

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {


      const userId =
        localStorage.getItem("user_id");

      const res = await axios.get(
        `http://localhost:5000/api/booking/getBookings/${userId}`
      );
      console.log("res", res)

      setBookings(res.data.data);


    } catch (error) {
      console.log(error);
    }


  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ background: "#f5f7fb" }}
    >


      <Navbar />

      {/* HERO */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#1e3a6e,#274b8f)",
          color: "#fff",
          padding: "50px 0"
        }}
      >
        <Container>
          <h2 className="fw-bold">
            My Bookings
          </h2>

          <p className="mb-0">
            View all your train, cab, bus, and flight bookings.
          </p>
        </Container>
      </div>

      <Container className="py-5 flex-grow-1">

        {bookings.length === 0 ? (

          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center py-5">
              <h5>No Bookings Found</h5>
            </Card.Body>
          </Card>

        ) : (

          <Row className="g-4">

            {bookings.map((booking) => (

              <Col md={6} key={booking._id}>

                <Card
                  className="border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "18px"
                  }}
                >
                  <Card.Body>

                    <div className="d-flex justify-content-between align-items-center mb-3">

                      <Badge
                        bg={
                          booking.bookingType === "cab"
                            ? "primary"
                            : booking.bookingType === "train"
                            ? "success"
                            : booking.bookingType === "bus"
                            ? "warning"
                            : "info"
                        }
                      >
                        {booking.bookingType === "cab"
                          ? "🚕 CAB"
                          : booking.bookingType === "train"
                          ? "🚆 TRAIN"
                          : booking.bookingType === "bus"
                          ? "🚌 BUS"
                          : "✈️ FLIGHT"}
                      </Badge>

                      <Badge bg="secondary">
                        {booking.bookingStatus}
                      </Badge>

                    </div>

                    {/* CAB */}

                    {booking.bookingType === "cab" && (
                      <>

                        {booking?.cabId?.cabImage && (
                          <img
                            src={booking.cabId.cabImage}
                            alt="cab"
                            className="img-fluid rounded mb-3"
                            style={{
                              height: 60,
                              width: "120px",
                              objectFit: "cover",
                              borderRadius: "10px"
                            }}
                          />
                        )}

                        <h5 className="fw-bold">
                          {booking.cabName}
                        </h5>

                        <p className="mb-1">
                          Driver :
                          <strong>
                            {" "}
                            {booking.driverName}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Vehicle :
                          <strong>
                            {" "}
                            {booking.vehicleNumber}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Pickup :
                          <strong>
                            {" "}
                            {booking.pickupLocation}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Drop :
                          <strong>
                            {" "}
                            {booking.dropLocation}
                          </strong>
                        </p>

                      </>
                    )}

                    {/* TRAIN */}

                    {booking.bookingType === "train" && (
                      <>

                        <h5 className="fw-bold">
                          {booking.trainName}
                        </h5>

                        <p className="mb-1">
                          Train No :
                          <strong>
                            {" "}
                            {booking.trainNumber}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Class :
                          <strong>
                            {" "}
                            {booking.classType}
                          </strong>
                        </p>

                        <p className="mb-1">
                          PNR :
                          <strong>
                            {" "}
                            {booking.pnrNumber}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Journey :
                          <strong>
                            {" "}
                            {booking.from}
                            {" → "}
                            {booking.to}
                          </strong>
                        </p>

                      </>
                    )}

                    {/* BUS */}

                    {booking.bookingType === "bus" && (
                      <>
                        <h5 className="fw-bold">
                          {booking.operatorName}
                        </h5>

                        <p className="mb-1">
                          Bus Name/No :
                          <strong>
                            {" "}
                            {booking.busName} ({booking.busNumber})
                          </strong>
                        </p>

                        <p className="mb-1">
                          Type :
                          <strong>
                            {" "}
                            {booking.busType}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Boarding :
                          <strong>
                            {" "}
                            {booking.boardingPoint}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Dropping :
                          <strong>
                            {" "}
                            {booking.droppingPoint}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Journey Date :
                          <strong>
                            {" "}
                            {new Date(booking.journeyDate).toLocaleDateString()}
                          </strong>
                        </p>

                        <div className="mb-1">
                          Passengers :
                          <div className="mt-1">
                            {booking.passengersDetails?.map((p, idx) => (
                              <Badge key={idx} bg="secondary" className="me-2 mb-1">
                                {p.name} ({p.age}, {p.gender}) - Seat: {p.seatNumber}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* FLIGHT */}

                    {booking.bookingType === "flight" && (
                      <>
                        <h5 className="fw-bold">
                          {booking.airline}
                        </h5>

                        <p className="mb-1">
                          Flight No :
                          <strong>
                            {" "}
                            {booking.flightNumber || booking.airlineCode}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Class :
                          <strong>
                            {" "}
                            {booking.travelClass}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Route :
                          <strong>
                            {" "}
                            {booking.fromAirport} → {booking.toAirport}
                          </strong>
                        </p>

                        <p className="mb-1">
                          Journey Date :
                          <strong>
                            {" "}
                            {new Date(booking.journeyDate).toLocaleDateString()}
                          </strong>
                        </p>

                        <div className="mb-1">
                          Passengers :
                          <div className="mt-1">
                            {booking.passengersDetails?.map((p, idx) => (
                              <Badge key={idx} bg="secondary" className="me-2 mb-1">
                                {p.name} ({p.age}, {p.gender})
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    <hr />

                    <div className="d-flex justify-content-between">

                      <span>
                        Amount
                      </span>

                      <strong
                        style={{
                          color: themeColor
                        }}
                      >
                        ₹{booking.amount}
                      </strong>

                    </div>

                  </Card.Body>
                </Card>

              </Col>

            ))}

          </Row>

        )}

      </Container>

      <Footer />

    </div>


  );
};

export default MyBookings;
