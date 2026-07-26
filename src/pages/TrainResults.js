import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mockTrains } from "../data/mockData";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
const TrainResults = () => {
const location = useLocation();

  const [trains,settrains]=useState([]);
 const fetchTrains = async () => {

  const response = await axios.get(
    "http://localhost:5000/api/front/frontviewtrain"
  );

  settrains(response.data.data || []);

};
  useEffect(() => {

  // agar search se aaye
  if (location.state?.trains) {

    settrains(location.state.trains);

  }

  // agar navbar se aaye
  else {

    fetchTrains();

  }

}, []);
  const navigate = useNavigate();

  const handleBook = (path) => {
    if (!localStorage.getItem("usertoken")) {
        Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login first to book!",
      confirmButtonText: "Login Now",
      confirmButtonColor: "#1e3a6e"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });

    return;
  }

  navigate(path);
};

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <div className="bg-primary-custom text-white py-3 text-center font-heading fw-semibold">🚂 Train Routes | IRCTC Partner</div>
      <Container className="py-4 flex-grow-1">
        {/* <p className="text-muted small mb-3"> trains found</p> */}
        {/* {trains.map(train => (
          <Card key={train.id} className="card-travel p-3 mb-3">
            <Row className="align-items-center mb-3">
              <Col md={4}>
                <p className="font-heading fw-bold mb-0">{train.name}</p>
                <small className="text-muted">#{train.number}</small>
              </Col>
              <Col md={8} className="text-center">
                <p className="font-heading fw-bold mb-0 small">{train.departure} — <span className="text-muted fw-normal">{train.duration}</span> — {train.arrival}</p>
                <small className="text-muted">{train.from} → {train.to}</small>
              </Col>
            </Row>
            <div className="d-flex flex-wrap gap-2">
              {train.classes.map(cls => (
                <Button key={cls.name} variant="outline-secondary" className="flex-fill text-center p-2" style={{borderRadius:12,minWidth:120}} onClick={() => navigate("/booking?type=train&id=" + train.id + "&class=" + cls.name)}>
                  <strong className="d-block">{cls.name}</strong>
                  <span className="d-block text-secondary-custom fw-bold">₹{cls.price.toLocaleString()}</span>
                  <small className={cls.available > 10 ? "text-success" : "text-danger"}>{cls.available > 0 ? cls.available + " available" : "Waitlist"}</small>
                </Button>
              ))}
            </div>
          </Card>
        ))} */}

        <p className="text-muted small mb-3">
  {trains.length} trains found
</p>

{trains.map((train) => (
  <Card
    key={train._id}
    className="card-travel p-3 mb-3"
  >

    <Row className="align-items-center mb-3">

      <Col md={4}>

        <p className="font-heading fw-bold mb-0">
          {train.trainName}
        </p>

        <small className="text-muted">
          #{train.trainNumber}
        </small>

      </Col>

      <Col md={8} className="text-center">

        <p className="font-heading fw-bold mb-0 small">

          {train.departureTime}

          {" — "}

          <span className="text-muted fw-normal">
            {train.durationMinutes} mins
          </span>

          {" — "}

          {train.arrivalTime}

        </p>

        <small className="text-muted">

          {train.fromStation?.stationName}

          {" → "}

          {train.toStation?.stationName}

        </small>

      </Col>

    </Row>

    <div className="d-flex flex-wrap gap-2">

      {train.classes?.map((cls, index) => (

        <Button
          key={index}
          variant="outline-secondary"
          className="flex-fill text-center p-2"
          style={{
            borderRadius: 12,
            minWidth: 120
          }}

          onClick={() =>
            handleBook(
              `/train-booking?type=train&id=${train._id}&class=${cls.classType}`
            )
          }
        >

          <strong className="d-block">
            {cls.classType}
          </strong>

          <span className="d-block text-secondary-custom fw-bold">

            ₹
            {cls.baseFare
              ? cls.baseFare.toLocaleString()
              : 0}

          </span>

          <small
            className={
              cls.availableSeats > 10
                ? "text-success"
                : "text-danger"
            }
          >

            {cls.availableSeats > 0
              ? `${cls.availableSeats} available`
              : "Waitlist"}

          </small>

        </Button>

      ))}

    </div>

  </Card>
))}
      </Container>
      <Footer />
    </div>
  );
};

export default TrainResults;
