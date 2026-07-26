
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Badge,
  Button
} from "react-bootstrap";
import axios from "axios";

const FlightResults = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleBook = (path) => {
    if (!localStorage.getItem("usertoken")) {
         Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login first to book!",
      confirmButtonText: "Go to Login",
      confirmButtonColor: "#1e3a6e"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  } else {
      navigate(path);
    }
  };

  const [flights, setFlights] = useState([]);

  const [sortBy, setSortBy] = useState("price");

  const [stopsFilter, setStopsFilter] =
    useState(null);

  const [priceRange, setPriceRange] =
    useState(10000);

  const fetchFlights = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/front/frontviewflight"
      );

      console.log(response);

      setFlights(response.data.data || []);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    // search se aaye
    if (location.state?.flights) {

      setFlights(location.state.flights);

    }

    // normal page open
    else {

      fetchFlights();

    }

  }, []);

  // FILTERS
  const filtered = flights

    .filter((f) =>

      stopsFilter !== null

        ? f.stops?.length === stopsFilter

        : true
    )

    .filter((f) =>

      (f.classes?.economy?.price || 0)
      <=
      priceRange
    )

    .sort((a, b) =>

      sortBy === "price"

        ? (a.classes?.economy?.price || 0)
          -
          (b.classes?.economy?.price || 0)

        : new Date(a.departuretime)
          -
          new Date(b.departuretime)
    );

  return (

    <div className="d-flex flex-column min-vh-100">

      <Navbar />

      <div className="bg-primary-custom text-white py-3 text-center font-heading fw-semibold">

        ✈ Flight Results

      </div>

      <Container className="py-4 flex-grow-1">

        <Row>

          {/* FILTERS */}
          <Col lg={3}>

            <Card className="card-travel p-3 mb-4">

              <h6 className="font-heading fw-bold mb-3">
                Filters
              </h6>

              {/* Stops */}
              <p className="fw-semibold small mb-2">
                Stops
              </p>

              {[
                { l: "All", v: null },
                { l: "Non-stop", v: 0 },
                { l: "1 Stop", v: 1 }
              ].map((o) => (

                <Form.Check
                  key={o.l}
                  type="radio"
                  name="stops"
                  label={o.l}
                  checked={stopsFilter === o.v}

                  onChange={() =>
                    setStopsFilter(o.v)
                  }

                  className="mb-1 small"
                />

              ))}

              <hr />

              {/* PRICE */}
              <p className="fw-semibold small mb-2">

                Max Price:
                ₹{priceRange.toLocaleString()}

              </p>

              <Form.Range

                min={2000}
                max={10000}
                step={500}

                value={priceRange}

                onChange={(e) =>
                  setPriceRange(
                    Number(e.target.value)
                  )
                }

              />

              <hr />

              {/* SORT */}
              <p className="fw-semibold small mb-2">

                Sort By

              </p>

              <Form.Select

                size="sm"

                value={sortBy}

                onChange={(e) =>
                  setSortBy(e.target.value)
                }

              >

                <option value="price">
                  Price: Low to High
                </option>

                <option value="time">
                  Departure Time
                </option>

              </Form.Select>

            </Card>

          </Col>

          {/* FLIGHTS */}
          <Col lg={9}>

            {/* <p className="text-muted small mb-3">
              {filtered.length} flights found
            </p> */}

            {filtered.map((flight) => (

              <Card
                key={flight._id}
                className="card-travel p-3 mb-3"
              >

                <Row className="align-items-center">

                  {/* AIRLINE */}
                  <Col
                    md={3}
                    className="d-flex align-items-center gap-2"
                  >

                    <div
                      className="avatar-circle gradient-hero text-white"

                      style={{
                        width: 40,
                        height: 40,
                        fontSize: "0.75rem"
                      }}
                    >

                      ✈

                    </div>

                    <div>

                      <p className="fw-semibold mb-0 small">

                        {flight.airline}

                      </p>

                      <small className="text-muted">

                        {flight.flightnumber}

                      </small>

                      <br />

                      <Badge
                        className={
                          flight.stops?.length === 0
                            ? "badge-accent"
                            : "bg-light text-muted"
                        }

                        style={{
                          fontSize: "0.65rem"
                        }}
                      >

                        {flight.stops?.length === 0

                          ? "Non-stop"

                          : `${flight.stops?.length} Stop`}

                      </Badge>

                    </div>

                  </Col>

                  {/* TIMING */}
                  <Col md={5} className="text-center">

                    <p className="font-heading fw-bold mb-0 small">

                      {new Date(
                        flight.departuretime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}

                      {" — "}

                      <span className="text-muted fw-normal">

                        {flight.duration} hrs

                      </span>

                      {" — "}

                      {new Date(
                        flight.arrivaltime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}

                    </p>

                    <small className="text-muted">

                      {flight.from?.city}

                      {" → "}

                      {flight.to?.city}

                    </small>

                  </Col>

                  {/* PRICE */}
                  <Col md={4} className="text-end">

                    <p
                      className="font-heading fw-bold text-secondary-custom mb-0"

                      style={{
                        fontSize: "1.25rem"
                      }}
                    >

                      ₹
                      {flight.classes?.economy?.price
                        ?.toLocaleString()}

                    </p>

                    <small className="text-muted d-block mb-1">

                      Economy

                    </small>

                    <Button

                      className="btn-sunset btn-sm"

                      onClick={() =>
                        handleBook(
                          `/Flightbooking?type=flight&id=${flight._id}`
                        )
                      }

                    >

                      Book Now

                    </Button>

                  </Col>

                </Row>

              </Card>

            ))}

          </Col>

        </Row>

      </Container>

      <Footer />

    </div>

  );

};

export default FlightResults;