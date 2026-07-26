
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const BusResults = () => {

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
  }else {
      navigate(path);
    }
  };

  const [buses, setBuses] = useState([]);

  const [typeFilter, setTypeFilter] =
    useState("all");

  // ================= FETCH BUS =================

  const fetchBuses = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/front/frontviewbus"
      );

      console.log(response.data);

      setBuses(response.data.data || []);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= USE EFFECT =================

  useEffect(() => {

    // SEARCH RESULT
    if (location.state?.buses) {

      setBuses(location.state.buses);

    }

    // FRONT VIEW
    else {

      fetchBuses();

    }

  }, []);

  // ================= FILTER =================

  const filtered = buses
    .filter((bus) => {

      if (typeFilter === "all")
        return true;

      return bus.busType
        ?.toLowerCase()
        .includes(typeFilter);

    })

    .sort((a, b) => a.price - b.price);

  return (

    <div className="d-flex flex-column min-vh-100">

      <Navbar />

      {/* TOP BAR */}
      <div className="bg-primary-custom text-white py-3 text-center font-heading fw-semibold">

        🚌 Bus Routes | Multiple Operators

      </div>

      <Container className="py-4 flex-grow-1">

        <Row>

          {/* ================= FILTERS ================= */}

          <Col lg={3}>

            <Card className="card-travel p-3 mb-4">

              <h6 className="font-heading fw-bold mb-3">

                Filters

              </h6>

              <p className="fw-semibold small mb-2">

                Bus Type

              </p>

              {[
                "all",
                "ac",
                "sleeper",
                "volvo"
              ].map((t) => (

                <Form.Check
                  key={t}
                  type="radio"
                  name="type"

                  label={
                    t === "all"
                      ? "All"
                      : t.charAt(0).toUpperCase() +
                        t.slice(1)
                  }

                  checked={typeFilter === t}

                  onChange={() =>
                    setTypeFilter(t)
                  }

                  className="mb-1 small"
                />

              ))}

            </Card>

          </Col>

          {/* ================= BUS LIST ================= */}

          <Col lg={9}>

            <p className="text-muted small mb-3">

              {filtered.length} buses found

            </p>

            {filtered.map((bus) => (

              <Card
                key={bus._id}
                className="card-travel p-3 mb-3"
              >

                <Row className="align-items-center">

                  {/* OPERATOR */}
                  <Col md={3}>

                    <p className="fw-semibold mb-0 small">

                      {bus.operatorName}

                    </p>

                    <Badge
                      bg="light"
                      text="muted"
                      className="me-1"
                      style={{
                        fontSize: "0.65rem"
                      }}
                    >

                      {bus.busType}

                    </Badge>

                  

                  </Col>

                  {/* TIMING */}
                  <Col
                    md={5}
                    className="text-center"
                  >

                    <p className="font-heading fw-bold mb-0 small">

                      {new Date(
                        bus.departureTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}

                      {" — "}

                      <span className="text-muted fw-normal">

                        {bus.duration} mins

                      </span>

                      {" — "}

                      {new Date(
                        bus.arrivalTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}

                    </p>

                    <small className="text-muted">

                      {bus.from?.city}

                      {" → "}

                      {bus.to?.city}

                    </small>

                  </Col>

                  {/* PRICE */}
                  <Col
                    md={4}
                    className="text-end"
                  >

                    <p
                      className="font-heading fw-bold text-secondary-custom mb-0"
                      style={{
                        fontSize: "1.25rem"
                      }}
                    >

                      ₹
                      {bus.price?.toLocaleString()}

                    </p>

                    <small className="text-muted d-block mb-1">

                      {bus.availableSeats}
                      {" seats left"}

                    </small>

<Button
  className="btn-sunset btn-sm"
  onClick={() => handleBook(`/Busbooking?id=${bus._id}`)}
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

export default BusResults;